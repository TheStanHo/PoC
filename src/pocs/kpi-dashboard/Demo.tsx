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
    <article className="summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function ServiceCard({
  service,
  period,
}: {
  service: ServiceKpi;
  period: KpiPeriod;
}) {
  const snapshot = getSnapshot(service, period);
  const isSloBreached = snapshot.availability < snapshot.sloTarget;

  return (
    <article className="service-card">
      <div className="service-card__header">
        <div>
          <span className="eyebrow">{service.platform}</span>
          <h3>{service.name}</h3>
        </div>
        <span className={`status-pill status-pill--${service.status}`}>
          {service.status}
        </span>
      </div>

      <p>{service.summary}</p>

      <dl className="metric-grid">
        <div>
          <dt>Availability</dt>
          <dd className={isSloBreached ? "metric-danger" : undefined}>
            {formatPercent(snapshot.availability)}
          </dd>
        </div>
        <div>
          <dt>SLO Target</dt>
          <dd>{formatPercent(snapshot.sloTarget)}</dd>
        </div>
        <div>
          <dt>Error Budget</dt>
          <dd>{snapshot.errorBudgetRemaining}%</dd>
        </div>
        <div>
          <dt>Incidents</dt>
          <dd>{snapshot.incidents}</dd>
        </div>
        <div>
          <dt>Open Incidents</dt>
          <dd>{snapshot.openIncidents}</dd>
        </div>
        <div>
          <dt>P95 Latency</dt>
          <dd>{snapshot.latencyP95Ms}ms</dd>
        </div>
      </dl>

      <div className="check-summary">
        {snapshot.successfulChecks.toLocaleString()} of{" "}
        {snapshot.totalChecks.toLocaleString()} health checks passed this{" "}
        {period === "weekly" ? "week" : "month"}.
      </div>
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
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Trend</span>
          <h2>{period === "weekly" ? "Weekly" : "Monthly"} performance</h2>
        </div>
        <p>
          Average availability and incident count across the selected services.
        </p>
      </div>

      <div className="trend-list">
        {trend.map((point) => (
          <div className="trend-row" key={point.label}>
            <span>{point.label}</span>
            <div className="trend-bar" aria-hidden="true">
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
    <div className="kpi-dashboard">
      <section className="hero hero--dashboard">
        <span className="eyebrow">KPI Dashboard PoC</span>
        <h1>Platform and service reliability KPIs</h1>
        <p>
          A mock dashboard for teams to review SLOs, availability, incidents,
          and service performance by week or month.
        </p>
      </section>

      <section className="controls-panel" aria-label="Dashboard filters">
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

        <div className="period-toggle" aria-label="KPI period">
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
        <section className="team-note">
          <strong>{selectedTeamDetails.name}</strong>
          <span>{selectedTeamDetails.description}</span>
        </section>
      ) : null}

      <section className="summary-grid" aria-label="KPI summary">
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

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Services</span>
            <h2>Service KPI cards</h2>
          </div>
          <p>
            Each card compares the selected {period} result against the service
            target.
          </p>
        </div>

        <div className="service-grid">
          {servicesForTeam.map((service) => (
            <ServiceCard key={service.id} period={period} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
