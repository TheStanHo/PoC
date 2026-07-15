import { PocCard } from "../components/PocCard";
import { pocs } from "../pocs/registry";

type HomeProps = {
  onNavigate: (path: string) => void;
};

export function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">Proof-of-concept hub</span>
        <h1>Small demos for testing ideas before they become products.</h1>
        <p>
          This site collects platform, service, and engineering PoCs that can be
          shared from `poc.stanho.dev`.
        </p>
      </section>

      <section className="poc-grid" aria-label="Available proof of concepts">
        {pocs.map((poc) => (
          <PocCard key={poc.slug} poc={poc} onNavigate={onNavigate} />
        ))}
      </section>
    </>
  );
}
