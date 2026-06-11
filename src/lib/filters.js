export const FILTERS = [
  { id: 'none', label: 'PLAIN', css: 'none' },
  { id: 'bw', label: 'B&W', css: 'grayscale(1) contrast(1.12)' },
  { id: 'sepia', label: 'SEPIA', css: 'sepia(0.85) contrast(1.05) brightness(1.02)' },
  {
    id: 'vintage',
    label: 'VINTAGE',
    css: 'sepia(0.42) contrast(0.92) brightness(1.06) saturate(0.78)',
  },
  { id: 'warm', label: 'WARM', css: 'sepia(0.22) saturate(1.32) brightness(1.05)' },
  {
    id: 'cool',
    label: 'COOL',
    css: 'hue-rotate(-12deg) saturate(0.88) brightness(1.04) contrast(1.06)',
  },
  { id: 'drama', label: 'DRAMA', css: 'contrast(1.42) saturate(1.08)' },
]
