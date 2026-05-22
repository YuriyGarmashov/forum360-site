import { TeamCircle } from "@/components/team/TeamCircle";
import { Reveal } from "@/components/ui/Reveal";

export function TeamSection() {
  return (
    <section className="section team-section" id="team" aria-labelledby="team-title">
      <div className="section-head">
        <span className="section-num mono">02</span>
        <h2 className="section-title" id="team-title">
          Руководящий состав
        </h2>
        <p className="team-tagline">
          Девушки, которые знают толк не только в качественной работе, но и в
          качественном отдыхе
        </p>
      </div>
      <p className="section-sub section-sub--mobile mono">
        Нажмите на сектор круга — карточка закрепится ниже
      </p>
      <Reveal className="team-wrapper">
        <TeamCircle />
      </Reveal>
    </section>
  );
}
