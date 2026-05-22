import type { CaseId } from "@/types/case";
import { CASE_PHOTOS } from "@/data/casePhotos";

const PHOTO_ROOT = "/assets/cases";
const PHOTO_VERSION = "20260521";

export function photoUrl(folder: string, file: string): string {
  const parts = [PHOTO_ROOT, folder, file].filter(Boolean);
  return `${parts.join("/")}?v=${PHOTO_VERSION}`;
}

export function buildGalleryUrls(caseId: CaseId): string[] {
  const pack = CASE_PHOTOS[caseId];
  if (!pack) return [];
  return pack.files.map((f) => photoUrl(pack.folder, f));
}
