import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";

type AppLayoutProps = {
  children: ReactNode;
  footer: ReactNode;
  modals: ReactNode;
};

export function AppLayout({ children, footer, modals }: AppLayoutProps) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main className="main" id="main-content">
        {children}
      </main>
      {footer}
      {modals}
    </>
  );
}
