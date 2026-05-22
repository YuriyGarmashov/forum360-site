import { useState } from "react";
import { NAV_LINKS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAnchorScroll } from "@/hooks/useAnchorScroll";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { HeaderLogo } from "@/components/layout/HeaderLogo";
import { NavDrawer } from "@/components/layout/NavDrawer";

export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeSection = useActiveSection();
  const { handleAnchorClick } = useAnchorScroll();

  useBodyScrollLock(drawerOpen);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header className="site-header">
        <HeaderLogo onClick={handleAnchorClick} />
        <nav className="site-nav" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={activeSection === link.id ? "is-active" : undefined}
              onClick={handleAnchorClick}
              aria-current={activeSection === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={drawerOpen}
          aria-controls="site-nav-menu"
          aria-label={drawerOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setDrawerOpen((o) => !o)}
        />
      </header>
      {drawerOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Закрыть меню"
          onClick={closeDrawer}
        />
      ) : null}
      <NavDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        activeSection={activeSection}
      />
    </>
  );
}
