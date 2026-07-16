export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type KeyValuePair = {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
};

export type RequestTab = "params" | "headers" | "body" | "auth";

export type AuthMode = "none" | "bearer";

export type SavedRequest = {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  description: string;
  params?: KeyValuePair[];
  headers?: KeyValuePair[];
  body?: string;
  authMode?: AuthMode;
  bearerToken?: string;
};

export type RequestCollection = {
  id: string;
  name: string;
  description: string;
  requests: SavedRequest[];
};

export type EnvironmentId = "mock" | "public";

export type Environment = {
  id: EnvironmentId;
  name: string;
  baseUrl: string;
  hint: string;
};

export type StudioResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  bodyText: string;
  bodyJson: unknown | null;
  durationMs: number;
  sizeBytes: number;
  source: "mock" | "network";
};

export type HistoryEntry = {
  id: string;
  timestamp: number;
  method: HttpMethod;
  url: string;
  status: number;
  durationMs: number;
  ok: boolean;
};

export type DraftRequest = {
  method: HttpMethod;
  path: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  body: string;
  authMode: AuthMode;
  bearerToken: string;
};
