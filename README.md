# Photobooth

A cozy, vintage-darkroom photobooth that runs entirely in the browser. Strike a pose (or three), watch the strip print, and take your memories home in a ribbon-tied envelope.

## How it works

1. **Enter the booth** — your webcam feed appears behind the curtains, mirrored like a real booth.
2. **Pick a filter** — plain, B&W, sepia, vintage, warm, cool, or drama, applied live.
3. **Press the button** — a 1, 2, 3 countdown (with beeps) runs before each of three shots, complete with flash and shutter click.
4. **Watch it print** — your three shots compose into a classic 35mm filmstrip with a date stamp, printed fresh from the camera.
5. **Pack it up** — the strip is sealed in an envelope tied with a red ribbon, then downloaded as PNG or PDF.

## Running locally

```bash
npm install
npm run dev
```

The booth needs camera permission, and `getUserMedia` requires HTTPS or localhost.

## Stack

- React + Vite
- Tailwind CSS
- Canvas API for compositing the strip
- Web Audio API for the beeps and shutter click
- jsPDF for PDF export

No backend — everything stays on your device.
