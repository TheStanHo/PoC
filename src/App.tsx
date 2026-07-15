import { useCallback, useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { PocPage } from "./pages/PocPage";
import { pocs } from "./pocs/registry";

const normalizePath = (path: string) => {
  const [pathname] = path.split(/[?#]/);
  const trimmed = pathname.replace(/\/+$/, "");

  return trimmed || "/";
};

const getInitialPath = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const redirectedPath = searchParams.get("path");

  return normalizePath(redirectedPath ?? window.location.pathname);
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(getInitialPath);

  const navigate = useCallback((path: string, replace = false) => {
    const nextPath = normalizePath(path);
    const method = replace ? "replaceState" : "pushState";

    window.history[method]({}, "", nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const redirectedPath = new URLSearchParams(window.location.search).get("path");

    if (redirectedPath) {
      navigate(redirectedPath, true);
    }

    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const activePoc = pocs.find(
    (poc) => currentPath === `/pocs/${poc.slug}`,
  );

  let content = <Home onNavigate={navigate} />;

  if (activePoc) {
    content = <PocPage poc={activePoc} onNavigate={navigate} />;
  } else if (currentPath !== "/") {
    content = (
      <section className="hero">
        <span className="eyebrow">Not found</span>
        <h1>That PoC page does not exist yet.</h1>
        <p>Use the home page to choose an available proof of concept.</p>
      </section>
    );
  }

  return (
    <Layout currentPath={currentPath} onNavigate={navigate}>
      {content}
    </Layout>
  );
}
