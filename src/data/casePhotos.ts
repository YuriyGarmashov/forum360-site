import type { CaseId, CasePhotoPack } from "@/types/case";

export const CASE_PHOTOS: Record<CaseId, CasePhotoPack> = {
  seminars4: {
    folder: "seminars-4",
    files: Array.from({ length: 16 }, (_, i) => `${i + 1}.webp`),
  },
  seminars2: {
    folder: "seminars-2",
    files: Array.from({ length: 20 }, (_, i) => `${i + 1}.webp`),
  },
  tourism: {
    folder: "tourism",
    files: Array.from({ length: 30 }, (_, i) => `${i + 1}.webp`),
  },
  molodoy: {
    folder: "molodoy-city",
    files: Array.from({ length: 33 }, (_, i) => `${i + 1}.webp`),
  },
};
