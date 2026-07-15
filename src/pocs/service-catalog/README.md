# Service Catalog PoC

This PoC explores a simple service catalog for platform and product teams.

The first version uses synthetic data only. It is intended to show how teams could quickly find service ownership, health, lifecycle, runbooks, dashboards, and dependencies.

## Current Scope

- Search services by name, description, owner, or language.
- Filter by team and platform.
- Show service health, lifecycle, tier, dependencies, and review date.
- Link to mock repository, runbook, and dashboard locations.

## Future Ideas

- Add nested service detail pages under `/pocs/service-catalog/services/<service-id>`.
- Connect to GitHub repository metadata.
- Pull health and dashboard links from monitoring tools.
- Add ownership review reminders.
