# Agent Instructions

This repository is a proof-of-concept hub that will be published to GitHub Pages at `poc.stanho.dev`.

Build it as one static site containing many PoCs, not as separate apps per PoC. Prefer Vite + React + TypeScript unless the project is intentionally changed later.

## Project Layout

```text
public/
  CNAME
  assets/
src/
  components/
    Layout.tsx
    PocCard.tsx
  pages/
    Home.tsx
    PocPage.tsx
  pocs/
    registry.ts
    example-poc/
      Demo.tsx
      README.md
      components/
      pages/
      assets/
  styles/
    globals.css
```

## Conventions

- Keep each PoC in `src/pocs/<poc-name>/`.
- Each PoC should expose a main `Demo.tsx` as its entry point.
- A PoC can have multiple internal pages when useful.
- Keep PoC-specific pages, components, data, and types inside that PoC folder.
- Add PoC metadata and routing information through `src/pocs/registry.ts`.
- Use `currentFocusSlug` in `src/pocs/registry.ts` to choose the homepage featured/current PoC.
- When adding a new PoC that should be featured, update `currentFocusSlug` to that PoC's slug; do not rely on `pocs[0]` ordering.
- Use URLs in the form `/pocs/<poc-name>`.
- For multi-page PoCs, use nested URLs under the PoC, such as `/pocs/kpi-dashboard/services`.
- Let the global app route identify the PoC, then let the PoC handle its own internal sub-pages.
- Each PoC should include a visible `PoC hub` link back to `/`, styled to fit that PoC's own design.
- Prefer full-page PoC presentations that do not show the global hub header/chrome inside the demo route.
- Choose each PoC's layout, theme, and interaction model based on that PoC's purpose first.
- Do not force PoCs to match the homepage theme, styling, or layout.
- Each PoC may have its own visual direction, theme, typography, spacing, and interaction model when that better fits the concept.
- Keep reusable UI in `src/components/`.
- Keep route/page-level components in `src/pages/`.
- Keep global styling in `src/styles/globals.css`.
- Keep static public files in `public/`.
- Use `public/CNAME` with the value `poc.stanho.dev` for GitHub Pages.

## Confidentiality

- Treat all committed files as public because this repo is intended for GitHub Pages.
- Use mock, anonymized, or synthetic data for PoCs.
- Do not commit secrets, credentials, `.env` files, real customer data, internal hostnames, private URLs, exported logs, private screenshots, or production incident details.

When adding new work, keep it small, easy to understand, and beginner-friendly.
