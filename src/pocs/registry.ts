import type { ComponentType } from "react";
import DesignerPortfolioDemo from "./designer-portfolio/Demo";
import KpiDashboardDemo from "./kpi-dashboard/Demo";
import ServiceCatalogDemo from "./service-catalog/Demo";

export type PocDefinition = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  presentation?: "standard" | "immersive";
  Demo: ComponentType;
};

export const pocs: PocDefinition[] = [
  {
    slug: "designer-portfolio",
    title: "Designer Portfolio",
    description:
      "A simple graphic designer portfolio website concept with featured work, services, and a clean contact call to action.",
    tags: ["Portfolio", "Design", "Creative", "Website"],
    presentation: "immersive",
    Demo: DesignerPortfolioDemo,
  },
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

export const currentFocusSlug = "designer-portfolio";

export const currentFocusPoc =
  pocs.find((poc) => poc.slug === currentFocusSlug) ?? pocs[0];
