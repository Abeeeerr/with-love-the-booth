import { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'

function Bow() {
  return (
    <svg viewBox="0 0 120 70" className="w-24" aria-hidden="true">
      <path d="M60 35 C 40 8, 14 10, 12 26 C 10 42, 38 44, 60 35 Z" fill="#9b0b12" stroke="#7c080e" strokeWidth="2" />
      <path d="M60 35 C 80 8, 106 10, 108 26 C 110 42, 82 44, 60 35 Z" fill="#9b0b12" stroke="#7c080e" strokeWidth="2" />
      <path d="M52 38 L 40 64 L 52 60 Z" fill="#9b0b12" stroke="#7c080e" strokeWidth="2" />
      <path d="M68 38 L 80 64 L 68 60 Z" fill="#9b0b12" stroke="#7c080e" strokeWidth="2" />
      <circle cx="60" cy="35" r="9" fill="#7c080e" />
    </svg>
  )
}

export default function Envelope({ strip, onRestart }) {
  // stages: 0 strip slides in → 1 flap closes → 2 ribbon ties → 3 download popup
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2000),
      setTimeout(() => setStage(2), 2900),
      setTimeout(() => setStage(3), 3800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const stamp = new Date().toISOString().slice(0, 10)

  function downloadPng() {
    const a = document.createElement('a')
    a.href = strip.url
    a.download = `photobooth-${stamp}.png`
    a.click()
  }

  function downloadPdf() {
    const { canvas } = strip
    const w = canvas.width / 4
    const h = canvas.height / 4
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [w + 48, h + 48],
    })
    pdf.addImage(strip.url, 'PNG', 24, 24, w, h)
    pdf.save(`photobooth-${stamp}.pdf`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <p className="text-xs tracking-[0.3em] uppercase text-ink/70 mb-10">
        {stage < 3 ? 'Packing your memories…' : 'For you'}
      </p>

      <div className="relative w-[320px] h-[470px]">
        {/* the strip, sliding down into the envelope */}
        <img
          src={strip.url}
          alt="Photo strip going into the envelope"
          className="absolute left-1/2 -ml-[52px] top-0 w-[104px] shadow-lg"
          style={{
            animation: 'strip-into-envelope 1.9s cubic-bezier(0.45,0,0.3,1) forwards',
            clipPath: stage >= 1 ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
            transition: 'clip-path 0.01s 0s',
          }}
        />

        {/* envelope */}
        <div className="absolute bottom-0 left-0 right-0 h-[225px]">
          {/* back */}
          <div className="absolute inset-0 bg-[#e8e0cf] rounded-md shadow-[0_16px_40px_rgba(0,0,0,0.25)]" />
          {/* open flap (peeks above the envelope until it closes) */}
          {stage < 1 && (
            <div
              className="absolute -top-[88px] left-0 right-0 h-[90px] bg-[#ded5c1]"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          )}
          {/* front pocket */}
          <div
            className="absolute inset-0 bg-paper rounded-md"
            style={{
              clipPath: 'polygon(0 0, 50% 42%, 100% 0, 100% 100%, 0 100%)',
              boxShadow: 'inset 0 -6px 18px rgba(26,23,20,0.08)',
            }}
          />
          {/* closed flap */}
          {stage >= 1 && (
            <div
              className="absolute top-0 left-0 right-0 h-[96px] bg-[#ece3d0] animate-[rise-in_0.4s_ease-out]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                filter: 'drop-shadow(0 3px 4px rgba(26,23,20,0.18))',
              }}
            />
          )}
          {/* address line flavor */}
          <p className="absolute bottom-7 w-full text-center font-script text-3xl text-ink/70 select-none">
            with love, the booth
          </p>

          {/* ribbon */}
          {stage >= 2 && (
            <>
              <div className="absolute top-0 bottom-0 left-1/2 -ml-[11px] w-[22px] bg-crimson animate-[rise-in_0.3s_ease-out]" />
              <div className="absolute top-1/2 -mt-[11px] left-0 right-0 h-[22px] bg-crimson animate-[rise-in_0.3s_ease-out]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] animate-[scale-in_0.45s_ease-out]">
                <Bow />
              </div>
            </>
          )}
        </div>
      </div>

      {/* download popup */}
      {stage >= 3 && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-ink/40 p-4">
          <div className="bg-paper paper-texture border-2 border-ink px-8 py-8 md:px-12 shadow-[6px_6px_0_#1a1714] text-center animate-[scale-in_0.35s_ease-out] max-w-sm w-full">
            <p className="font-script text-4xl text-crimson">all packed!</p>
            <p className="mt-4 text-xs tracking-[0.25em] uppercase text-ink">
              Download memories as:
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={downloadPng}
                className="px-7 py-2.5 text-xs tracking-[0.25em] uppercase bg-crimson text-cream shadow-[3px_3px_0_#1a1714] hover:shadow-[1px_1px_0_#1a1714] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                PNG
              </button>
              <button
                onClick={downloadPdf}
                className="px-7 py-2.5 text-xs tracking-[0.25em] uppercase bg-ink text-cream shadow-[3px_3px_0_#9b0b12] hover:shadow-[1px_1px_0_#9b0b12] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                PDF
              </button>
            </div>
            <button
              onClick={onRestart}
              className="mt-7 text-[10px] tracking-[0.2em] uppercase text-ink/60 underline underline-offset-4 hover:text-crimson cursor-pointer"
            >
              or take another strip →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
