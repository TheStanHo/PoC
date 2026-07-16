import type { ComponentType } from "react";
import ApiStudioDemo from "./api-studio/Demo";
import DesignerPortfolioDemo from "./designer-portfolio/Demo";
import KpiDashboardDemo from "./kpi-dashboard/Demo";
import MonitorMeDemo from "./monitor-me/Demo";
import PetitCrumbDemo from "./petit-crumb/Demo";
import SaltdriftHouseDemo from "./saltdrift-house/Demo";
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
    slug: "api-studio",
    title: "API Studio",
    description:
      "A Postman-style request lab with mock catalog APIs, headers, auth, response inspection, and copy-as-cURL.",
    tags: ["API", "HTTP", "Developer", "Mock"],
    presentation: "immersive",
    Demo: ApiStudioDemo,
  },
  {
    slug: "monitor-me",
    title: "Monitor-Me",
    description:
      "An interactive phone mockup of the dissertation Android app, with study details and a clickable consent-to-finish flow.",
    tags: ["Research", "Android", "Phone", "Study"],
    presentation: "immersive",
    Demo: MonitorMeDemo,
  },
  {
    slug: "saltdrift-house",
    title: "Saltdrift House",
    description:
      "A coastal linen boutique hotel and spa landing page with rooms, rituals, and a quiet stay enquiry.",
    tags: ["Hotel", "Spa", "Coastal", "Website"],
    presentation: "immersive",
    Demo: SaltdriftHouseDemo,
  },
  {
    slug: "petit-crumb",
    title: "Petit Crumb Cafe",
    description:
      "A soft, modern bakery cafe website with about, menu, and location for a fictional neighbourhood shop.",
    tags: ["Cafe", "Bakery", "Website", "Menu"],
    presentation: "immersive",
    Demo: PetitCrumbDemo,
  },
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
    presentation: "immersive",
    Demo: ServiceCatalogDemo,
  },
  {
    slug: "kpi-dashboard",
    title: "KPI Dashboard",
    description:
      "A platform and service reliability dashboard with weekly and monthly SLO, availability, and incident KPIs.",
    tags: ["KPIs", "SLOs", "Availability", "Platform"],
    presentation: "immersive",
    Demo: KpiDashboardDemo,
  },
];

export const currentFocusSlug = "api-studio";

export const currentFocusPoc =
  pocs.find((poc) => poc.slug === currentFocusSlug) ?? pocs[0];
