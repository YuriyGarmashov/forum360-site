import type { CasePhoto } from "@/types/case";
import type { SiteContent } from "@/types/content";

export type AdminSession = {
  authenticated: boolean;
  username: string | null;
};

async function readJson<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload && typeof payload.message === "string"
        ? payload.message
        : "Запрос не выполнен.";
    throw new Error(message);
  }
  return payload as T;
}

export async function getSession(): Promise<AdminSession> {
  const response = await fetch("/api/admin/session", {
    credentials: "same-origin",
  });
  return readJson<AdminSession>(response);
}

export async function loginAdmin(
  username: string,
  password: string,
): Promise<AdminSession> {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ username, password }),
  });
  return readJson<AdminSession>(response);
}

export async function logoutAdmin(): Promise<void> {
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "same-origin",
  });
}

export async function getAdminContent(): Promise<SiteContent> {
  const response = await fetch("/api/admin/content", {
    credentials: "same-origin",
  });
  return readJson<SiteContent>(response);
}

export async function saveAdminContent(content: SiteContent): Promise<SiteContent> {
  const response = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(content),
  });
  return readJson<SiteContent>(response);
}

export async function uploadMedia(
  caseId: string,
  file: File,
  alt = "",
): Promise<CasePhoto> {
  const formData = new FormData();
  formData.append("caseId", caseId);
  formData.append("alt", alt);
  formData.append("file", file);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    credentials: "same-origin",
    body: formData,
  });
  return readJson<CasePhoto>(response);
}

export async function deleteMedia(src: string): Promise<void> {
  const response = await fetch("/api/admin/media", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ src }),
  });
  await readJson(response);
}
