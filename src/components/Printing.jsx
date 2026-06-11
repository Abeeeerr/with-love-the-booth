import { useEffect, useRef, useState } from 'react'
import { STRIP_WIDTH, STRIP_HEIGHT } from '../lib/strip'
import Camera from './Camera'

const PREVIEW_W = 168
const PREVIEW_H = Math.round((PREVIEW_W / STRIP_WIDTH) * STRIP_HEIGHT)
const PRINT_MS = 3600

export default function Printing({ strip, onRetake, onPack }) {
  const [done, setDone] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setTimeout(() => setDone(true), PRINT_MS + 200)
    return () => clearTimeout(timer.current)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 pb-16 px-4">
      <p className="text-xs tracking-[0.3em] uppercase text-ink/70">
        {done ? 'Fresh off the press' : 'Developing…'}
      </p>

      {/* the camera printing the strip */}
      <div className="relative flex flex-col items-center mt-6">
        <div className={done ? '' : 'animate-[camera-judder_0.35s_linear_infinite]'}>
          <Camera className="w-56 md:w-64" />
        </div>
        {/* print slot */}
        <div className="w-44 h-2.5 bg-ink rounded-full -mt-2 z-10" />

        <div
          className="overflow-hidden"
          style={{ width: PREVIEW_W, height: PREVIEW_H }}
        >
          <img
            src={strip.url}
            alt="Your photo strip"
            width={PREVIEW_W}
            height={PREVIEW_H}
            className="block shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
            style={{ animation: `print-down ${PRINT_MS}ms cubic-bezier(0.3,0,0.4,1) forwards` }}
          />
        </div>
      </div>

      {done && (
        <div className="flex gap-4 mt-8 animate-[rise-in_0.5s_ease-out]">
          <button
            onClick={onRetake}
            className="px-5 py-2.5 text-xs tracking-[0.25em] uppercase border-2 border-ink text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer"
          >
            Retake
          </button>
          <button
            onClick={onPack}
            className="px-5 py-2.5 text-xs tracking-[0.25em] uppercase bg-crimson text-cream shadow-[3px_3px_0_#1a1714] hover:shadow-[1px_1px_0_#1a1714] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            Pack it up
          </button>
        </div>
      )}
    </div>
  )
}
