import type {
  Environment,
  KeyValuePair,
  RequestCollection,
  SavedRequest,
} from "./types";

let pairCounter = 0;

export const createPair = (
  key = "",
  value = "",
  enabled = true,
): KeyValuePair => {
  pairCounter += 1;

  return {
    id: `pair-${pairCounter}`,
    key,
    value,
    enabled,
  };
};

export const environments: Environment[] = [
  {
    id: "mock",
    name: "Mock catalog",
    baseUrl: "mock://api.demo.local",
    hint: "In-browser fake API — no network, safe for demos.",
  },
  {
    id: "public",
    name: "Public demo",
    baseUrl: "https://jsonplaceholder.typicode.com",
    hint: "Real HTTP to a public CORS-friendly demo API.",
  },
];

const bearerHeader = createPair("Accept", "application/json");

export const starterCollection: RequestCollection = {
  id: "catalog-collection",
  name: "Service catalog",
  description:
    "Starter requests against a mock platform API that mirrors the Service Catalog PoC world.",
  requests: [
    {
      id: "health",
      name: "Health check",
      method: "GET",
      path: "/health",
      description: "Confirm the mock API is ready.",
      headers: [createPair("Accept", "application/json")],
    },
    {
      id: "list-services",
      name: "List services",
      method: "GET",
      path: "/services",
      description: "Return every mock service in the catalog.",
      params: [createPair("team", "", false)],
      headers: [createPair("Accept", "application/json")],
    },
    {
      id: "get-service",
      name: "Get service",
      method: "GET",
      path: "/services/identity-api",
      description: "Fetch one service by id.",
      headers: [createPair("Accept", "application/json")],
      authMode: "bearer",
      bearerToken: "demo-token",
    },
    {
      id: "list-incidents",
      name: "List incidents",
      method: "GET",
      path: "/incidents",
      description: "Show open mock incidents tied to catalog services.",
      headers: [createPair("Accept", "application/json")],
    },
    {
      id: "create-incident",
      name: "Create incident",
      method: "POST",
      path: "/incidents",
      description: "Post a new mock incident (validated bearer token).",
      headers: [
        createPair("Accept", "application/json"),
        createPair("Content-Type", "application/json"),
      ],
      body: JSON.stringify(
        {
          title: "Elevated error rate on Checkout API",
          serviceId: "checkout-api",
          severity: "sev-2",
          summary: "Synthetic alert for the API Studio demo.",
        },
        null,
        2,
      ),
      authMode: "bearer",
      bearerToken: "demo-token",
    },
    {
      id: "list-teams",
      name: "List teams",
      method: "GET",
      path: "/teams",
      description: "Return owning teams used by the catalog.",
      headers: [bearerHeader],
    },
  ],
};

export const publicStarterRequests: SavedRequest[] = [
  {
    id: "public-posts",
    name: "List posts",
    method: "GET",
    path: "/posts",
    description: "Public JSONPlaceholder posts list.",
    headers: [createPair("Accept", "application/json")],
  },
  {
    id: "public-post",
    name: "Get post",
    method: "GET",
    path: "/posts/1",
    description: "Fetch a single public demo post.",
    headers: [createPair("Accept", "application/json")],
  },
];

export const mockServices = [
  {
    id: "identity-api",
    name: "Identity API",
    team: "Platform Engineering",
    owner: "team-alpha",
    health: "healthy",
    tier: "tier-1",
  },
  {
    id: "deployment-orchestrator",
    name: "Deployment Orchestrator",
    team: "Platform Engineering",
    owner: "team-alpha",
    health: "watch",
    tier: "tier-2",
  },
  {
    id: "customer-portal",
    name: "Customer Portal",
    team: "Customer Experience",
    owner: "team-bravo",
    health: "healthy",
    tier: "tier-1",
  },
  {
    id: "checkout-api",
    name: "Checkout API",
    team: "Customer Experience",
    owner: "team-bravo",
    health: "degraded",
    tier: "tier-1",
  },
  {
    id: "reporting-api",
    name: "Reporting API",
    team: "Data Services",
    owner: "team-charlie",
    health: "watch",
    tier: "tier-2",
  },
];

export const mockTeams = [
  {
    id: "platform-engineering",
    name: "Platform Engineering",
    owner: "team-alpha",
  },
  {
    id: "customer-experience",
    name: "Customer Experience",
    owner: "team-bravo",
  },
  {
    id: "data-services",
    name: "Data Services",
    owner: "team-charlie",
  },
];

export type MockIncident = {
  id: string;
  title: string;
  serviceId: string;
  severity: string;
  status: "open" | "mitigated" | "resolved";
  summary: string;
  openedAt: string;
};

export const initialIncidents: MockIncident[] = [
  {
    id: "inc-1001",
    title: "Checkout latency spike",
    serviceId: "checkout-api",
    severity: "sev-2",
    status: "open",
    summary: "p95 latency above budget for the demo checkout path.",
    openedAt: "2026-07-15T09:12:00.000Z",
  },
  {
    id: "inc-1002",
    title: "Reporting job backlog",
    serviceId: "reporting-api",
    severity: "sev-3",
    status: "mitigated",
    summary: "Scheduler delay cleared; backlog still draining.",
    openedAt: "2026-07-14T16:40:00.000Z",
  },
];

export const DEMO_BEARER_TOKEN = "demo-token";
export const HISTORY_STORAGE_KEY = "api-studio-history-v1";
