import { portfolioProjects, portfolioServices } from "./data";

function ProjectCard({
  index,
  project,
}: {
  index: number;
  project: (typeof portfolioProjects)[number];
}) {
  return (
    <article
      className={`portfolio-project ${
        index === 0 ? "portfolio-project--feature" : ""
      }`}
    >
      <img alt={`${project.title} visual concept`} src={project.imageUrl} />
      <div className="portfolio-project__body">
        <span className="portfolio-project__count">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="eyebrow">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="portfolio-meta">
        <span>{project.year}</span>
        <div className="portfolio-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function DesignerPortfolioDemo() {
  return (
    <div className="designer-portfolio">
      <nav className="portfolio-nav" aria-label="Portfolio sections">
        <a href="/">← PoC hub</a>
        <strong>Maya Vale</strong>
        <span>Selected works 2025-2026</span>
      </nav>

      <section className="portfolio-hero">
        <div className="portfolio-hero__content">
          <div className="portfolio-hero__eyebrow-row">
            <span>Graphic Designer Portfolio</span>
            <span>London / Remote</span>
          </div>
          <h1>Modern brands with texture, clarity, and character.</h1>
          <p>
            A contemporary portfolio concept for a fictional graphic designer
            creating identity systems, campaign visuals, editorial layouts, and
            packaging with a refined visual point of view.
          </p>
          <div className="portfolio-hero__actions">
            <a className="portfolio-button" href="mailto:hello@example.com">
              Start a project
            </a>
            <a className="portfolio-secondary-link" href="#selected-work">
              View selected work
            </a>
          </div>
        </div>

        <div className="portfolio-hero__card" aria-label="Designer profile">
          <span>Available for selected projects</span>
          <strong>Maya Vale</strong>
          <p>Brand identity, art direction, editorial systems, and packaging.</p>
          <div className="portfolio-stats" aria-label="Portfolio highlights">
            <span>24 launches</span>
            <span>8 years</span>
            <span>3 disciplines</span>
          </div>
        </div>
      </section>

      <div className="portfolio-marquee" aria-hidden="true">
        <span>Identity</span>
        <span>Campaigns</span>
        <span>Editorial</span>
        <span>Packaging</span>
      </div>

      <section className="portfolio-section" id="selected-work">
        <div className="portfolio-section-heading">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2>Case studies with strong visual direction.</h2>
          </div>
          <p>
            A modern portfolio rhythm: large imagery, minimal copy, sharp
            metadata, and enough context to invite a deeper conversation.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolioProjects.map((project, index) => (
            <ProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="portfolio-services">
        <div>
          <span className="eyebrow">Services</span>
          <h2>Design support for launches, campaigns, and brands.</h2>
        </div>

        <div className="portfolio-service-grid">
          {portfolioServices.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-contact">
        <span className="eyebrow">Contact</span>
        <h2>Need a visual system that feels unmistakably yours?</h2>
        <p>
          This PoC keeps the contact flow intentionally direct: a confident pitch,
          a single call to action, and a portfolio-first experience.
        </p>
        <a className="portfolio-button" href="mailto:hello@example.com">
          hello@example.com
        </a>
      </section>
    </div>
  );
}
