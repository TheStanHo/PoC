# KPI Dashboard PoC

This PoC shows how a platform KPI webpage could help teams review service reliability.

The first version uses mock data so the dashboard shape can be tested before connecting real monitoring sources.

## Current Scope

- Team filtering.
- Weekly and monthly KPI views.
- Service-level SLO target and availability comparison.
- Incident counts and open incident visibility.
- Error budget and P95 latency indicators.
- Simple trend view for availability and incident count.

## Future Data Sources

The mock data in `data.ts` is intentionally shaped like monitoring data so it can later be replaced with API data from tools such as Azure Monitor, Datadog, Grafana, GitHub Actions, or internal service health feeds.
