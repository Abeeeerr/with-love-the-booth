// Photo strip composition — a 35mm filmstrip with sprocket holes,
// three square frames, and a footer block, matching the Canva mockup.

const FRAME = 720 // square frame edge, px
const MARGIN = 96 // sprocket column width each side
const GAP = 34 // black bar between frames
const TOP = 48
const FOOTER = 290
const BOTTOM = 44

export const STRIP_WIDTH = FRAME + MARGIN * 2
export const STRIP_HEIGHT = TOP + FRAME * 3 + GAP * 2 + FOOTER + BOTTOM

// Grab a mirrored, center-cropped square frame from the live video.
export function grabSquare(video) {
  const side = Math.min(video.videoWidth, video.videoHeight)
  const c = document.createElement('canvas')
  c.width = c.height = FRAME
  const ctx = c.getContext('2d')
  ctx.translate(FRAME, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(
    video,
    (video.videoWidth - side) / 2,
    (video.videoHeight - side) / 2,
    side,
    side,
    0,
    0,
    FRAME,
    FRAME,
  )
  return c
}

export async function composeStrip(shots, filterCss, caption) {
  await document.fonts.ready

  const c = document.createElement('canvas')
  c.width = STRIP_WIDTH
  c.height = STRIP_HEIGHT
  const ctx = c.getContext('2d')

  ctx.fillStyle = '#100e0c'
  ctx.fillRect(0, 0, STRIP_WIDTH, STRIP_HEIGHT)

  // sprocket holes down both margins
  const holeW = 30
  const holeH = 24
  const holeStep = 62
  ctx.fillStyle = '#f2ede3'
  for (let y = TOP / 2; y < STRIP_HEIGHT - 18; y += holeStep) {
    for (const cx of [MARGIN / 2, STRIP_WIDTH - MARGIN / 2]) {
      ctx.beginPath()
      ctx.roundRect(cx - holeW / 2, y - holeH / 2, holeW, holeH, 5)
      ctx.fill()
    }
  }

  // the three photos
  shots.forEach((shot, i) => {
    const y = TOP + i * (FRAME + GAP)
    ctx.save()
    ctx.filter = filterCss === 'none' ? 'none' : filterCss
    ctx.drawImage(shot, MARGIN, y, FRAME, FRAME)
    ctx.restore()
  })

  // footer block: script wordmark + date stamp
  const footerTop = TOP + FRAME * 3 + GAP * 2
  ctx.fillStyle = '#f2ede3'
  ctx.textAlign = 'center'
  ctx.font = '110px "Mrs Saint Delafield", cursive'
  ctx.fillText(caption || 'Photobooth', STRIP_WIDTH / 2, footerTop + 150)
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  ctx.font = '34px "Courier Prime", monospace'
  ctx.fillText(date, STRIP_WIDTH / 2, footerTop + 222)

  return c
}
