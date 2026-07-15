import { PocCard } from "../components/PocCard";
import { pocs } from "../pocs/registry";

type HomeProps = {
  onNavigate: (path: string) => void;
};

export function Home({ onNavigate }: HomeProps) {
  const currentFocus = pocs[0];
  const currentFocusPath = currentFocus ? `/pocs/${currentFocus.slug}` : "/";

  return (
    <>
      <section className="hero home-hero">
        <div className="home-hero__content">
          <span className="eyebrow">poc.stanho.dev</span>
          <h1>Proofs of concept for platform ideas.</h1>
          <p>
            A dark, focused space for testing small engineering demos before
            they become bigger internal tools or product features.
          </p>
          <div className="hero-actions">
            <a
              className="button-link"
              href={currentFocusPath}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(currentFocusPath);
              }}
            >
              {currentFocus ? `View ${currentFocus.title}` : "View PoCs"}
            </a>
            <span>Built for quick experiments, clean demos, and mock data.</span>
          </div>
        </div>

        {currentFocus ? (
          <aside className="home-hero__panel" aria-label="Current PoC focus">
            <span className="eyebrow">Current focus</span>
            <strong>{currentFocus.title}</strong>
            <p>{currentFocus.description}</p>
          </aside>
        ) : null}
      </section>

      <section className="poc-grid" aria-label="Available proof of concepts">
        {pocs.map((poc) => (
          <PocCard key={poc.slug} poc={poc} onNavigate={onNavigate} />
        ))}
      </section>
    </>
  );
}
