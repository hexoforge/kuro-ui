"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Quote = {
  text: string;
  /** Who said it — linked to a Google search for the character. */
  character: string;
  /** The anime, added to the search so a common name finds the right character. */
  anime: string;
};

/* Placeholder rotation until the project-y backend supplies quotes via the `quotes` prop. */
export const DEMO_QUOTES: Quote[] = [
  {
    text: "Self-sacrifice... A nameless shinobi who protects peace within its shadow. That is a true shinobi.",
    character: "Itachi Uchiha",
    anime: "Naruto",
  },
  {
    text: "Being weak is nothing to be ashamed of... Staying weak is!",
    character: "Fuegoleon Vermillion",
    anime: "Black Clover",
  },
  {
    text: "The world isn't perfect. But it's there for us, doing the best it can... that's what makes it so damn beautiful.",
    character: "Roy Mustang",
    anime: "Fullmetal Alchemist: Brotherhood",
  },
  {
    text: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
    character: "Kenshin Himura",
    anime: "Rurouni Kenshin",
  },
];

const ROTATE_MS = 9000;
const QUOTE_MS = 700;
const AUTHOR_MS = 520;
const AUTHOR_LAG_MS = 140;
const LIME = "#c9ff04";
const BAND_BG = "#121212";

type Mode = "out" | "in";

/**
 * Pixel dissolve on a canvas laid over a line of text.
 *
 * The box is cut into square cells; each cell gets a start time biased left→right (65% sweep,
 * 35% noise). When its time comes it flashes lime (a few flash white) for a short beat, then
 * settles: on "out" it settles to the band's background colour — hiding the text under it — and on
 * "in" it clears, revealing the new text. The first frame is drawn synchronously so an "in" pass
 * started from a layout effect covers the new text before the browser ever paints it.
 */
function pixelPass(canvas: HTMLCanvasElement, mode: Mode, duration: number, onDone?: () => void) {
  const box = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(box.width * dpr));
  canvas.height = Math.max(1, Math.round(box.height * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const fontPx = parseFloat(getComputedStyle(canvas.parentElement ?? canvas).fontSize) || 30;
  const cell = Math.max(4, Math.round(fontPx / 6));
  const cols = Math.ceil(box.width / cell);
  const rows = Math.ceil(box.height / cell);
  const flash = 0.2;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const c = i % cols;
    return {
      x: c * cell,
      y: Math.floor(i / cols) * cell,
      t: (0.65 * c) / Math.max(1, cols - 1) + 0.35 * Math.random(),
      white: Math.random() < 0.12,
    };
  });

  let raf = 0;
  let start = 0;
  // Clear in device pixels: a fractional CSS box would otherwise leave its last pixel row behind.
  const wipe = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (p: number) => {
    wipe();
    // Last frame: settle every cell, including any whose flash would still be mid-way.
    if (p >= 1) {
      if (mode === "out") {
        ctx.fillStyle = BAND_BG;
        ctx.fillRect(0, 0, box.width, box.height);
      }
      return;
    }
    for (const k of cells) {
      const local = (p - k.t * (1 - flash)) / flash;
      if (local < 0) {
        if (mode === "in") {
          ctx.fillStyle = BAND_BG;
          ctx.fillRect(k.x, k.y, cell, cell);
        }
      } else if (local <= 1) {
        ctx.globalAlpha = 1 - local * 0.45;
        ctx.fillStyle = k.white ? "#ffffff" : LIME;
        ctx.fillRect(k.x, k.y, cell - 1, cell - 1);
        ctx.globalAlpha = 1;
      } else if (mode === "out") {
        ctx.fillStyle = BAND_BG;
        ctx.fillRect(k.x, k.y, cell, cell);
      }
    }
  };
  const tick = (now: number) => {
    if (!start) start = now;
    const p = Math.min(1, (now - start) / duration);
    draw(p);
    if (p < 1) raf = requestAnimationFrame(tick);
    else onDone?.();
  };

  draw(0);
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

