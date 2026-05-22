import { useCallback } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

function getHeaderHeight(): number {
  const header = document.querySelector<HTMLElement>(".site-header");
  return header?.getBoundingClientRect().height ?? 0;
}

function scrollSectionHeadIntoView(
  section: HTMLElement | null,
  gap: number,
): void {
  if (!section) return;

  const head =
    section.querySelector<HTMLElement>(".section-head") ?? section;
  const headerHeight = getHeaderHeight();
  const top =
    head.getBoundingClientRect().top + window.scrollY - headerHeight - gap;

  window.scrollTo({
    top: Math.max(0, Math.round(top)),
    behavior: "smooth",
  });
}

function scrollAboutIntoView(gap: number): void {
  scrollSectionHeadIntoView(document.getElementById("about"), gap);
}

function scrollTeamSectionIntoView(gap: number): void {
  const section = document.getElementById("team");
  if (!section) return;

  const anchor =
    section.querySelector<HTMLElement>("#team-title") ??
    section.querySelector<HTMLElement>(".team-wrapper") ??
    section;

  const headerHeight = getHeaderHeight();
  const hideSectionNum =
    anchor.id === "team-title"
      ? (section.querySelector(".section-num")?.getBoundingClientRect().height ??
          0) + 8
      : 0;

  const top =
    anchor.getBoundingClientRect().top +
    window.scrollY -
    headerHeight -
    gap -
    hideSectionNum;

  window.scrollTo({
    top: Math.max(0, Math.round(top)),
    behavior: "smooth",
  });
}

export function useAnchorScroll() {
  const isMobile = useMediaQuery("(max-width: 880px)");
  const isCompactDesktop = useMediaQuery(
    "(min-width: 1000px) and (max-height: 700px)",
  );

  const scrollToTarget = useCallback(
    (target: HTMLElement | null, hash?: string) => {
      if (!target) return;

      if (hash === "#about" || target.id === "about") {
        scrollAboutIntoView(isCompactDesktop ? 8 : 14);
        return;
      }

      if (hash === "#team" || target.id === "team") {
        scrollTeamSectionIntoView(isCompactDesktop ? 8 : 10);
        return;
      }

      const headerHeight = getHeaderHeight();
      const extraGap = isMobile ? 10 : isCompactDesktop ? 8 : 16;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        extraGap;

      window.scrollTo({
        top: Math.max(0, Math.round(top)),
        behavior: "smooth",
      });
    },
    [isMobile, isCompactDesktop],
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const hash = e.currentTarget.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target, hash);
      window.history.pushState(null, "", hash);
    },
    [scrollToTarget],
  );

  return { scrollToTarget, handleAnchorClick };
}
