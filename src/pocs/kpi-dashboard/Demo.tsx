import { useMemo, useState } from "react";
import { services, teams } from "./data";
import type { KpiPeriod, KpiSnapshot, KpiTrendPoint, ServiceKpi } from "./types";

type TeamFilter = "all" | string;

const formatPercent = (value: number) => `${value.toFixed(2)}%`;

const getSnapshot = (service: ServiceKpi, period: KpiPeriod): KpiSnapshot =>
  service[period];

const getTrend = (service: ServiceKpi, period: KpiPeriod): KpiTrendPoint[] =>
  period === "weekly" ? service.weeklyTrend : service.monthlyTrend;

const getTrendWidth = (availability: number) => {
  const width = ((availability - 98) / 2) * 100;
  return `${Math.min(100, Math.max(8, width))}%`;
};

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="kpi-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function ServiceRow({
  service,
  period,
}: {
  service: ServiceKpi;
  period: KpiPeriod;
}) {
  const snapshot = getSnapshot(service, period);
  const isSloBreached = snapshot.availability < snapshot.sloTarget;

  return (
    <article className="kpi-service-row">
      <div className="kpi-service-row__name">
        <strong>{service.name}</strong>
        <span>{service.platform}</span>
      </div>
      <span className={`status-pill status-pill--${service.status}`}>
        {service.status}
      </span>
      <strong className={isSloBreached ? "kpi-danger" : undefined}>
        {formatPercent(snapshot.availability)}
      </strong>
      <span>{formatPercent(snapshot.sloTarget)}</span>
      <span>{snapshot.errorBudgetRemaining}%</span>
      <span>{snapshot.incidents}</span>
      <span>{snapshot.latencyP95Ms}ms</span>
      <span className="kpi-check-summary">
        {snapshot.successfulChecks.toLocaleString()} of{" "}
        {snapshot.totalChecks.toLocaleString()}
      </span>
    </article>
  );
}

