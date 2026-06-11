import { useEffect, useRef, useState } from 'react'
import { FILTERS } from '../lib/filters'
import { beep, shutter, unlock } from '../lib/sounds'
import { grabSquare } from '../lib/strip'
import Camera from './Camera'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

function Curtain({ side }) {
  return (
    <div
      className={`absolute top-0 bottom-0 w-16 md:w-28 ${side === 'left' ? 'left-0 rounded-r-3xl' : 'right-0 rounded-l-3xl'}`}
      style={{
        background:
          'repeating-linear-gradient(90deg, #3a5c49 0 14px, #4f7a63 14px 30px, #46705a 30px 44px)',
        boxShadow: 'inset 0 -40px 60px rgba(0,0,0,0.35)',
      }}
    />
  )
}

export default function Booth({ onDone }) {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(FILTERS[0])
  const [count, setCount] = useState(null)
  const [flash, setFlash] = useState(false)
  const [shots, setShots] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let stream
    let cancelled = false
    navigator.mediaDevices
      .getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false })
      .then(
        (s) => {
          if (cancelled || !videoRef.current) {
            s.getTracks().forEach((t) => t.stop())
            return
          }
          stream = s
          videoRef.current.srcObject = s
          videoRef.current.onloadedmetadata = () => setReady(true)
        },
        () => setError('Camera access is needed for the booth — allow it and reload.'),
      )
    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  async function startSession() {
    if (busy || !ready) return
    unlock()
    setBusy(true)
    setShots([])
    const taken = []
    for (let i = 0; i < 3; i++) {
      for (const n of [1, 2, 3]) {
        setCount(n)
        beep()
        await wait(750)
      }
      setCount(null)
      setFlash(true)
      shutter()
      taken.push(grabSquare(videoRef.current))
      setShots([...taken])
      await wait(380)
      setFlash(false)
      if (i < 2) await wait(550)
    }
    await wait(650)
    onDone(taken, filter)
  }

  return (
    <div className="relative min-h-screen bg-crimson flex flex-col items-center justify-center py-10 px-4 overflow-hidden">
      <Curtain side="left" />
      <Curtain side="right" />

      <p className="text-cream text-xs tracking-[0.3em] uppercase mb-6">
        {busy ? 'Hold that pose…' : 'Get ready'}
      </p>

      {/* booth window */}
      <div className="relative bg-booth p-3 md:p-4 rounded-xl shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
        <div className="relative w-[78vw] max-w-130 aspect-square overflow-hidden rounded-lg bg-ink">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover -scale-x-100"
            style={{ filter: filter.css }}
          />
          {!ready && !error && (
            <p className="absolute inset-0 grid place-items-center text-cream/70 text-xs tracking-[0.25em] uppercase">
              warming up the booth…
            </p>
          )}
          {error && (
            <p className="absolute inset-0 grid place-items-center text-cream/80 text-xs tracking-wide text-center px-8 leading-5">
              {error}
            </p>
          )}

          {/* countdown popup */}
          {count !== null && (
            <span
              key={count}
              className="absolute inset-0 grid place-items-center text-cream font-bold text-[9rem] md:text-[11rem] animate-[pop-number_0.45s_ease-out] drop-shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
            >
              {count}
            </span>
          )}

          {/* camera flash */}
          {flash && (
            <div className="absolute inset-0 bg-white animate-[flash-fade_0.38s_ease-out_forwards]" />
          )}
        </div>

        {/* shot counter dots */}
        <div className="flex justify-center gap-3 mt-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full border-2 border-ink transition-colors ${shots.length > i ? 'bg-crimson' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>

      {/* filter rail */}
      <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-xl z-10">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => !busy && setFilter(f)}
            className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border-2 transition-colors cursor-pointer ${
              filter.id === f.id
                ? 'bg-cream text-crimson border-cream'
                : 'bg-transparent text-cream border-cream/50 hover:border-cream'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* the big button */}
      <button
        onClick={startSession}
        disabled={busy || !ready}
        className="group mt-7 flex flex-col items-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-default z-10"
      >
        <span className="relative grid place-items-center">
          <span className="w-20 h-20 rounded-full bg-cream border-4 border-ink shadow-[0_6px_0_#1a1714] group-active:translate-y-1 group-active:shadow-[0_2px_0_#1a1714] transition-all grid place-items-center">
            <Camera flashing={flash} className="w-12" />
          </span>
        </span>
        <span className="text-cream text-[10px] tracking-[0.3em] uppercase">
          {busy ? 'snapping…' : 'press the button'}
        </span>
      </button>
    </div>
  )
}
