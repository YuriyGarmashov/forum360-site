export type CaseId = "seminars4" | "seminars2" | "tourism" | "molodoy";

export type Case = {
  title: string;
  meta: string;
  body: string;
  eis: string;
};

export type CasePhotoPack = {
  folder: string;
  files: string[];
};
