import type { PocDefinition } from "../pocs/registry";

type PocPageProps = {
  poc: PocDefinition;
  onNavigate: (path: string) => void;
};

export function PocPage({ poc, onNavigate }: PocPageProps) {
  const Demo = poc.Demo;

  return (
    <>
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
      <Demo />
    </>
  );
}
