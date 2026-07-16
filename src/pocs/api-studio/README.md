# API Studio PoC

A small Postman / Insomnia-style request lab for exploring HTTP calls in the browser.

This PoC is built for a static GitHub Pages hub, so the default environment uses an **in-browser mock API**. No backend is required, and no real secrets should be pasted into the UI.

## What you can try

- Pick starter requests from the Service Catalog collection
- Edit method, path, query params, headers, JSON body, and bearer auth
- Send requests and inspect status, timing, headers, and pretty-printed JSON
- Copy the current call as cURL or `fetch`
- Switch to the public JSONPlaceholder environment for a real network example
- Review the last 20 sends stored in `localStorage` (this browser only)

## Mock routes

Base URL: `mock://api.demo.local`

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/health` | Liveness check |
| GET | `/teams` | Owning teams |
| GET | `/services` | Optional `?team=` filter |
| GET | `/services/:id` | Requires `Bearer demo-token` |
| GET | `/incidents` | Open mock incidents |
| POST | `/incidents` | Requires `Bearer demo-token` and JSON body |

## Safety notes

- Use only the fake token `demo-token`
- Do not enter real API keys, passwords, or customer data
- Public environment calls may fail when a site blocks CORS
