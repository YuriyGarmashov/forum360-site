import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultContent } from "@/content/defaultContent";
import type { SiteContent } from "@/types/content";

type ContentContextValue = {
  content: SiteContent;
  loading: boolean;
  error: string | null;
};

const ContentContext = createContext<ContentContextValue | null>(null);

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function mergeContent(input: unknown): SiteContent {
  if (!isObject(input)) return defaultContent;
  const next = input as Partial<SiteContent>;
  return {
    ...defaultContent,
    ...next,
    hero: { ...defaultContent.hero, ...next.hero },
    about: { ...defaultContent.about, ...next.about },
    team: {
      ...defaultContent.team,
      ...next.team,
      members: {
        ...defaultContent.team.members,
        ...(next.team?.members ?? {}),
      },
      memberOrder: next.team?.memberOrder ?? defaultContent.team.memberOrder,
    },
    cases: {
      ...defaultContent.cases,
      ...next.cases,
      tableLabels: {
        ...defaultContent.cases.tableLabels,
        ...(next.cases?.tableLabels ?? {}),
      },
      modalLabels: {
        ...defaultContent.cases.modalLabels,
        ...(next.cases?.modalLabels ?? {}),
      },
      items: {
        ...defaultContent.cases.items,
        ...(next.cases?.items ?? {}),
      },
      photos: {
        ...defaultContent.cases.photos,
        ...(next.cases?.photos ?? {}),
      },
      caseOrder: next.cases?.caseOrder ?? defaultContent.cases.caseOrder,
    },
    footer: { ...defaultContent.footer, ...next.footer },
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/content", {
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Content request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setContent(mergeContent(data));
        setError(null);
      })
      .catch((err: unknown) => {
        if ((err as Error).name === "AbortError") return;
        setContent(defaultContent);
        setError(err instanceof Error ? err.message : "Content request failed");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const value = useMemo(
    () => ({ content, loading, error }),
    [content, loading, error],
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useSiteContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within ContentProvider");
  return ctx;
}
