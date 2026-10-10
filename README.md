# Kuro UI — Figma replica (showcase)

Static, UI-only replica of the **Kuro – V2** home page from Figma
(`TX5539PDoA47LVq5qS8S04`, frame `90:30` — the right-hand frame, synced 2026-10-10).
Design spec and raw exports live in `../project-y/design/figma-kuro-v2/`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)

Import the folder as a new Vercel project (framework: Next.js, no env vars), or:

```bash
npx vercel        # preview
npx vercel --prod
```

## How it's built

- **Next.js 16 + Tailwind v4 + Lenis** (`src/components/SmoothScroll.tsx`, root mode, `autoRaf`).
- **Design units:** on ≥1024px one Tailwind spacing unit = one Figma px scaled to the viewport
  (`--spacing: min(100cqw, 1920px) / 1920`), so `w-871` is exactly 871px at 1920 and proportional
  below. `fs-*` / `r-*` utilities do the same for font size and radius. Under 1024px a unit is 1px
  and sections use `max-lg:` stacked layouts.
- **Images:** every raster is a static import through `next/image` → AVIF/WebP, intrinsic size
  (no CLS), automatic blur placeholder, accurate `sizes` (`src/lib/sizes.ts`). Hero is the only
  `preload` / `fetchPriority="high"` image; everything else lazy-loads. Qualities allowlisted to 75/90.
- **Fonts:** Sora, Manrope, Inter, Sedgwick Ave via `next/font` (self-hosted, no layout shift).

## Deviations from Figma

- Grey placeholder tiles in the second Top Airing panel are filled with existing artwork.
- The Recommends prev/next arrows cycle the centre card through three picks (Figma state first).
- Coverflow side cards are the pre-skewed PNGs from Figma, so they stay put; only the centre changes.
- "Continue Watching", runtime chips and the Recommends Play/Details buttons use Figma's outlined
  SVGs (with accessible labels) for pixel fidelity.
