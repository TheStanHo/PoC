import type {
  DraftRequest,
  Environment,
  HistoryEntry,
  HttpMethod,
  KeyValuePair,
  SavedRequest,
} from "./types";
import { createPair, HISTORY_STORAGE_KEY } from "./data";

export const METHODS: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
];

export const draftFromSaved = (request: SavedRequest): DraftRequest => ({
  method: request.method,
  path: request.path,
  params: (request.params ?? [createPair()]).map((pair) => ({ ...pair })),
  headers: (request.headers ?? [createPair("Accept", "application/json")]).map(
    (pair) => ({ ...pair }),
  ),
  body: request.body ?? "",
  authMode: request.authMode ?? "none",
  bearerToken: request.bearerToken ?? "demo-token",
});

export const emptyDraft = (): DraftRequest => ({
  method: "GET",
  path: "/health",
  params: [createPair()],
  headers: [createPair("Accept", "application/json")],
  body: "",
  authMode: "none",
  bearerToken: "demo-token",
});

export const enabledPairs = (pairs: KeyValuePair[]) =>
  pairs.filter((pair) => pair.enabled && pair.key.trim());

export const pairsToRecord = (pairs: KeyValuePair[]) => {
  const record: Record<string, string> = {};

  for (const pair of enabledPairs(pairs)) {
    record[pair.key.trim()] = pair.value;
  }

  return record;
};

export const buildUrl = (environment: Environment, draft: DraftRequest) => {
  const path = draft.path.startsWith("/") ? draft.path : `/${draft.path}`;
  const [pathname, existingQuery = ""] = path.split("?");
  const params = new URLSearchParams(existingQuery);

  for (const pair of enabledPairs(draft.params)) {
    params.set(pair.key.trim(), pair.value);
  }

  const query = params.toString();
  const pathWithQuery = query ? `${pathname}?${query}` : pathname;

  if (environment.id === "mock") {
    return {
      displayUrl: `${environment.baseUrl}${pathWithQuery}`,
      requestUrl: pathWithQuery,
      isMock: true as const,
    };
  }

  return {
    displayUrl: `${environment.baseUrl}${pathWithQuery}`,
    requestUrl: `${environment.baseUrl}${pathWithQuery}`,
    isMock: false as const,
  };
};

export const buildRequestHeaders = (draft: DraftRequest) => {
  const headers = pairsToRecord(draft.headers);

  if (draft.authMode === "bearer" && draft.bearerToken.trim()) {
    headers.Authorization = `Bearer ${draft.bearerToken.trim()}`;
  }

  return headers;
};

export const toCurl = (
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string,
) => {
  const parts = [`curl -X ${method} '${url}'`];

  for (const [key, value] of Object.entries(headers)) {
    parts.push(`  -H '${key}: ${value.replace(/'/g, "'\\''")}'`);
  }

  if (body.trim() && method !== "GET" && method !== "DELETE") {
    parts.push(`  -d '${body.replace(/'/g, "'\\''")}'`);
  }

  return parts.join(" \\\n");
};

export const toFetchSnippet = (
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string,
) => {
  const hasBody = Boolean(body.trim()) && method !== "GET" && method !== "DELETE";
  const lines = [
    `fetch('${url}', {`,
    `  method: '${method}',`,
    `  headers: ${JSON.stringify(headers, null, 2).replace(/\n/g, "\n  ")},`,
  ];

  if (hasBody) {
    lines.push(`  body: ${JSON.stringify(body)},`);
  }

  lines.push("});");
  return lines.join("\n");
};

export const loadHistory = (): HistoryEntry[] => {
  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(parsed) ? parsed.slice(0, 20) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (entries: HistoryEntry[]) => {
  try {
    window.localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(entries.slice(0, 20)),
    );
  } catch {
    // Ignore quota / private mode failures in the PoC.
  }
};

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
};

export const formatClock = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
