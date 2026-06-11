import { useState } from 'react'
import Landing from './components/Landing'
import Booth from './components/Booth'
import Printing from './components/Printing'
import Envelope from './components/Envelope'
import { composeStrip } from './lib/strip'

export default function App() {
  const [phase, setPhase] = useState('landing') // landing | booth | printing | envelope
  const [strip, setStrip] = useState(null)

  const handleShots = async (shots, filter) => {
    const canvas = await composeStrip(shots, filter.css)
    setStrip({ canvas, url: canvas.toDataURL('image/png') })
    setPhase('printing')
  }

  return (
    <main className="min-h-screen bg-cream paper-texture font-mono text-ink overflow-hidden">
      {phase === 'landing' && <Landing onEnter={() => setPhase('booth')} />}
      {phase === 'booth' && <Booth onDone={handleShots} />}
      {phase === 'printing' && (
        <Printing
          strip={strip}
          onRetake={() => setPhase('booth')}
          onPack={() => setPhase('envelope')}
        />
      )}
      {phase === 'envelope' && (
        <Envelope strip={strip} onRestart={() => setPhase('booth')} />
      )}
    </main>
  )
}
