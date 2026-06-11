let ctx = null

function audio() {
  ctx ??= new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Call from a click handler so the AudioContext is allowed to start.
export function unlock() {
  audio()
}

export function beep() {
  const c = audio()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.value = 880
  gain.gain.setValueAtTime(0.0001, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.22, c.currentTime + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.22)
  osc.connect(gain).connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + 0.24)
}

// Camera shutter: a snappy filtered noise burst plus a low mechanical thunk.
export function shutter() {
  const c = audio()
  const dur = 0.09
  const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
  }
  const noise = c.createBufferSource()
  noise.buffer = buffer
  const band = c.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 2600
  band.Q.value = 0.8
  const noiseGain = c.createGain()
  noiseGain.gain.value = 0.5
  noise.connect(band).connect(noiseGain).connect(c.destination)
  noise.start()

  const thunk = c.createOscillator()
  const thunkGain = c.createGain()
  thunk.type = 'triangle'
  thunk.frequency.setValueAtTime(160, c.currentTime)
  thunk.frequency.exponentialRampToValueAtTime(55, c.currentTime + 0.07)
  thunkGain.gain.setValueAtTime(0.4, c.currentTime)
  thunkGain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.09)
  thunk.connect(thunkGain).connect(c.destination)
  thunk.start()
  thunk.stop(c.currentTime + 0.1)
}
