export type KpiPeriod = "weekly" | "monthly";

export type ServiceStatus = "healthy" | "warning" | "breached";

export type Team = {
  id: string;
  name: string;
  description: string;
};

export type KpiSnapshot = {
  availability: number;
  sloTarget: number;
  errorBudgetRemaining: number;
  incidents: number;
  openIncidents: number;
  latencyP95Ms: number;
  successfulChecks: number;
  totalChecks: number;
};

export type KpiTrendPoint = {
  label: string;
  availability: number;
  incidents: number;
};

export type ServiceKpi = {
  id: string;
  teamId: string;
  platform: string;
  name: string;
  owner: string;
  status: ServiceStatus;
  summary: string;
  weekly: KpiSnapshot;
  monthly: KpiSnapshot;
  weeklyTrend: KpiTrendPoint[];
  monthlyTrend: KpiTrendPoint[];
};
