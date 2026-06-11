import Camera from './Camera'

function FilmstripCurl() {
  // grayscale filmstrip band, echoing the mockup's curling strip
  return (
    <svg viewBox="0 0 340 220" className="w-72 md:w-96 opacity-80" aria-hidden="true">
      <path
        d="M-20 30 C 80 0, 200 10, 330 60 L 330 150 C 200 100, 80 90, -20 120 Z"
        fill="#b9b4ab"
      />
      <path
        d="M-20 30 C 80 0, 200 10, 330 60 L 330 78 C 200 28, 80 18, -20 48 Z"
        fill="#8f8a81"
      />
      <path
        d="M-20 102 C 80 72, 200 82, 330 132 L 330 150 C 200 100, 80 90, -20 120 Z"
        fill="#8f8a81"
      />
      {[...Array(9)].map((_, i) => (
        <g key={i}>
          <rect x={6 + i * 36} y={30 - i * 1.2} width="12" height="9" rx="2" fill="#f2ede3" transform={`rotate(${6 - i * 1.4} ${12 + i * 36} ${34 - i})`} />
          <rect x={6 + i * 36} y={102 - i * 0.4} width="12" height="9" rx="2" fill="#f2ede3" transform={`rotate(${6 - i * 1.4} ${12 + i * 36} ${106 - i})`} />
        </g>
      ))}
    </svg>
  )
}

function HangingPolaroids() {
  // red frames pinned to a wire, darkroom-style
  return (
    <svg viewBox="0 0 220 150" className="w-44 md:w-56 animate-[sway_5s_ease-in-out_infinite] origin-top" aria-hidden="true">
      <path d="M0 14 Q 110 40 220 6" stroke="#9b0b12" strokeWidth="3" fill="none" />
      <g transform="rotate(-7 60 70)">
        <line x1="60" y1="24" x2="60" y2="44" stroke="#9b0b12" strokeWidth="3" />
        <rect x="28" y="44" width="64" height="56" fill="none" stroke="#9b0b12" strokeWidth="7" />
      </g>
      <g transform="rotate(5 150 80)">
        <line x1="150" y1="28" x2="150" y2="54" stroke="#9b0b12" strokeWidth="3" />
        <rect x="114" y="54" width="72" height="62" fill="none" stroke="#9b0b12" strokeWidth="7" />
      </g>
    </svg>
  )
}

export default function Landing({ onEnter }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 -left-8 md:top-10 md:left-0">
        <FilmstripCurl />
      </div>
      <div className="absolute top-0 right-4 md:right-16">
        <HangingPolaroids />
      </div>

      <h1 className="font-script text-5xl md:text-8xl text-ink mt-20 select-none text-center">
        with love, the booth
      </h1>
      <div className="w-56 border-b-2 border-dashed border-ink/60 mt-2" />

      <div className="flex gap-12 md:gap-24 mt-12 text-[11px] md:text-xs tracking-[0.2em] text-ink/80 uppercase">
        <p className="w-36 text-center leading-5">Strike a pose (or three)</p>
        <p className="w-36 text-center leading-5">Press the button. Make a memory.</p>
      </div>

      <button
        onClick={onEnter}
        className="group mt-14 flex flex-col items-center gap-3 cursor-pointer"
      >
        <Camera className="w-40 transition-transform duration-300 group-hover:scale-105" />
        <span className="bg-crimson text-cream px-6 py-2.5 text-xs tracking-[0.25em] uppercase shadow-[3px_3px_0_#1a1714] transition-all group-hover:shadow-[1px_1px_0_#1a1714] group-hover:translate-x-0.5 group-hover:translate-y-0.5">
          Enter the booth
        </span>
      </button>

      <p className="mt-10 text-[10px] tracking-[0.18em] text-ink/50 uppercase">
        Three shots · one strip · yours to keep
      </p>
    </div>
  )
}
