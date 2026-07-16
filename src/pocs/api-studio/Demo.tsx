import { useEffect, useId, useState } from "react";
import {
  createPair,
  environments,
  publicStarterRequests,
  starterCollection,
} from "./data";
import {
  buildRequestHeaders,
  buildUrl,
  draftFromSaved,
  emptyDraft,
  formatBytes,
  formatClock,
  loadHistory,
  METHODS,
  saveHistory,
  toCurl,
  toFetchSnippet,
} from "./helpers";
import { handleMockRequest, handleNetworkRequest } from "./mockApi";
import type {
  DraftRequest,
  EnvironmentId,
  HistoryEntry,
  KeyValuePair,
  RequestTab,
  SavedRequest,
  StudioResponse,
} from "./types";
import "./api-studio.css";

function updatePair(
  pairs: KeyValuePair[],
  id: string,
  patch: Partial<KeyValuePair>,
) {
  return pairs.map((pair) => (pair.id === id ? { ...pair, ...patch } : pair));
}

function KeyValueEditor({
  pairs,
  onChange,
  keyPlaceholder,
  valuePlaceholder,
}: {
  pairs: KeyValuePair[];
  onChange: (next: KeyValuePair[]) => void;
  keyPlaceholder: string;
  valuePlaceholder: string;
}) {
  return (
    <div className="as-kv" role="group" aria-label="Key value editor">
      {pairs.map((pair) => (
        <div className="as-kv__row" key={pair.id}>
          <label className="as-kv__check">
            <input
              type="checkbox"
              checked={pair.enabled}
              onChange={(event) =>
                onChange(
                  updatePair(pairs, pair.id, { enabled: event.target.checked }),
                )
              }
              aria-label={`Include ${pair.key || "row"}`}
            />
          </label>
          <input
            value={pair.key}
            onChange={(event) =>
              onChange(updatePair(pairs, pair.id, { key: event.target.value }))
            }
            placeholder={keyPlaceholder}
            spellCheck={false}
          />
          <input
            value={pair.value}
            onChange={(event) =>
              onChange(
                updatePair(pairs, pair.id, { value: event.target.value }),
              )
            }
            placeholder={valuePlaceholder}
            spellCheck={false}
          />
          <button
            type="button"
            className="as-icon-button"
            onClick={() => onChange(pairs.filter((item) => item.id !== pair.id))}
            aria-label="Remove row"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="as-text-button"
        onClick={() => onChange([...pairs, createPair()])}
      >
        + Add row
      </button>
    </div>
  );
}

function statusTone(status: number) {
  if (status === 0) {
    return "error";
  }
  if (status >= 200 && status < 300) {
    return "ok";
  }
  if (status >= 400 && status < 500) {
    return "warn";
  }
  if (status >= 500) {
    return "error";
  }
  return "neutral";
}

export default function ApiStudioDemo() {
  const formId = useId();
  const [environmentId, setEnvironmentId] = useState<EnvironmentId>("mock");
  const [selectedRequestId, setSelectedRequestId] = useState(
    starterCollection.requests[0]?.id ?? "",
  );
  const [draft, setDraft] = useState<DraftRequest>(() => {
    const first = starterCollection.requests[0];
    return first ? draftFromSaved(first) : emptyDraft();
  });
  const [activeTab, setActiveTab] = useState<RequestTab>("params");
  const [response, setResponse] = useState<StudioResponse | null>(null);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState<"curl" | "fetch" | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const environment =
    environments.find((item) => item.id === environmentId) ?? environments[0];

  const collectionRequests =
    environmentId === "mock"
      ? starterCollection.requests
      : publicStarterRequests;

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    const requests =
      environmentId === "mock"
        ? starterCollection.requests
        : publicStarterRequests;
    const first = requests[0];

    if (!first) {
      return;
    }

    setSelectedRequestId(first.id);
    setDraft(draftFromSaved(first));
    setResponse(null);
    setErrorMessage(null);
    setActiveTab("params");
  }, [environmentId]);

  const urlInfo = buildUrl(environment, draft);
  const requestHeaders = buildRequestHeaders(draft);

  const applySavedRequest = (request: SavedRequest) => {
    setSelectedRequestId(request.id);
    setDraft(draftFromSaved(request));
    setResponse(null);
    setErrorMessage(null);
    setActiveTab(request.body ? "body" : "params");
  };

  const patchDraft = (patch: Partial<DraftRequest>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setSelectedRequestId("");
  };

  const sendRequest = async () => {
    setSending(true);
    setErrorMessage(null);

    try {
      const result = urlInfo.isMock
        ? await handleMockRequest({
            method: draft.method,
            pathWithQuery: urlInfo.requestUrl,
            headers: requestHeaders,
            bodyText: draft.body,
          })
        : await handleNetworkRequest({
            method: draft.method,
            url: urlInfo.requestUrl,
            headers: requestHeaders,
            bodyText: draft.body,
          });

      setResponse(result);

      const entry: HistoryEntry = {
        id: `hist-${Date.now()}`,
        timestamp: Date.now(),
        method: draft.method,
        url: urlInfo.displayUrl,
        status: result.status,
        durationMs: Math.round(result.durationMs),
        ok: result.ok,
      };
      const nextHistory = [entry, ...history].slice(0, 20);
      setHistory(nextHistory);
      saveHistory(nextHistory);
    } catch (error) {
      setResponse(null);
      setErrorMessage(
        error instanceof Error ? error.message : "Request failed unexpectedly.",
      );
    } finally {
      setSending(false);
    }
  };

  const copySnippet = async (kind: "curl" | "fetch") => {
    const text =
      kind === "curl"
        ? toCurl(draft.method, urlInfo.displayUrl, requestHeaders, draft.body)
        : toFetchSnippet(
            draft.method,
            urlInfo.displayUrl,
            requestHeaders,
            draft.body,
          );

    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setErrorMessage("Clipboard access was blocked in this browser.");
    }
  };

  const responseBody =
    response?.bodyJson !== null && response?.bodyJson !== undefined
      ? JSON.stringify(response.bodyJson, null, 2)
      : (response?.bodyText ?? "");

  return (
    <div className="as-poc">
      <div className="as-shell">
        <header className="as-topbar">
          <div className="as-topbar__brand">
            <a className="as-hub-link" href="/">
              ← PoC hub
            </a>
            <div>
              <p className="as-kicker">Request lab</p>
              <h1>API Studio</h1>
            </div>
          </div>

          <div className="as-topbar__controls">
            <label className="as-field">
              <span>Environment</span>
              <select
                value={environmentId}
                onChange={(event) =>
                  setEnvironmentId(event.target.value as EnvironmentId)
                }
              >
                {environments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className={`as-ghost-button${showHistory ? " is-active" : ""}`}
              onClick={() => setShowHistory((value) => !value)}
            >
              History ({history.length})
            </button>
          </div>
        </header>

        <p className="as-env-hint">{environment.hint}</p>

        <div className={`as-layout${showHistory ? " as-layout--history" : ""}`}>
          <aside className="as-sidebar" aria-label="Request collection">
            <div className="as-sidebar__head">
              <h2>
                {environmentId === "mock"
                  ? starterCollection.name
                  : "Public demos"}
              </h2>
              <p>
                {environmentId === "mock"
                  ? starterCollection.description
                  : "A couple of real requests to JSONPlaceholder."}
              </p>
            </div>

            <ul className="as-request-list">
              {collectionRequests.map((request) => (
                <li key={request.id}>
                  <button
                    type="button"
                    className={
                      selectedRequestId === request.id ? "is-selected" : undefined
                    }
                    onClick={() => applySavedRequest(request)}
                  >
                    <span className={`as-method as-method--${request.method}`}>
                      {request.method}
                    </span>
                    <span>
                      <strong>{request.name}</strong>
                      <small>{request.path}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="as-main">
            <form
              className="as-composer"
              onSubmit={(event) => {
                event.preventDefault();
                void sendRequest();
              }}
            >
              <div className="as-url-bar">
                <label className="as-sr-only" htmlFor={`${formId}-method`}>
                  Method
                </label>
                <select
                  id={`${formId}-method`}
                  className={`as-method-select as-method--${draft.method}`}
                  value={draft.method}
                  onChange={(event) =>
                    patchDraft({
                      method: event.target.value as DraftRequest["method"],
                    })
                  }
                >
                  {METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>

                <label className="as-sr-only" htmlFor={`${formId}-path`}>
                  Path
                </label>
                <div className="as-url-input">
                  <span>{environment.baseUrl}</span>
                  <input
                    id={`${formId}-path`}
                    value={draft.path}
                    onChange={(event) => patchDraft({ path: event.target.value })}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="/services"
                  />
                </div>

                <button className="as-send" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send"}
                </button>
              </div>

              <div className="as-tabs" role="tablist" aria-label="Request details">
                {(
                  [
                    ["params", "Params"],
                    ["headers", "Headers"],
                    ["body", "Body"],
                    ["auth", "Auth"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === id}
                    className={activeTab === id ? "is-active" : undefined}
                    onClick={() => setActiveTab(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="as-tab-panel" role="tabpanel">
                {activeTab === "params" ? (
                  <KeyValueEditor
                    pairs={draft.params}
                    onChange={(params) => patchDraft({ params })}
                    keyPlaceholder="Query key"
                    valuePlaceholder="Value"
                  />
                ) : null}

                {activeTab === "headers" ? (
                  <KeyValueEditor
                    pairs={draft.headers}
                    onChange={(headers) => patchDraft({ headers })}
                    keyPlaceholder="Header"
                    valuePlaceholder="Value"
                  />
                ) : null}

                {activeTab === "body" ? (
                  <div className="as-body-panel">
                    <p>
                      JSON body for POST / PUT / PATCH. Ignored for GET and
                      DELETE.
                    </p>
                    <textarea
                      value={draft.body}
                      onChange={(event) =>
                        patchDraft({ body: event.target.value })
                      }
                      spellCheck={false}
                      rows={10}
                      placeholder='{ "title": "Example" }'
                    />
                  </div>
                ) : null}

                {activeTab === "auth" ? (
                  <div className="as-auth-panel">
                    <label className="as-field">
                      <span>Type</span>
                      <select
                        value={draft.authMode}
                        onChange={(event) =>
                          patchDraft({
                            authMode: event.target
                              .value as DraftRequest["authMode"],
                          })
                        }
                      >
                        <option value="none">No auth</option>
                        <option value="bearer">Bearer token</option>
                      </select>
                    </label>
                    {draft.authMode === "bearer" ? (
                      <label className="as-field">
                        <span>Token</span>
                        <input
                          value={draft.bearerToken}
                          onChange={(event) =>
                            patchDraft({ bearerToken: event.target.value })
                          }
                          spellCheck={false}
                          autoComplete="off"
                        />
                      </label>
                    ) : null}
                    <p>
                      Mock protected routes expect <code>demo-token</code>. Never
                      paste real credentials into this public PoC.
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="as-snippet-bar">
                <button
                  type="button"
                  className="as-text-button"
                  onClick={() => void copySnippet("curl")}
                >
                  {copied === "curl" ? "Copied cURL" : "Copy as cURL"}
                </button>
                <button
                  type="button"
                  className="as-text-button"
                  onClick={() => void copySnippet("fetch")}
                >
                  {copied === "fetch" ? "Copied fetch" : "Copy as fetch"}
                </button>
                <span className="as-url-preview">{urlInfo.displayUrl}</span>
              </div>
            </form>

            <section className="as-response" aria-live="polite">
              <div className="as-response__head">
                <h2>Response</h2>
                {response ? (
                  <div className="as-response__meta">
                    <span
                      className={`as-status as-status--${statusTone(response.status)}`}
                    >
                      {response.status || "ERR"} {response.statusText}
                    </span>
                    <span>{Math.round(response.durationMs)} ms</span>
                    <span>{formatBytes(response.sizeBytes)}</span>
                    <span>{response.source === "mock" ? "Mock" : "Network"}</span>
                  </div>
                ) : (
                  <p>Send a request to see status, timing, and JSON here.</p>
                )}
              </div>

              {errorMessage ? (
                <p className="as-error">{errorMessage}</p>
              ) : null}

              {response ? (
                <>
                  <details className="as-response-headers">
                    <summary>Headers</summary>
                    <pre>
                      {Object.entries(response.headers)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("\n") || "(none)"}
                    </pre>
                  </details>
                  <pre className="as-response-body">{responseBody || "(empty)"}</pre>
                </>
              ) : (
                <div className="as-response-empty">
                  <p>
                    Try <strong>Health check</strong>, then{" "}
                    <strong>Create incident</strong> with bearer auth to see a
                    201 response.
                  </p>
                </div>
              )}
            </section>
          </main>

          {showHistory ? (
            <aside className="as-history" aria-label="Request history">
              <div className="as-sidebar__head">
                <h2>History</h2>
                <p>Last 20 sends, kept in this browser only.</p>
              </div>
              {history.length === 0 ? (
                <p className="as-history__empty">No requests yet.</p>
              ) : (
                <ul>
                  {history.map((entry) => (
                    <li key={entry.id}>
                      <span className={`as-method as-method--${entry.method}`}>
                        {entry.method}
                      </span>
                      <div>
                        <strong
                          className={`as-status as-status--${statusTone(entry.status)}`}
                        >
                          {entry.status || "ERR"}
                        </strong>
                        <small>{formatClock(entry.timestamp)}</small>
                        <span>{entry.url}</span>
                      </div>
                      <em>{entry.durationMs} ms</em>
                    </li>
                  ))}
                </ul>
              )}
              {history.length > 0 ? (
                <button
                  type="button"
                  className="as-text-button"
                  onClick={() => {
                    setHistory([]);
                    saveHistory([]);
                  }}
                >
                  Clear history
                </button>
              ) : null}
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
