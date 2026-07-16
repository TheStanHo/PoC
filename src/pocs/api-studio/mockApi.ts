import {
  DEMO_BEARER_TOKEN,
  initialIncidents,
  mockServices,
  mockTeams,
  type MockIncident,
} from "./data";
import type { HttpMethod, StudioResponse } from "./types";

const incidents: MockIncident[] = [...initialIncidents];
let incidentSeq = 1100;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const jsonResponse = (
  status: number,
  statusText: string,
  payload: unknown,
  durationMs: number,
): StudioResponse => {
  const bodyText = JSON.stringify(payload, null, 2);
  const encoder = new TextEncoder();

  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    headers: {
      "content-type": "application/json",
      "x-mock-api": "api-studio",
      "x-request-id": `mock-${Date.now()}`,
    },
    bodyText,
    bodyJson: payload,
    durationMs,
    sizeBytes: encoder.encode(bodyText).length,
    source: "mock",
  };
};

const getBearerToken = (headers: Record<string, string>) => {
  const authorization =
    headers.authorization ?? headers.Authorization ?? headers.AUTHORIZATION;

  if (!authorization) {
    return undefined;
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim();
};

const requireDemoAuth = (headers: Record<string, string>) => {
  const token = getBearerToken(headers);

  if (token === DEMO_BEARER_TOKEN) {
    return null;
  }

  return jsonResponse(
    401,
    "Unauthorized",
    {
      error: "unauthorized",
      message: 'Use Authorization: Bearer demo-token for protected mock routes.',
    },
    12,
  );
};

const parseBody = (bodyText: string) => {
  if (!bodyText.trim()) {
    return {};
  }

  return JSON.parse(bodyText) as Record<string, unknown>;
};

export async function handleMockRequest(input: {
  method: HttpMethod;
  pathWithQuery: string;
  headers: Record<string, string>;
  bodyText: string;
}): Promise<StudioResponse> {
  const started = performance.now();
  await delay(80 + Math.floor(Math.random() * 140));

  const url = new URL(input.pathWithQuery, "https://api.demo.local");
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = input.method.toUpperCase() as HttpMethod;

  if (method === "GET" && path === "/health") {
    return jsonResponse(
      200,
      "OK",
      {
        status: "ok",
        service: "mock-catalog-api",
        version: "0.1.0",
        environment: "demo",
      },
      performance.now() - started,
    );
  }

  if (method === "GET" && path === "/teams") {
    return jsonResponse(
      200,
      "OK",
      { data: mockTeams, count: mockTeams.length },
      performance.now() - started,
    );
  }

  if (method === "GET" && path === "/services") {
    const team = url.searchParams.get("team");
    const data = team
      ? mockServices.filter(
          (service) => service.team.toLowerCase() === team.toLowerCase(),
        )
      : mockServices;

    return jsonResponse(
      200,
      "OK",
      { data, count: data.length },
      performance.now() - started,
    );
  }

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  if (method === "GET" && serviceMatch) {
    const authError = requireDemoAuth(input.headers);
    if (authError) {
      return { ...authError, durationMs: performance.now() - started };
    }

    const service = mockServices.find((item) => item.id === serviceMatch[1]);

    if (!service) {
      return jsonResponse(
        404,
        "Not Found",
        {
          error: "not_found",
          message: `No service found for id "${serviceMatch[1]}".`,
        },
        performance.now() - started,
      );
    }

    return jsonResponse(
      200,
      "OK",
      { data: service },
      performance.now() - started,
    );
  }

  if (method === "GET" && path === "/incidents") {
    return jsonResponse(
      200,
      "OK",
      { data: incidents, count: incidents.length },
      performance.now() - started,
    );
  }

  if (method === "POST" && path === "/incidents") {
    const authError = requireDemoAuth(input.headers);
    if (authError) {
      return { ...authError, durationMs: performance.now() - started };
    }

    try {
      const payload = parseBody(input.bodyText);
      const title = String(payload.title ?? "").trim();
      const serviceId = String(payload.serviceId ?? "").trim();
      const severity = String(payload.severity ?? "sev-3").trim();
      const summary = String(payload.summary ?? "").trim();

      if (!title || !serviceId) {
        return jsonResponse(
          400,
          "Bad Request",
          {
            error: "validation_error",
            message: "title and serviceId are required.",
          },
          performance.now() - started,
        );
      }

      const serviceExists = mockServices.some(
        (service) => service.id === serviceId,
      );

      if (!serviceExists) {
        return jsonResponse(
          422,
          "Unprocessable Entity",
          {
            error: "unknown_service",
            message: `serviceId "${serviceId}" is not in the mock catalog.`,
          },
          performance.now() - started,
        );
      }

      incidentSeq += 1;
      const created: MockIncident = {
        id: `inc-${incidentSeq}`,
        title,
        serviceId,
        severity,
        status: "open",
        summary: summary || "Created from API Studio.",
        openedAt: new Date().toISOString(),
      };
      incidents.unshift(created);

      return jsonResponse(
        201,
        "Created",
        { data: created },
        performance.now() - started,
      );
    } catch {
      return jsonResponse(
        400,
        "Bad Request",
        {
          error: "invalid_json",
          message: "Request body must be valid JSON.",
        },
        performance.now() - started,
      );
    }
  }

  return jsonResponse(
    404,
    "Not Found",
    {
      error: "route_not_found",
      message: `No mock route for ${method} ${path}.`,
      available: [
        "GET /health",
        "GET /teams",
        "GET /services",
        "GET /services/:id",
        "GET /incidents",
        "POST /incidents",
      ],
    },
    performance.now() - started,
  );
}

export async function handleNetworkRequest(input: {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  bodyText: string;
}): Promise<StudioResponse> {
  const started = performance.now();
  const init: RequestInit = {
    method: input.method,
    headers: input.headers,
  };

  if (input.method !== "GET" && input.method !== "DELETE" && input.bodyText) {
    init.body = input.bodyText;
  }

  try {
    const response = await fetch(input.url, init);
    const bodyText = await response.text();
    let bodyJson: unknown | null = null;

    try {
      bodyJson = JSON.parse(bodyText) as unknown;
    } catch {
      bodyJson = null;
    }

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText || "OK",
      headers,
      bodyText,
      bodyJson,
      durationMs: performance.now() - started,
      sizeBytes: new TextEncoder().encode(bodyText).length,
      source: "network",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Network request failed.";

    return {
      ok: false,
      status: 0,
      statusText: "Network Error",
      headers: {},
      bodyText: JSON.stringify(
        {
          error: "network_error",
          message,
          tip: "Browsers block many APIs with CORS. Prefer the Mock catalog environment for this PoC.",
        },
        null,
        2,
      ),
      bodyJson: null,
      durationMs: performance.now() - started,
      sizeBytes: 0,
      source: "network",
    };
  }
}
