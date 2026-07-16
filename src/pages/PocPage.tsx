import type { PocDefinition } from "../pocs/registry";

type PocPageProps = {
  poc: PocDefinition;
};

export function PocPage({ poc }: PocPageProps) {
  const Demo = poc.Demo;

  return (
    <div
      className={`poc-page ${
        poc.presentation === "immersive" ? "poc-page--immersive" : ""
      }`}
    >
      <div className="poc-page__content">
        <Demo />
      </div>
    </div>
  );
}
