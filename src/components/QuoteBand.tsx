"use client";

import { useEffect, useState } from "react";

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

/**
 * One quote per 6-hour window, aligned to UTC (00:00, 06:00, 12:00, 18:00) so every visitor sees the
 * same quote at the same time and a reload keeps it.
 */
const ROTATE_MS = 6 * 60 * 60 * 1000;
const windowIndex = (now: number) => Math.floor(now / ROTATE_MS);

const googleFor = (q: Quote) => `https://www.google.com/search?q=${encodeURIComponent(`${q.character} ${q.anime}`)}`;

/**
 * The footer's quote band: shows one of `quotes` per 6-hour window. The band takes its content's
 * height, so a two-line quote simply makes it taller.
 */
export default function QuoteBand({ quotes = DEMO_QUOTES }: { quotes?: Quote[] }) {
  const [index, setIndex] = useState(0);
  const quote = quotes[index % quotes.length];

  useEffect(() => {
    if (quotes.length < 2) return;
    const sync = () => setIndex(windowIndex(Date.now()) % quotes.length);
    // The page is prerendered with quote 0; move to this window's quote on the first frame (not
    // during render, which would mismatch hydration).
    const first = requestAnimationFrame(sync);
    // Re-arm a timeout to each boundary rather than a 6 h interval, so a sleeping laptop or
    // throttled tab still lands on the right window; also resync when the tab comes back.
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        sync();
        schedule();
      }, ROTATE_MS - (Date.now() % ROTATE_MS) + 50);
    };
    schedule();
    const onVisible = () => {
      if (!document.hidden) sync();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelAnimationFrame(first);
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [quotes.length]);

  return (
    <div className="relative -mx-2 border-2 border-lime bg-surface max-lg:mx-0 max-lg:border-x-0">
      <div className="flex flex-col items-end pb-44 pr-60 pt-46 max-lg:px-16 max-lg:py-28">
        <blockquote className="flex flex-col items-end fs-30 leading-[1.25] max-lg:text-[18px]">
          <p className="w-fit max-w-1460 text-right font-zihi">“{quote.text}”</p>
          <footer className="mr-40 mt-30 w-fit font-instrument max-lg:mr-0 max-lg:mt-8">
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
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
