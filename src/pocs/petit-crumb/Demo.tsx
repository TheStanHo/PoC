import { useState } from "react";
import { cafe, cafeHours, menuCategories, menuItems } from "./data";
import type { MenuCategory } from "./types";

export default function PetitCrumbDemo() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Bakes");

  const visibleItems = menuItems.filter(
    (item) => item.category === activeCategory,
  );
  const featuredItems = menuItems.filter((item) => item.featured && item.imageUrl);

  return (
    <div className="petit-crumb">
      <div className="petit-crumb__atmosphere" aria-hidden="true" />

      <nav className="petit-crumb__nav" aria-label="Petit Crumb sections">
        <a className="petit-crumb__hub" href="/">
          ← PoC hub
        </a>
        <strong className="petit-crumb__brand-mark">{cafe.name}</strong>
        <div className="petit-crumb__nav-links">
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#visit">Visit</a>
        </div>
      </nav>

      <header className="petit-crumb__hero">
        <img
          alt="Fresh butter croissants on a bakery counter"
          className="petit-crumb__hero-image"
          src={cafe.heroImage}
        />
        <div className="petit-crumb__hero-veil" aria-hidden="true" />
        <div className="petit-crumb__hero-content">
          <p className="petit-crumb__brand">{cafe.name}</p>
          <h1>{cafe.tagline}</h1>
          <p className="petit-crumb__hero-blurb">{cafe.blurb}</p>
          <div className="petit-crumb__hero-actions">
            <a className="petit-crumb__button" href="#menu">
              See the menu
            </a>
            <a className="petit-crumb__text-link" href="#visit">
              Find us
            </a>
          </div>
        </div>
      </header>

      <section className="petit-crumb__section petit-crumb__about" id="about">
        <div className="petit-crumb__about-copy">
          <span className="petit-crumb__eyebrow">About</span>
          <h2>A small bakery cafe for soft mornings.</h2>
          <p>{cafe.about}</p>
        </div>
        <figure className="petit-crumb__about-media">
          <img
            alt="Sunlit cafe interior with wooden tables and soft seating"
            src={cafe.aboutImage}
          />
        </figure>
      </section>

      <section className="petit-crumb__section petit-crumb__menu" id="menu">
        <div className="petit-crumb__section-heading">
          <span className="petit-crumb__eyebrow">Menu</span>
          <h2>A short list, made carefully.</h2>
          <p>
            A few bakes, a few drinks, a few savory bites. Enough to linger,
            never too much to choose.
          </p>
        </div>

        <div className="petit-crumb__featured" aria-label="Featured menu items">
          {featuredItems.map((item) => (
            <figure key={item.id} className="petit-crumb__featured-item">
              <img alt={item.name} src={item.imageUrl} />
              <figcaption>
                <span>{item.name}</span>
                <span>{item.price}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="petit-crumb__menu-tabs"
          role="tablist"
          aria-label="Menu categories"
        >
          {menuCategories.map((category) => (
            <button
              key={category}
              aria-selected={activeCategory === category}
              className={
                activeCategory === category
                  ? "petit-crumb__tab petit-crumb__tab--active"
                  : "petit-crumb__tab"
              }
              onClick={() => setActiveCategory(category)}
              role="tab"
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="petit-crumb__menu-list" role="tabpanel">
          {visibleItems.map((item) => (
            <li key={item.id} className="petit-crumb__menu-item">
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="petit-crumb__section petit-crumb__visit" id="visit">
        <div className="petit-crumb__visit-copy">
          <span className="petit-crumb__eyebrow">Visit</span>
          <h2>Come in for something warm.</h2>
          <p>
            We are a neighbourhood stop for early coffee, lunch pastries, and
            quiet afternoons. Walk-ins welcome.
          </p>

          <address className="petit-crumb__address">
            {cafe.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <a href={`mailto:${cafe.email}`}>{cafe.email}</a>
            <a href={`tel:${cafe.phone.replace(/[^\d+]/g, "")}`}>{cafe.phone}</a>
          </address>

          <dl className="petit-crumb__hours">
            {cafeHours.map((entry) => (
              <div key={entry.day}>
                <dt>{entry.day}</dt>
                <dd>{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="petit-crumb__visit-media">
          <img
            alt="Latte art coffee next to a pastry on a cafe table"
            src={cafe.visitImage}
          />
        </figure>
      </section>

      <footer className="petit-crumb__footer">
        <strong>{cafe.name}</strong>
        <span>A fictional bakery cafe PoC for poc.stanho.dev</span>
        <a href="/">← PoC hub</a>
      </footer>
    </div>
  );
}
