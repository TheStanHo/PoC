import { PocCard } from "../components/PocCard";
import { currentFocusPoc, pocs } from "../pocs/registry";

type HomeProps = {
  onNavigate: (path: string) => void;
};

const marqueeTags = Array.from(new Set(pocs.flatMap((poc) => poc.tags)));

export function Home({ onNavigate }: HomeProps) {
  const currentFocusPath = currentFocusPoc
    ? `/pocs/${currentFocusPoc.slug}`
    : "/";

  return (
    <div className="home-page">
      <section className="home-intro" aria-labelledby="home-heading">
        <div className="home-intro__copy">
          <span className="home-kicker">poc.stanho.dev</span>
          <h1 id="home-heading">Small experiments. Working demos.</h1>
          <p>
            A public home for proofs of concept — websites, dashboards, tools,
            and anything else worth trying out with mock data before it grows
            into something bigger.
          </p>
          <div className="home-intro__actions">
            <a
              className="home-button"
              href={currentFocusPath}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(currentFocusPath);
              }}
            >
              {currentFocusPoc ? `Open ${currentFocusPoc.title}` : "Browse PoCs"}
            </a>
            <span className="home-intro__note">
              {pocs.length} live demos · synthetic data only
            </span>
          </div>
        </div>

        {currentFocusPoc ? (
          <aside className="home-focus" aria-label="Current PoC focus">
            <span className="home-kicker">Current focus</span>
            <strong>{currentFocusPoc.title}</strong>
            <p>{currentFocusPoc.description}</p>
            <div className="home-focus__tags">
              {currentFocusPoc.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </aside>
        ) : null}
      </section>

      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee__track">
          {[...marqueeTags, ...marqueeTags].map((tag, index) => (
            <span key={`${tag}-${index}`}>{tag}</span>
          ))}
        </div>
      </div>

      <section className="home-catalog" aria-labelledby="home-catalog-heading">
        <header className="home-catalog__header">
          <div>
            <span className="home-kicker">Catalog</span>
            <h2 id="home-catalog-heading">All experiments</h2>
          </div>
          <p>
            Each PoC is self-contained with its own layout, theme, and
            interaction model.
          </p>
        </header>

        <div className="home-grid">
          {pocs.map((poc) => (
            <PocCard key={poc.slug} poc={poc} onNavigate={onNavigate} />
          ))}
        </div>
      </section>
    </div>
  );
}
