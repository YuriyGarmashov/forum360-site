import { Reveal } from "@/components/ui/Reveal";
import { useAnchorScroll } from "@/hooks/useAnchorScroll";

export function HeroSection() {
  const { handleAnchorClick } = useAnchorScroll();

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-bg-fz" aria-hidden="true">
        ФЗ-44
      </div>
      <div className="hero-grid-meta mono" aria-hidden="true">
        <span>DATA_NODE_44.0</span>
        <span>CONNECTED</span>
        <span>RF_SCOPE: FULL</span>
      </div>
      <Reveal className="hero-content">
        <p className="hero-kicker mono">Тендерное сопровождение и реализация</p>
        <h1 className="hero-title" id="hero-title">
          <span className="hero-title-line">Реализуем тендеры</span>
          <span className="hero-title-line">по&nbsp;всей стране</span>
          <span className="hero-title-line">
            в&nbsp;рамках <span className="accent">ФЗ-44</span>
          </span>
        </h1>
        <p className="hero-lead">
          Полный цикл: от&nbsp;подбора тендера до&nbsp;сдачи отчётности
          по&nbsp;контракту.
        </p>
        <div className="hero-spacer hero-spacer--top" aria-hidden="true" />
        <div className="hero-cta">
          <a href="#cases" className="btn btn--primary" onClick={handleAnchorClick}>
            Перейти к кейсам
          </a>
          <a href="#contacts" className="btn btn--outline" onClick={handleAnchorClick}>
            Связаться с нами
          </a>
        </div>
        <div className="hero-spacer hero-spacer--bottom" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
