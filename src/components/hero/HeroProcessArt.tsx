export function HeroProcessArt() {
  const stroke = "#eaeaea";
  const fill = "rgba(34, 36, 38, 0.58)";
  const strokeSoft = "rgba(234, 234, 234, 0.26)";

  return (
    <svg
      className="hero-process"
      viewBox="0 0 720 560"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="heroCardGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Dot grid */}
      <g fill={stroke} opacity="0.16">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((__, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={560 + col * 14}
              cy={36 + row * 14}
              r="1.5"
            />
          )),
        )}
      </g>

      {/* Decorative circles */}
      <circle cx="520" cy="280" r="120" fill="none" stroke={strokeSoft} strokeWidth="1" />
      <circle cx="180" cy="420" r="80" fill="none" stroke={strokeSoft} strokeWidth="1" opacity="0.6" />

      {/* Connecting lines */}
      <g stroke={stroke} strokeWidth="1" fill="none" opacity="0.2">
        <path d="M248 248 L360 128" />
        <path d="M360 128 L520 196" />
        <path d="M248 248 L520 196" />
        <path d="M248 248 L300 408" />
        <path d="M300 408 L468 360" />
        <path d="M520 196 L468 360" />
        <path d="M468 360 L548 332" />
      </g>

      {/* Documentation */}
      <g className="hero-process__float hero-process__float--1" filter="url(#heroCardGlow)">
        <rect x="368" y="72" width="196" height="108" rx="6" fill={fill} stroke={strokeSoft} strokeWidth="1" />
        <rect x="388" y="92" width="18" height="22" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.85" />
        <line x1="392" y1="98" x2="402" y2="98" stroke={stroke} strokeWidth="1" opacity="0.7" />
        <line x1="392" y1="104" x2="402" y2="104" stroke={stroke} strokeWidth="1" opacity="0.7" />
        <text x="416" y="104" fill={stroke} fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" opacity="0.78">
          ДОКУМЕНТАЦИЯ
        </text>
        <line x1="388" y1="128" x2="544" y2="128" stroke={stroke} strokeWidth="1" opacity="0.2" />
        <line x1="388" y1="140" x2="520" y2="140" stroke={stroke} strokeWidth="1" opacity="0.16" />
        <line x1="388" y1="152" x2="500" y2="152" stroke={stroke} strokeWidth="1" opacity="0.14" />
      </g>

      {/* Tender selection */}
      <g className="hero-process__float hero-process__float--2" filter="url(#heroCardGlow)">
        <rect x="88" y="188" width="248" height="196" rx="6" fill={fill} stroke={strokeSoft} strokeWidth="1" />
        <rect x="108" y="208" width="18" height="18" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.85" />
        <polyline points="112,218 116,222 124,214" fill="none" stroke={stroke} strokeWidth="1.2" />
        <text x="136" y="222" fill={stroke} fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" opacity="0.78">
          ПОДБОР ТЕНДЕРА
        </text>
        <text x="108" y="252" fill={stroke} fontSize="10" opacity="0.82">
          ✓ Анализ закупок
        </text>
        <text x="108" y="272" fill={stroke} fontSize="10" opacity="0.82">
          ✓ Оценка и стратегия
        </text>
        <line x1="108" y1="292" x2="316" y2="292" stroke={stroke} strokeWidth="1" opacity="0.18" />
        <text x="108" y="318" fill={stroke} fontSize="8" fontFamily="var(--font-mono)" opacity="0.55" letterSpacing="0.06em">
          НАЙДЕНО
        </text>
        <text x="108" y="336" fill={stroke} fontSize="16" fontFamily="var(--font-mono)" fontWeight="700">
          128
        </text>
        <text x="196" y="318" fill={stroke} fontSize="8" fontFamily="var(--font-mono)" opacity="0.55" letterSpacing="0.06em">
          ПОДХОДЯЩИХ
        </text>
        <text x="196" y="336" fill={stroke} fontSize="16" fontFamily="var(--font-mono)" fontWeight="700">
          23
        </text>
      </g>

      {/* Support */}
      <g className="hero-process__float hero-process__float--3" filter="url(#heroCardGlow)">
        <rect x="468" y="168" width="212" height="148" rx="6" fill={fill} stroke={strokeSoft} strokeWidth="1" />
        <circle cx="488" cy="198" r="9" fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.85" />
        <line x1="488" y1="194" x2="488" y2="198" stroke={stroke} strokeWidth="1.2" />
        <line x1="488" y1="198" x2="492" y2="201" stroke={stroke} strokeWidth="1.2" />
        <text x="506" y="202" fill={stroke} fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" opacity="0.78">
          СОПРОВОЖДЕНИЕ
        </text>
        <text x="488" y="232" fill={stroke} fontSize="10" opacity="0.82">
          • Подача заявки
        </text>
        <text x="488" y="252" fill={stroke} fontSize="10" opacity="0.82">
          • Подписание контракта
        </text>
        <text x="488" y="272" fill={stroke} fontSize="10" opacity="0.82">
          • Контроль сроков
        </text>
      </g>

      {/* Contract execution */}
      <g className="hero-process__float hero-process__float--4" filter="url(#heroCardGlow)">
        <rect x="168" y="368" width="300" height="132" rx="6" fill={fill} stroke={strokeSoft} strokeWidth="1" />
        <text x="188" y="396" fill={stroke} fontSize="11" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.08em" opacity="0.78">
          ИСПОЛНЕНИЕ КОНТРАКТА
        </text>
        <text x="188" y="420" fill={stroke} fontSize="9" fontFamily="var(--font-mono)" opacity="0.7" letterSpacing="0.04em">
          Поставка
        </text>
        <text x="268" y="420" fill={stroke} fontSize="9" fontFamily="var(--font-mono)" opacity="0.7" letterSpacing="0.04em">
          Отчётность
        </text>
        <text x="360" y="420" fill={stroke} fontSize="9" fontFamily="var(--font-mono)" opacity="0.7" letterSpacing="0.04em">
          Закрытие
        </text>
        <rect x="188" y="432" width="260" height="4" rx="2" fill="rgba(234,234,234,0.12)" />
        <rect x="188" y="432" width="148" height="4" rx="2" fill="rgba(234,234,234,0.45)" />
        <circle cx="336" cy="434" r="5" fill={stroke} opacity="0.9" />
        <rect x="188" y="458" width="88" height="24" rx="3" fill="none" stroke={strokeSoft} strokeWidth="1" />
        <text x="232" y="474" fill={stroke} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="0.1em">
          В РАБОТЕ
        </text>
      </g>

      {/* 44-FZ stamp */}
      <g className="hero-process__float hero-process__float--5">
        <circle cx="548" cy="332" r="34" fill={fill} stroke={strokeSoft} strokeWidth="1" />
        <circle cx="548" cy="332" r="26" fill="none" stroke={stroke} strokeWidth="1" opacity="0.45" />
        <text
          x="548"
          y="337"
          fill={stroke}
          fontSize="11"
          fontFamily="var(--font-mono)"
          fontWeight="600"
          textAnchor="middle"
          letterSpacing="0.04em"
        >
          44-ФЗ
        </text>
      </g>
    </svg>
  );
}
