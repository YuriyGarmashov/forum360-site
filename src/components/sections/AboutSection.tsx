import { AboutGeoArt } from "@/components/about/AboutGeoArt";
import { Reveal } from "@/components/ui/Reveal";
import { useAnchorScroll } from "@/hooks/useAnchorScroll";

const ABOUT_COPY = [
  "Форум 360 — это молодая, но уже зарекомендовавшая себя команда профессионалов с\u00a06-летним стажем в\u00a0области государственных закупок. Мы не просто организовываем мероприятия по\u00a0техническому заданию — мы активно прислушиваемся к\u00a0пожеланиям заказчика и\u00a0стремимся сделать всё возможное, чтобы заказчик остался полностью удовлетворён результатом.",
  "Кураторы проектов имеют опыт работы в\u00a0организации форумов на\u00a0800+ человек с\u00a0топовыми спикерами: Радиславом\u00a0Гандапасом, Алексеем\u00a0Ситниковым, Владимиром\u00a0Якубой, Игорем\u00a0Рызовым. Мы выигрываем тендеры по\u00a0всей России. В\u00a0каждом городе у\u00a0нас есть свои представители, и\u00a0мы лично приезжаем на\u00a0мероприятие.",
];

export function AboutSection() {
  const { handleAnchorClick } = useAnchorScroll();

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="section-head">
        <span className="section-num mono">01</span>
        <h2 className="section-title" id="about-title">
          О компании
        </h2>
      </div>
      <Reveal className="about-panel">
        <div className="about-panel__content">
          <div className="about-text" lang="ru">
            {ABOUT_COPY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href="#cases"
            className="btn btn--ghost about-cta"
            onClick={handleAnchorClick}
          >
            Перейти к нашим проектам
            <span className="about-cta__icon" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
        <div className="about-panel__visual" aria-hidden="true">
          <AboutGeoArt />
        </div>
      </Reveal>
    </section>
  );
}
