import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  presentation?: "standard" | "immersive";
};

export function Layout({
  children,
  currentPath,
  onNavigate,
  presentation = "standard",
}: LayoutProps) {
  const isHome = currentPath === "/";
  const isImmersive = !isHome && presentation === "immersive";

  return (
    <div
      className={`site-shell ${isHome ? "site-shell--home" : "site-shell--poc"} ${
        isImmersive ? "site-shell--immersive" : ""
      }`}
    >
      {!isImmersive ? (
        <header className="site-header">
        <a
          className="brand"
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("/");
          }}
        >
          <span>PoC</span>
          <strong>stanho.dev</strong>
        </a>

        <nav aria-label="Main navigation">
          <a
            aria-current={isHome ? "page" : undefined}
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("/");
            }}
          >
            Home
          </a>
        </nav>
      </header>
      ) : null}

      <main className={isHome ? "site-main site-main--home" : "site-main site-main--poc"}>
        {children}
      </main>
    </div>
  );
}