const googleFor = (q: Quote) => `https://www.google.com/search?q=${encodeURIComponent(`${q.character} ${q.anime}`)}`;

/**
 * The footer's quote band. Rotates `quotes` with a lime pixel dissolve (quote first, quoter a beat
 * later). The band grows to two lines when a quote needs it, animating its height so the footer
 * below slides rather than jumps.
 */
export default function QuoteBand({ quotes = DEMO_QUOTES }: { quotes?: Quote[] }) {
  const [index, setIndex] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [height, setHeight] = useState<number | null>(null);
  const quoteCanvas = useRef<HTMLCanvasElement>(null);
  const authorCanvas = useRef<HTMLCanvasElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const cancels = useRef<(() => void)[]>([]);
  const quote = quotes[index % quotes.length];

  // Track the content height so the band can animate between one and two lines.
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dissolve out, swap, and let the layout effect below dissolve the new text in.
  useEffect(() => {
    if (quotes.length < 2) return;
    const pending = cancels.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      if (document.hidden || busy.current) return;
      if (reduced || !quoteCanvas.current || !authorCanvas.current) {
        setIndex((i) => (i + 1) % quotes.length);
        return;
      }
      busy.current = true;
      let done = 0;
      const finish = () => {
        if (++done < 2) return;
        setIndex((i) => (i + 1) % quotes.length);
        setSwaps((n) => n + 1);
      };
      cancels.current.push(pixelPass(quoteCanvas.current, "out", QUOTE_MS, finish));
      window.setTimeout(() => {
        if (authorCanvas.current) cancels.current.push(pixelPass(authorCanvas.current, "out", AUTHOR_MS, finish));
      }, AUTHOR_LAG_MS);
    }, ROTATE_MS);
    return () => {
      window.clearInterval(id);
      pending.forEach((c) => c());
    };
  }, [quotes.length]);

  // Runs before paint after each swap: the "in" pass covers the new text on its first frame.
  useLayoutEffect(() => {
    if (!swaps || !quoteCanvas.current || !authorCanvas.current) return;
    const a = authorCanvas.current;
    let done = 0;
    const finish = () => {
      if (++done === 2) busy.current = false;
    };
    // Cover the quoter immediately too, then start its pass a beat later.
    const coverAuthor = pixelPass(a, "in", AUTHOR_MS * 100);
    coverAuthor();
    cancels.current.push(pixelPass(quoteCanvas.current, "in", QUOTE_MS, finish));
    const t = window.setTimeout(() => cancels.current.push(pixelPass(a, "in", AUTHOR_MS, finish)), AUTHOR_LAG_MS);
    return () => window.clearTimeout(t);
  }, [swaps]);

  return (
    <div
      className="relative -mx-2 overflow-hidden border-2 border-lime bg-surface transition-[height] duration-500 ease-[cubic-bezier(0.22,0.8,0.2,1)] max-lg:mx-0 max-lg:border-x-0"
      style={height === null ? undefined : { height: height + 4 /* borders */ }}
    >
      <div ref={inner} className="flex flex-col items-end pb-44 pr-60 pt-46 max-lg:px-16 max-lg:py-28">
        <blockquote className="flex flex-col items-end fs-30 leading-[1.25] max-lg:text-[18px]">
          <p className="relative w-fit max-w-1460 text-right font-zihi">
            “{quote.text}”
            <canvas ref={quoteCanvas} aria-hidden className="pointer-events-none absolute -inset-[3px] size-[calc(100%+6px)]" />
          </p>
          <footer className="relative mr-40 mt-30 w-fit font-instrument max-lg:mr-0 max-lg:mt-8">
            <a
              href={googleFor(quote)}
              target="_blank"
              rel="noopener noreferrer"
              title={`Search Google for ${quote.character}`}
              className="underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors hover:text-lime hover:decoration-lime"
            >
              - {quote.character}
              <span className="sr-only"> (opens a Google search in a new tab)</span>
            </a>
            <canvas ref={authorCanvas} aria-hidden className="pointer-events-none absolute -inset-[3px] size-[calc(100%+6px)]" />
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
