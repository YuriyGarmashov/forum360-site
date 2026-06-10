import { AboutGeoArt } from "@/components/about/AboutGeoArt";
import { Reveal } from "@/components/ui/Reveal";
import { useAnchorScroll } from "@/hooks/useAnchorScroll";

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
          <div className="about-text">
            <p>
              Наша компания — это молодая, но уже зарекомендовавшая себя команда
              профессионалов с 6-летним стажем в области государственных закупок.
              Мы не просто организовываем мероприятия по техническому заданию —
              мы активно прислушиваемся к пожеланиям заказчика и стремимся сделать
              всё возможное, чтобы он остался полностью удовлетворен результатом.
            </p>
            <p>
              Наша команда знает, как сложны тендеры. Потому что подавая заявки,
              исполнитель не может спросить у заказчика о его видении — приходится
              полагаться только на техническое задание. Тем не менее, мы умеем
              быстро находить решения и действовать оперативно, чтобы добиться
              нужного результата.
            </p>
            <p className="about-list-title">За время нашей работы провели:</p>
            <ul className="about-list">
              <li>
                <strong>Форумы на 1000+ человек</strong> — место, где встречаются
                мысли и идеи.
              </li>
              <li>
                <strong>Круглые столы</strong> — открытые дискуссии, способствующие
                обмену мнениями.
              </li>
              <li>
                <strong>Бизнес-завтраки</strong> — уютные встречи, где завязываются
                деловые связи.
              </li>
              <li>
                <strong>Семинары и вебинары</strong> — образовательные программы
                для госзаказчиков, которые помогают разобраться в сложных вопросах.
              </li>
            </ul>
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
