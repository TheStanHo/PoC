import { useMemo, useState } from "react";
import { platforms, serviceCatalog, teams } from "./data";
import type { ServiceCatalogEntry, ServiceHealth } from "./types";

type FilterValue = "all" | string;

const healthLabel: Record<ServiceHealth, string> = {
  healthy: "Healthy",
  watch: "Watch",
  degraded: "Degraded",
};

const normalize = (value: string) => value.trim().toLowerCase();

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

function ServiceCatalogCard({ service }: { service: ServiceCatalogEntry }) {
  return (
    <article className="catalog-card">
      <div className="catalog-card__header">
        <div>
          <span className="eyebrow">{service.platform}</span>
          <h3>{service.name}</h3>
        </div>
        <span className={`status-pill status-pill--${service.health}`}>
          {healthLabel[service.health]}
        </span>
      </div>

      <p>{service.description}</p>

      <dl className="catalog-details">
        <div>
          <dt>Team</dt>
          <dd>{service.team}</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{service.owner}</dd>
        </div>
        <div>
          <dt>Tier</dt>
          <dd>{service.tier.toUpperCase()}</dd>
        </div>
        <div>
          <dt>Lifecycle</dt>
          <dd>{service.lifecycle}</dd>
        </div>
        <div>
          <dt>Language</dt>
          <dd>{service.language}</dd>
        </div>
        <div>
          <dt>Deployments</dt>
          <dd>{service.monthlyDeployments}/month</dd>
        </div>
      </dl>

      <div className="dependency-list" aria-label={`${service.name} dependencies`}>
        {service.dependencies.map((dependency) => (
          <span key={dependency}>{dependency}</span>
        ))}
      </div>

      <div className="catalog-links">
        <a href={`https://${service.repository}`}>Repository</a>
        <a href={`https://${service.runbook}`}>Runbook</a>
        <a href={`https://${service.dashboard}`}>Dashboard</a>
      </div>

      <span className="catalog-review">Last reviewed {service.lastReview}</span>
    </article>
  );
}

export default function ServiceCatalogDemo() {
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<FilterValue>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<FilterValue>("all");

  const filteredServices = useMemo(() => {
    const searchTerm = normalize(search);

    return serviceCatalog.filter((service) => {
      const matchesTeam =
        selectedTeam === "all" || service.team === selectedTeam;
      const matchesPlatform =
        selectedPlatform === "all" || service.platform === selectedPlatform;
      const matchesSearch =
        !searchTerm ||
        normalize(
          `${service.name} ${service.description} ${service.owner} ${service.language}`,
        ).includes(searchTerm);

      return matchesTeam && matchesPlatform && matchesSearch;
    });
  }, [search, selectedPlatform, selectedTeam]);

  const summary = useMemo(() => {
    const tierOne = filteredServices.filter(
      (service) => service.tier === "tier-1",
    ).length;
    const watchOrDegraded = filteredServices.filter(
      (service) => service.health !== "healthy",
    ).length;
    const previewOrDeprecated = filteredServices.filter(
      (service) => service.lifecycle !== "production",
    ).length;

    return {
      tierOne,
      watchOrDegraded,
      previewOrDeprecated,
    };
  }, [filteredServices]);

  return (
    <div className="service-catalog">
      <section className="hero hero--dashboard">
        <span className="eyebrow">Service Catalog PoC</span>
        <h1>Find service ownership before something breaks.</h1>
        <p>
          A mock catalog for teams to discover service owners, health, runbooks,
          dashboards, dependencies, and lifecycle state in one place.
        </p>
      </section>

      <section className="controls-panel catalog-controls" aria-label="Catalog filters">
        <label>
          Search
          <input
            placeholder="Search by service, owner, language..."
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <label>
          Team
          <select
            value={selectedTeam}
            onChange={(event) => setSelectedTeam(event.target.value)}
          >
            <option value="all">All teams</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </label>

        <label>
          Platform
          <select
            value={selectedPlatform}
            onChange={(event) => setSelectedPlatform(event.target.value)}
          >
            <option value="all">All platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="summary-grid" aria-label="Catalog summary">
        <SummaryCard
          label="Services"
          value={String(filteredServices.length)}
          detail="Matching the active filters"
        />
        <SummaryCard
          label="Tier 1"
          value={String(summary.tierOne)}
          detail="Most critical services"
        />
        <SummaryCard
          label="Needs Attention"
          value={String(summary.watchOrDegraded)}
          detail="Watch or degraded health"
        />
        <SummaryCard
          label="Non-Production"
          value={String(summary.previewOrDeprecated)}
          detail="Preview or deprecated services"
        />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Catalog</span>
            <h2>Registered services</h2>
          </div>
          <p>
            Service cards show who owns the service, where to find operational
            context, and which dependencies matter.
          </p>
        </div>

        <div className="catalog-grid">
          {filteredServices.map((service) => (
            <ServiceCatalogCard key={service.id} service={service} />
          ))}
        </div>

        {filteredServices.length === 0 ? (
          <p className="empty-state">No services match the current filters.</p>
        ) : null}
      </section>
    </div>
  );
}
