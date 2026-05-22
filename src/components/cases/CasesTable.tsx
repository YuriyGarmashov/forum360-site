import { CASE_ORDER } from "@/data/cases";
import { CaseRow } from "@/components/cases/CaseRow";
import type { CaseId } from "@/types/case";

type CasesTableProps = {
  variant?: "featured" | "all";
  ids?: CaseId[];
};

export function CasesTable({ variant = "featured", ids }: CasesTableProps) {
  const ordered =
    ids ??
    CASE_ORDER.filter((id) => Boolean(id)).slice(0, variant === "featured" ? 4 : undefined);

  return (
    <div
      className={`cases-table${variant === "all" ? " cases-table--all" : ""}`}
      role="table"
      aria-label={
        variant === "all"
          ? "Все реализованные контракты"
          : "Реализованные контракты"
      }
    >
      <div className="cases-row cases-row--head mono" role="row">
        <span role="columnheader">#</span>
        <span role="columnheader">Проект</span>
        <span role="columnheader">Локация / заказчик</span>
        <span role="columnheader">ЕИС</span>
      </div>
      {ordered.map((id, i) => (
        <CaseRow key={id} caseId={id} index={i} variant={variant} />
      ))}
    </div>
  );
}
