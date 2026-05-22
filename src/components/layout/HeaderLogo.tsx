import type { MouseEvent } from "react";
import logoUrl from "../../../assets/logo.svg?url";

type HeaderLogoProps = {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <a
      className="logo-link"
      href="#hero"
      aria-label="На главную"
      onClick={onClick}
    >
      <img
        src={logoUrl}
        alt="ФОРУМ 360"
        className="logo-img"
        decoding="async"
      />
    </a>
  );
}
