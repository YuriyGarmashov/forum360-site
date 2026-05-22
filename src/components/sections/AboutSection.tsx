import { AboutGeoArt } from "@/components/about/AboutGeoArt";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
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
          <p className="about-meta mono"># MODULE.ABOUT — PUBLIC.PROFILE</p>
          <div className="about-text">
            <p className="about-lead">
              <strong>
                ФОРУМ&nbsp;<span className="accent">360</span>
              </strong>
              &nbsp;—&nbsp;команда специалистов в&nbsp;сфере тендерного
              сопровождения и&nbsp;реализации мероприятий по&nbsp;всей России.
            </p>
            <p>
              Руководители компании&nbsp;—&nbsp;специалисты с&nbsp;многолетним
              опытом работы в&nbsp;государственных и&nbsp;коммерческих
              проектах: от&nbsp;участия в&nbsp;тендерах и&nbsp;подготовки
              документации до&nbsp;полной реализации контрактов&nbsp;и&nbsp;сдачи
              отчётности.
            </p>
            <p>
              Объединив разносторонний практический опыт, мы&nbsp;создали
              ФОРУМ&nbsp;360, чтобы давать Заказчикам максимум в&nbsp;рамках
              исполнения контрактов: внимание к&nbsp;деталям,
              срокам&nbsp;и&nbsp;результату.
            </p>
            <blockquote className="about-quote">
              <p>
                <span className="about-quote__lead">
                  Многие компании говорят о&nbsp;принципах.
                </span>
                <strong className="about-quote__bold">
                  У&nbsp;нас он&nbsp;один&nbsp;— делать свою работу качественно и&nbsp;в&nbsp;срок.
                </strong>
              </p>
            </blockquote>
          </div>
        </div>
        <div className="about-panel__visual" aria-hidden="true">
          <AboutGeoArt />
        </div>
      </Reveal>
    </section>
  );
}
