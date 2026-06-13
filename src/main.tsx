import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { AdminApp } from "@/admin/AdminApp";
import "@/styles/globals.css";
import "@/admin/admin.css";

function ScrollResetOnReload() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navEntry?.type === "reload";
    if (!isReload) return;
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);
  return null;
}

const basePath = import.meta.env.BASE_URL || "/";
const pathname = window.location.pathname;
const normalizedPath =
  basePath !== "/" && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length - 1)
    : pathname;
const isAdminRoute = normalizedPath === "/admin" || normalizedPath.startsWith("/admin/");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdminRoute ? (
      <AdminApp />
    ) : (
      <>
        <ScrollResetOnReload />
        <App />
      </>
    )}
  </StrictMode>,
);
