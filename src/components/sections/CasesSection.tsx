import { CasesTable } from "@/components/cases/CasesTable";
import { Reveal } from "@/components/ui/Reveal";
import { useModal } from "@/context/modalContext";

export function CasesSection() {
  const { openProjects } = useModal();

  return (
    <section className="section cases-section" id="cases" aria-labelledby="cases-title">
      <div className="section-head section-head--row">
        <div>
          <span className="section-num mono">03</span>
          <h2 className="section-title" id="cases-title">
            Кейсы и портфолио
          </h2>
        </div>
        <button
          type="button"
          className="cases-all-link cases-all-btn mono"
          id="casesAllBtn"
          onClick={openProjects}
        >
          Все проекты
        </button>
      </div>
      <Reveal>
        <CasesTable variant="featured" />
      </Reveal>
    </section>
  );
}
