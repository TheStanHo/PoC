export type ServiceHealth = "healthy" | "watch" | "degraded";

export type ServiceLifecycle = "production" | "preview" | "deprecated";

export type ServiceTier = "tier-1" | "tier-2" | "tier-3";

export type ServiceCatalogEntry = {
  id: string;
  name: string;
  description: string;
  team: string;
  owner: string;
  platform: string;
  health: ServiceHealth;
  lifecycle: ServiceLifecycle;
  tier: ServiceTier;
  language: string;
  repository: string;
  runbook: string;
  dashboard: string;
  dependencies: string[];
  lastReview: string;
  monthlyDeployments: number;
};
