import { useCallback, useEffect, useRef, useState } from "react";
import { CASE_PHOTOS } from "@/data/casePhotos";
import { buildGalleryUrls } from "@/lib/photoUrl";
import type { CaseId } from "@/types/case";

const preloadCache = new Set<string>();

function preloadImage(url: string) {
  if (!url || preloadCache.has(url)) return;
  preloadCache.add(url);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

export function useCaseGallery(caseId: CaseId | null, title: string) {
  const [urls, setUrls] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState("");
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!caseId) {
      setUrls([]);
      setIndex(0);
      setSrc("");
      setLoading(false);
      return;
    }
    const nextUrls = buildGalleryUrls(caseId);
    setUrls(nextUrls);
    setIndex(0);
    requestIdRef.current += 1;
  }, [caseId]);

  const updateView = useCallback(() => {
    const n = urls.length;
    if (n === 0) {
      setSrc("");
      setLoading(false);
      return;
    }

    const normalized = ((index % n) + n) % n;
    const url = urls[normalized];
    const requestId = ++requestIdRef.current;
    setLoading(true);

    const nextImage = new Image();
    nextImage.decoding = "async";
    nextImage.loading = "eager";
    nextImage.src = url;
    nextImage.onload = () => {
      if (requestId !== requestIdRef.current) return;
      setSrc(url);
      setLoading(false);
    };
    nextImage.onerror = () => {
      if (requestId !== requestIdRef.current) return;
      setSrc("");
      setLoading(false);
    };

    preloadImage(urls[(normalized + 1) % n]);
    preloadImage(urls[(normalized - 1 + n) % n]);
  }, [index, urls]);

  useEffect(() => {
    updateView();
  }, [updateView]);

  const step = useCallback(
    (delta: number) => {
      if (urls.length === 0) return;
      setIndex((i) => i + delta);
    },
    [urls.length],
  );

  const alt =
    urls.length > 0
      ? `${title} — фото ${(((index % urls.length) + urls.length) % urls.length) + 1} из ${urls.length}`
      : "";

  const countLabel =
    urls.length > 0
      ? `${(((index % urls.length) + urls.length) % urls.length) + 1} / ${urls.length}`
      : "";

  return { urls, index, step, loading, src, alt, countLabel };
}

export function warmupCasePhotos(): void {
  (Object.keys(CASE_PHOTOS) as CaseId[]).forEach((caseId) => {
    const urls = buildGalleryUrls(caseId);
    urls.slice(0, 4).forEach(preloadImage);
    if (urls.length > 4) {
      const defer = () => urls.slice(4).forEach(preloadImage);
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(defer, { timeout: 2500 });
      } else {
        setTimeout(defer, 1200);
      }
    }
  });
}
