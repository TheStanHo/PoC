import type { PocDefinition } from "../pocs/registry";

type PocCardProps = {
  poc: PocDefinition;
  onNavigate: (path: string) => void;
};

export function PocCard({ poc, onNavigate }: PocCardProps) {
  const path = `/pocs/${poc.slug}`;

  return (
    <article className="poc-card">
      <div>
        <span className="eyebrow">Proof of concept</span>
        <h2>{poc.title}</h2>
        <p>{poc.description}</p>
      </div>

      <div className="tag-list" aria-label={`${poc.title} tags`}>
        {poc.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <a
        className="button-link"
        href={path}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(path);
        }}
      >
        Open PoC
      </a>
    </article>
  );
}
