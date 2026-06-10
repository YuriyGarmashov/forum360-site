import { HeroProcessArt } from "@/components/hero/HeroProcessArt";
import { Reveal } from "@/components/ui/Reveal";
import heroLogoUrl from "../../../assets/hero-logo.svg?url";

export function HeroSection() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <Reveal className="hero__inner">
        <div className="hero__main">
          <div className="hero__brand">
            <img
              src={heroLogoUrl}
              alt=""
              className="hero__logo"
              decoding="async"
              aria-hidden="true"
            />
            <p className="hero__tagline" id="hero-title">
              Организация мероприятий по всей России в рамках 44-ФЗ
            </p>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <HeroProcessArt />
        </div>
      </Reveal>
    </section>
  );
}
