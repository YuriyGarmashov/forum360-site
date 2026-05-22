import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/navigation";

export function useActiveSection(): string {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    if (nodes.length === 0) return;

    if (!("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size === 0) return;
        let bestId = "hero";
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        setActive(bestId);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.6],
      },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return active;
}