function TrendPanel({
  servicesForTeam,
  period,
}: {
  servicesForTeam: ServiceKpi[];
  period: KpiPeriod;
}) {
  const trend = useMemo(() => {
    const firstService = servicesForTeam[0];

    if (!firstService) {
      return [];
    }

    return getTrend(firstService, period).map((point, index) => {
      const matchingPoints = servicesForTeam
        .map((service) => getTrend(service, period)[index])
        .filter(Boolean);
      const availability =
        matchingPoints.reduce((total, item) => total + item.availability, 0) /
        matchingPoints.length;
      const incidents = matchingPoints.reduce(
        (total, item) => total + item.incidents,
        0,
      );

      return {
        label: point.label,
        availability,
        incidents,
      };
    });
  }, [period, servicesForTeam]);

  return (
    <section className="kpi-panel kpi-trend-panel">
      <div className="kpi-section-heading">
        <div>
          <span className="eyebrow">Trend</span>
          <h2>{period === "weekly" ? "Weekly" : "Monthly"} performance</h2>
        </div>
        <p>
          Average availability and incident count across the selected services.
        </p>
      </div>

      <div className="kpi-trend-list">
        {trend.map((point) => (
          <div className="kpi-trend-row" key={point.label}>
            <span>{point.label}</span>
            <div className="kpi-trend-bar" aria-hidden="true">
              <span style={{ width: getTrendWidth(point.availability) }} />
            </div>
            <strong>{formatPercent(point.availability)}</strong>
            <em>{point.incidents} incidents</em>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function KpiDashboardDemo() {
  const [selectedTeam, setSelectedTeam] = useState<TeamFilter>("all");
  const [period, setPeriod] = useState<KpiPeriod>("weekly");

  const servicesForTeam = useMemo(
    () =>
      selectedTeam === "all"
        ? services
        : services.filter((service) => service.teamId === selectedTeam),
    [selectedTeam],
  );

  const summary = useMemo(() => {
    const snapshots = servicesForTeam.map((service) => getSnapshot(service, period));
    const averageAvailability =
      snapshots.reduce((total, item) => total + item.availability, 0) /
      snapshots.length;
    const breachedSlos = snapshots.filter(
      (item) => item.availability < item.sloTarget,
    ).length;
    const openIncidents = snapshots.reduce(
      (total, item) => total + item.openIncidents,
      0,
    );
    const warningServices = servicesForTeam.filter(
      (service) => service.status === "warning",
    ).length;
    const breachedServices = servicesForTeam.filter(
      (service) => service.status === "breached",
    ).length;

    return {
      averageAvailability,
      breachedSlos,
      openIncidents,
      warningServices,
      breachedServices,
    };
  }, [period, servicesForTeam]);

  const selectedTeamDetails =
    selectedTeam === "all"
      ? undefined
      : teams.find((team) => team.id === selectedTeam);

  return (
    <div className="kpi-poc">
      <section className="kpi-hero">
        <div>
          <a className="kpi-hub-link" href="/">
            PoC hub
          </a>
          <span className="eyebrow">KPI Dashboard PoC</span>
          <h1>Reliability command centre</h1>
          <p>
            A focused operations view for checking SLOs, availability, error
            budget, incidents, and service performance by week or month.
          </p>
        </div>
        <aside className="kpi-hero__status">
          <span>Operational view</span>
          <strong>{formatPercent(summary.averageAvailability)}</strong>
          <p>Average availability for the selected scope.</p>
        </aside>
      </section>

      <section className="kpi-control-bar" aria-label="Dashboard filters">
        <label>
          Team
          <select
            value={selectedTeam}
            onChange={(event) => setSelectedTeam(event.target.value)}
          >
            <option value="all">All teams</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <div className="kpi-period-toggle" aria-label="KPI period">
          <button
            className={period === "weekly" ? "active" : undefined}
            type="button"
            onClick={() => setPeriod("weekly")}
          >
            Weekly
          </button>
          <button
            className={period === "monthly" ? "active" : undefined}
            type="button"
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
        </div>
      </section>

      {selectedTeamDetails ? (
        <section className="kpi-team-note">
          <strong>{selectedTeamDetails.name}</strong>
          <span>{selectedTeamDetails.description}</span>
        </section>
      ) : null}

      <section className="kpi-metric-grid" aria-label="KPI summary">
        <SummaryCard
          label="Average Availability"
          value={formatPercent(summary.averageAvailability)}
          detail={`${servicesForTeam.length} services in view`}
        />
        <SummaryCard
          label="SLO Breaches"
          value={String(summary.breachedSlos)}
          detail="Services below their target"
        />
        <SummaryCard
          label="Open Incidents"
          value={String(summary.openIncidents)}
          detail="Incidents still being handled"
        />
        <SummaryCard
          label="Service Health"
          value={`${summary.breachedServices} breached`}
          detail={`${summary.warningServices} warning services`}
        />
      </section>

      <TrendPanel servicesForTeam={servicesForTeam} period={period} />

      <section className="kpi-analysis-grid">
        <div className="kpi-panel kpi-incident-panel">
          <span className="eyebrow">Attention queue</span>
          <h2>Incidents and SLO risk</h2>
          <div className="kpi-attention-list">
            <div>
              <strong>{summary.openIncidents}</strong>
              <span>open incidents</span>
            </div>
            <div>
              <strong>{summary.breachedSlos}</strong>
              <span>SLO breaches</span>
            </div>
            <div>
              <strong>{summary.warningServices}</strong>
              <span>warning services</span>
            </div>
            <div>
              <strong>{summary.breachedServices}</strong>
              <span>breached services</span>
            </div>
          </div>
        </div>

        <div className="kpi-panel kpi-shift-panel">
          <span className="eyebrow">Shift note</span>
          <h2>What to check first</h2>
          <p>
            Start with services below SLO target, then review open incidents and
            error budget burn before approving further changes.
          </p>
        </div>
      </section>

      <section className="kpi-panel">
        <div className="kpi-section-heading">
          <div>
            <span className="eyebrow">Services</span>
            <h2>Service health board</h2>
          </div>
          <p>
            Each row compares the selected {period} result against the service
            target.
          </p>
        </div>

        <div className="kpi-service-board" role="table" aria-label="Service health board">
          <div className="kpi-service-board__header" role="row">
            <span>Service</span>
            <span>Status</span>
            <span>Avail.</span>
            <span>SLO</span>
            <span>Budget</span>
            <span>Inc.</span>
            <span>P95</span>
            <span>Checks</span>
          </div>
          {servicesForTeam.map((service) => (
            <ServiceRow key={service.id} period={period} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
