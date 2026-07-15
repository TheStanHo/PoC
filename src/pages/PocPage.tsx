import type { PocDefinition } from "../pocs/registry";

type PocPageProps = {
  poc: PocDefinition;
  onNavigate: (path: string) => void;
};

export function PocPage({ poc, onNavigate }: PocPageProps) {
  const Demo = poc.Demo;

  return (
    <div
      className={`poc-page ${
        poc.presentation === "immersive" ? "poc-page--immersive" : ""
      }`}
    >
      {poc.presentation !== "immersive" ? (
        <div className="poc-page__toolbar">
        <a
          className="back-link"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("/");
          }}
        >
          Back to PoCs
        </a>
      </div>
      ) : null}
      <div className="poc-page__content">
        <Demo />
      </div>
    </div>
  );
}
