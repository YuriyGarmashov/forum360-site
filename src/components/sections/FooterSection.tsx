import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function formatMoscowTime(): string {
  const fmt = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "short",
    timeStyle: "medium",
  });
  return `UTC+03:00 — ${fmt.format(new Date())}`;
}

export function FooterSection() {
  const isMobileContact = useMediaQuery("(max-width: 880px)");
  const [time, setTime] = useState(formatMoscowTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatMoscowTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="site-footer" id="contacts">
      <Reveal className="footer-main" as="div">
        <div className="footer-col">
          <h3 className="footer-brand">ФОРУМ 360</h3>
          <p className="footer-desc">
            Тендерное сопровождение и реализация мероприятий для государственных
            заказчиков.
          </p>
          <div className="footer-cta">
            {isMobileContact ? (
              <a
                className="footer-contact footer-contact--link mono"
                href="tel:+79180868600"
              >
                +7 918 086 86 00
              </a>
            ) : (
              <span className="footer-contact mono">+7 918 086 86 00</span>
            )}
            {isMobileContact ? (
              <a
                className="footer-contact footer-contact--link mono"
                href="mailto:forum.360@yandex.ru"
              >
                forum.360@yandex.ru
              </a>
            ) : (
              <span className="footer-contact mono">forum.360@yandex.ru</span>
            )}
          </div>
        </div>
        <div className="footer-col footer-col--mono">
          <h4 className="mono footer-heading">// SYSTEM.INFO</h4>
          <p>ООО «Форум 360»</p>
          <p>ИНН 2310241828</p>
          <p>
            350002, Краснодарский край, г. Краснодар, ул. Северная, д. 490,
            помещ. 12/1
          </p>
          <p>
            <a href="mailto:forum.360@yandex.ru">forum.360@yandex.ru</a>
          </p>
        </div>
        <div className="footer-col footer-deco mono" aria-hidden="true">
          <div className="footer-chart">
            <svg
              viewBox="0 0 120 60"
              preserveAspectRatio="none"
              className="footer-chart-svg"
            >
              <path
                d="M0,45 L20,40 L40,50 L60,25 L80,30 L100,10 L120,15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.5"
              />
            </svg>
            <span className="footer-chart-cap">METRICS / DELIVERY</span>
          </div>
        </div>
      </Reveal>
      <Reveal className="footer-strip" as="div">
        <span className="footer-status">
          <span className="footer-dot" />
          SYSTEM STATUS: ONLINE
        </span>
        <span id="footer-time">{time}</span>
        <span>SECURE CONNECTION</span>
      </Reveal>
    </footer>
  );
}
