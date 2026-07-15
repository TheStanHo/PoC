import type { ComponentType } from "react";
import KpiDashboardDemo from "./kpi-dashboard/Demo";

export type PocDefinition = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  Demo: ComponentType;
};

export const pocs: PocDefinition[] = [
  {
    slug: "kpi-dashboard",
    title: "KPI Dashboard",
    description:
      "A platform and service reliability dashboard with weekly and monthly SLO, availability, and incident KPIs.",
    tags: ["KPIs", "SLOs", "Availability", "Platform"],
    Demo: KpiDashboardDemo,
  },
];

export const currentFocusSlug = "kpi-dashboard";

export const currentFocusPoc =
  pocs.find((poc) => poc.slug === currentFocusSlug) ?? pocs[0];
