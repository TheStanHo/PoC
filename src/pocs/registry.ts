import type { ComponentType } from "react";
import KpiDashboardDemo from "./kpi-dashboard/Demo";
import ServiceCatalogDemo from "./service-catalog/Demo";

export type PocDefinition = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  Demo: ComponentType;
};

export const pocs: PocDefinition[] = [
  {
    slug: "service-catalog",
    title: "Service Catalog",
    description:
      "A searchable service ownership catalog with mock teams, health, runbooks, dashboards, and dependencies.",
    tags: ["Catalog", "Ownership", "Runbooks", "Services"],
    Demo: ServiceCatalogDemo,
  },
  {
    slug: "kpi-dashboard",
    title: "KPI Dashboard",
    description:
      "A platform and service reliability dashboard with weekly and monthly SLO, availability, and incident KPIs.",
    tags: ["KPIs", "SLOs", "Availability", "Platform"],
    Demo: KpiDashboardDemo,
  },
];

export const currentFocusSlug = "service-catalog";

export const currentFocusPoc =
  pocs.find((poc) => poc.slug === currentFocusSlug) ?? pocs[0];
