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

function ServiceCatalogRecord({ service }: { service: ServiceCatalogEntry }) {
  return (
    <article className="catalog-record">
      <div className="catalog-record__main">
        <div className="catalog-record__title">
          <h3>{service.name}</h3>
          <span>{service.platform}</span>
        </div>
        <span className={`catalog-health catalog-health--${service.health}`}>
          {healthLabel[service.health]}
        </span>
      </div>

      <p>{service.description}</p>

      <dl className="catalog-record__meta">
        <div><dt>Owner</dt><dd>{service.owner}</dd></div>
        <div><dt>Team</dt><dd>{service.team}</dd></div>
        <div><dt>Tier</dt><dd>{service.tier.toUpperCase()}</dd></div>
        <div><dt>Lifecycle</dt><dd>{service.lifecycle}</dd></div>
        <div><dt>Language</dt><dd>{service.language}</dd></div>
        <div><dt>Deploys</dt><dd>{service.monthlyDeployments}/month</dd></div>
      </dl>

      <div className="catalog-record__footer">
        <div className="catalog-dependency-list" aria-label={`${service.name} dependencies`}>
          {service.dependencies.map((dependency) => (
            <span key={dependency}>{dependency}</span>
          ))}
        </div>

        <div className="catalog-links">
          <a href={`https://${service.repository}`}>Repo</a>
          <a href={`https://${service.runbook}`}>Runbook</a>
          <a href={`https://${service.dashboard}`}>Dashboard</a>
        </div>
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
    <div className="catalog-poc">
      <section className="catalog-hero">
        <div>
          <nav className="catalog-poc-nav" aria-label="Service catalog navigation">
            <a className="catalog-hub-link" href="/">
              ← PoC hub
            </a>
          </nav>
          <span className="catalog-kicker">Service Catalog PoC</span>
          <h1>Search the service directory.</h1>
          <p>
            A mock internal catalog for finding owners, runbooks, dashboards,
            dependencies, lifecycle state, and service health.
          </p>
        </div>
        <aside>
          <strong>{serviceCatalog.length}</strong>
          <span>registered services</span>
        </aside>
      </section>

      <div className="catalog-directory-layout">
        <aside className="catalog-sidebar" aria-label="Catalog filters">
          <label>
            Search services
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

          <div className="catalog-sidebar__counts">
            <span>{filteredServices.length} matching services</span>
            <span>{summary.tierOne} tier 1</span>
            <span>{summary.watchOrDegraded} need attention</span>
            <span>{summary.previewOrDeprecated} non-production</span>
          </div>
        </aside>

        <section className="catalog-results-panel">
          <div className="catalog-section-heading">
            <div>
              <span className="catalog-kicker">Directory</span>
              <h2>Registered services</h2>
            </div>
            <p>
              List records prioritise ownership and operational links over
              dashboard-style reporting.
            </p>
          </div>

          <div className="catalog-record-list">
            {filteredServices.map((service) => (
              <ServiceCatalogRecord key={service.id} service={service} />
            ))}
          </div>

          {filteredServices.length === 0 ? (
            <p className="empty-state">No services match the current filters.</p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
