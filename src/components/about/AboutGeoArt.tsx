export function AboutGeoArt() {
  return (
    <svg
      className="about-geo"
      viewBox="0 0 480 480"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="aboutGeoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3f3f3" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter
          id="aboutGeoShadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="14"
            floodColor="#222426"
            floodOpacity="0.1"
          />
        </filter>
      </defs>
      <rect width="480" height="480" fill="url(#aboutGeoBg)" />
      <g className="about-geo__layer about-geo__layer--pillar">
        <rect x="188" y="32" width="104" height="416" fill="#ffffff" opacity="0.42" />
      </g>
      <g className="about-geo__layer about-geo__layer--disc">
        <circle
          cx="240"
          cy="240"
          r="98"
          fill="#ffffff"
          opacity="0.62"
          filter="url(#aboutGeoShadow)"
        />
      </g>
      <g className="about-geo__layer about-geo__layer--ring">
        <circle
          cx="240"
          cy="240"
          r="118"
          fill="none"
          stroke="#222426"
          strokeWidth="1"
          strokeDasharray="2 7"
          opacity="0.14"
        />
      </g>
      <g className="about-geo__layer about-geo__layer--rays" strokeLinecap="round">
        <line x1="240" y1="240" x2="418" y2="62" stroke="#6D0C32" strokeWidth="1.5" opacity="0.55" />
        <line x1="240" y1="240" x2="62" y2="418" stroke="#6D0C32" strokeWidth="1.5" opacity="0.55" />
        <line x1="240" y1="240" x2="62" y2="62" stroke="#222426" strokeWidth="1" opacity="0.2" />
        <line x1="240" y1="240" x2="418" y2="418" stroke="#222426" strokeWidth="1" opacity="0.2" />
        <line x1="240" y1="240" x2="340" y2="108" stroke="#222426" strokeWidth="0.75" opacity="0.14" />
        <line x1="240" y1="240" x2="128" y2="168" stroke="#222426" strokeWidth="0.75" opacity="0.14" />
        <line x1="240" y1="240" x2="352" y2="328" stroke="#222426" strokeWidth="0.75" opacity="0.14" />
        <line x1="240" y1="240" x2="108" y2="312" stroke="#222426" strokeWidth="0.75" opacity="0.14" />
        <line x1="240" y1="240" x2="296" y2="240" stroke="#222426" strokeWidth="0.75" opacity="0.1" />
        <line x1="240" y1="240" x2="240" y2="152" stroke="#222426" strokeWidth="0.75" opacity="0.1" />
      </g>
      <g className="about-geo__layer about-geo__layer--corner about-geo__layer--corner-tr">
        <rect x="348" y="48" width="44" height="44" fill="none" stroke="#6D0C32" strokeWidth="1.25" opacity="0.7" />
        <rect x="362" y="62" width="30" height="30" fill="#ffffff" opacity="0.55" />
      </g>
      <g className="about-geo__layer about-geo__layer--corner about-geo__layer--corner-bl">
        <rect x="88" y="388" width="44" height="44" fill="none" stroke="#6D0C32" strokeWidth="1.25" opacity="0.7" />
        <rect x="102" y="402" width="30" height="30" fill="#ffffff" opacity="0.55" />
      </g>
      <g className="about-geo__layer about-geo__layer--dots about-geo__layer--dots-tr" fill="#222426">
        <circle cx="318" cy="108" r="1.5" />
        <circle cx="330" cy="108" r="1.5" />
        <circle cx="342" cy="108" r="1.5" />
        <circle cx="318" cy="120" r="1.5" />
        <circle cx="330" cy="120" r="1.5" />
        <circle cx="342" cy="120" r="1.5" />
        <circle cx="318" cy="132" r="1.5" />
        <circle cx="330" cy="132" r="1.5" />
        <circle cx="342" cy="132" r="1.5" />
      </g>
      <g className="about-geo__layer about-geo__layer--dots about-geo__layer--dots-bl" fill="#222426">
        <circle cx="118" cy="348" r="1.5" />
        <circle cx="130" cy="348" r="1.5" />
        <circle cx="142" cy="348" r="1.5" />
        <circle cx="118" cy="360" r="1.5" />
        <circle cx="130" cy="360" r="1.5" />
        <circle cx="142" cy="360" r="1.5" />
        <circle cx="118" cy="372" r="1.5" />
        <circle cx="130" cy="372" r="1.5" />
        <circle cx="142" cy="372" r="1.5" />
      </g>
      <g className="about-geo__layer about-geo__layer--core">
        <circle cx="240" cy="240" r="6" fill="#6D0C32" />
      </g>
    </svg>
  );
}
