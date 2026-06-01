import type { CaseId, CasePhotoPack } from "@/types/case";

export const CASE_PHOTOS: Record<CaseId, CasePhotoPack> = {
  seminars4: {
    folder: "seminars-4",
    files: [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "15.webp",
      "16.webp",
    ],
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
