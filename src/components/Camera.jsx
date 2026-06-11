// Retro camera illustration from the mockup. `flashing` lights up the bulb
// and throws light beams; scales with its container via viewBox.
export default function Camera({ flashing = false, className = '' }) {
  return (
    <svg viewBox="0 0 300 210" className={className} aria-hidden="true">
      {flashing && (
        <g>
          <circle cx="222" cy="68" r="46" fill="#fffbe8" opacity="0.9" />
          {[...Array(8)].map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <line
                key={i}
                x1={222 + Math.cos(a) * 30}
                y1={68 + Math.sin(a) * 30}
                x2={222 + Math.cos(a) * 95}
                y2={68 + Math.sin(a) * 95}
                stroke="#fff6d8"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.85"
              />
            )
          })}
        </g>
      )}
      {/* body */}
      <rect x="38" y="62" width="224" height="118" rx="14" fill="#f4f0e8" stroke="#2a2622" strokeWidth="3" />
      {/* viewfinder hump */}
      <path d="M118 62 L132 38 H172 L186 62 Z" fill="#f4f0e8" stroke="#2a2622" strokeWidth="3" />
      {/* shutter button */}
      <rect x="58" y="44" width="34" height="20" rx="4" fill="#f4f0e8" stroke="#2a2622" strokeWidth="3" />
      {/* flash unit */}
      <rect x="206" y="44" width="34" height="20" rx="4" fill={flashing ? '#fff3c4' : '#f4f0e8'} stroke="#2a2622" strokeWidth="3" />
      {/* black leatherette band */}
      <rect x="40" y="92" width="220" height="58" fill="#1c1916" />
      {/* small detail light */}
      <rect x="224" y="100" width="22" height="10" rx="2" fill={flashing ? '#fffbe8' : '#8c8478'} />
      {/* lens */}
      <circle cx="150" cy="120" r="50" fill="#e9e4da" stroke="#2a2622" strokeWidth="3" />
      <circle cx="150" cy="120" r="38" fill="#b9b2a6" />
      <circle cx="150" cy="120" r="28" fill="#55504a" />
      <circle cx="150" cy="120" r="18" fill="#211e1b" />
      <ellipse cx="142" cy="112" rx="7" ry="9" fill="#f7f3ea" transform="rotate(-20 142 112)" />
    </svg>
  )
}
