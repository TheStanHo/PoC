import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
};

export function Layout({ children, currentPath, onNavigate }: LayoutProps) {
  const isHome = currentPath === "/";

  return (
    <div className="site-shell">
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

      <main>{children}</main>
    </div>
  );
}
