"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { designSizes } from "@/lib/sizes";
import { LANDING_PICKS, type Pick } from "@/lib/picks";
import crown from "@/assets/icons/icon-recommends.svg";
import pickIcon from "@/assets/icons/icon-editors-pick.svg";
import cc from "@/assets/icons/icon-cc.svg";
import star from "@/assets/icons/icon-star.svg";
import playNow from "@/assets/icons/reco-play-now.svg";
import detailsLabel from "@/assets/icons/reco-details-label.svg";
import plus from "@/assets/icons/reco-plus.svg";

/*
 * Slot geometry, tuned against the Figma composition (group 1799×448, centre card 799×448 at x500;
 * near cards ~521×414 at x133 / x1145, far cards ~521×386 at x0 / x1278). Each card is the centre
 * box moved with transforms only, so the slide stays on the compositor. Values were fitted so the
 * projected boxes land within a few px of the Figma side cards at perspective 2000.
 */
const SLOTS: Record<number, { x: number; scale: number; rotate: number; z: number; dim: number }> = {
  [-2]: { x: -74, scale: 0.72, rotate: 56, z: 10, dim: 0.3 },
  [-1]: { x: -57, scale: 0.78, rotate: 52, z: 20, dim: 0.12 },
  [0]: { x: 0, scale: 1, rotate: 0, z: 30, dim: 0 },
  [1]: { x: 57, scale: 0.78, rotate: -52, z: 20, dim: 0.12 },
  [2]: { x: 74, scale: 0.72, rotate: -56, z: 10, dim: 0.3 },
};

/** Position of card `i` relative to the centred card, in −2…2 (the track holds five cards). */
const slotOf = (i: number, center: number, n: number) => ((i - center + n + 2) % n) - 2;

const EASE = "cubic-bezier(0.22, 0.8, 0.2, 1)";

const glass = "flex h-30 items-center rounded-full bg-[rgba(44,44,44,0.52)] font-inter fs-13 font-bold backdrop-blur-[5px]";

type Props = {
  /** Exactly five picks — one per slot. */
  picks?: Pick[];
  /** Index of the card that starts in the centre (Wotakoi on the landing page, as in Figma). */
  start?: number;
  /** Spacing between the heading and the track (the Details frame uses a wider gap). */
  trackClassName?: string;
  className?: string;
};

export default function Coverflow({ picks = LANDING_PICKS, start = 2, trackClassName = "mt-30", className = "mt-50" }: Props) {
  const n = picks.length;
  // `prev` lets the card that wraps from one end to the other jump instead of sweeping across.
  const [{ index, prev }, setState] = useState({ index: start, prev: start });
  const go = (to: number) => setState((s) => ({ index: (to + n) % n, prev: s.index }));
  const step = (d: number) => go(index + d);
  const pick = picks[index];

  return (
    <section aria-labelledby="reco-heading" aria-roledescription="carousel" className={`${className} max-lg:mt-56`}>
      <h2 id="reco-heading" className="flex items-center justify-center gap-10 fs-20 font-bold max-lg:text-[18px]">
        <Image src={crown} alt="" className="size-20" />
        Kuro Recommends
      </h2>

      <div
        className={`${trackClassName} overflow-hidden max-lg:-mx-16 max-lg:mt-24`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
      >
        <div
          className="relative mx-auto aspect-[1799/448] w-1799 max-lg:left-1/2 max-lg:w-[220%] max-lg:-translate-x-1/2"
          style={{ perspective: "calc(2000 * var(--spacing))" }}
        >
          {picks.map((p, i) => {
            const slot = slotOf(i, index, n);
            const s = SLOTS[slot];
            const wrapped = Math.abs(slot - slotOf(i, prev, n)) > 1;
            const active = slot === 0;
            const motion = wrapped ? "none" : `transform 800ms ${EASE}, opacity 800ms ${EASE}`;
            const style: CSSProperties = {
              left: `${(500 / 1799) * 100}%`,
              width: `${(799 / 1799) * 100}%`,
              transform: `translateX(${s.x}%) scale(${s.scale}) rotateY(${s.rotate}deg)`,
              zIndex: s.z,
              transition: motion,
            };

            return (
              <article
                key={p.title}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}: ${p.title}`}
                aria-hidden={!active}
                className="absolute top-0 isolate h-full overflow-hidden r-34 will-change-transform [backface-visibility:hidden] max-lg:rounded-[18px]"
                style={style}
              >
                <Image
                  src={p.img}
                  alt=""
                  fill
                  quality={90}
                  placeholder="blur"
                  sizes={designSizes(799, "95vw")}
                  className="-z-10 object-cover"
                  style={{ objectPosition: p.position }}
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black/80" />
                {/* Side cards are dimmed and clickable to bring them to the centre. */}
                <button
                  type="button"
                  tabIndex={active ? -1 : 0}
                  aria-label={`Show ${p.title}`}
                  onClick={() => go(i)}
                  className={`absolute inset-0 z-10 bg-black ${active ? "pointer-events-none" : "cursor-pointer"}`}
                  style={{ opacity: s.dim, transition: motion }}
                />
                <div
                  className={`absolute bottom-34 left-40 right-40 max-lg:hidden ${active ? "" : "pointer-events-none"}`}
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(calc(12 * var(--spacing)))",
                    transition: wrapped
                      ? "none"
                      : `opacity 500ms ease ${active ? "250ms" : "0ms"}, transform 600ms ${EASE} ${active ? "200ms" : "0ms"}`,
                  }}
                >
                  <span className="inline-flex h-29 items-center gap-5 rounded-full bg-[rgba(32,74,0,0.52)] pl-15 pr-14 font-inter fs-12 font-bold backdrop-blur-[5px]">
                    <Image src={pickIcon} alt="" className="size-11" />
                    Editor’s Pick
                  </span>
                  <h3 className="mt-6 fs-28 font-bold leading-[1.26] tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-5 line-clamp-3 w-719 font-outfit fs-10 leading-[1.26]">{p.synopsis}</p>
                  <div className="mt-9 flex items-center gap-5">
                    <span className={`${glass} h-31 gap-5 px-10`}>
                      <Image src={cc} alt="" className="h-11 w-13" />
                      {p.episodes}
                      <span className="sr-only"> subtitled episodes</span>
                    </span>
                    <span className={`${glass} px-17`}>{p.status}</span>
                    <span className={`${glass} gap-5 bg-gold/20 pl-10 pr-11 lowercase text-gold`}>
                      <Image src={star} alt="" className="h-13 w-14" />
                      {p.score}
                    </span>
                  </div>
                  <ul className="mt-6 flex items-center gap-5" aria-label="Genres">
                    {p.genres.map((g) => (
                      <li key={g} className={`${glass} px-15`}>
                        {g}
                      </li>
                    ))}
                  </ul>

                  <div className="absolute bottom-6 right-0 flex items-center gap-7">
                    <a href="#" tabIndex={active ? 0 : -1} aria-label={`Play ${p.title}`} className="transition-transform hover:scale-[1.03]">
                      <Image src={playNow} alt="" className="h-36.25 w-110.5" />
                    </a>
                    <a
                      href="#"
                      tabIndex={active ? 0 : -1}
                      aria-label={`${p.title} details`}
                      className="grid h-35.75 w-98.5 place-items-center rounded-full bg-white/10 backdrop-blur-[15px] transition-colors hover:bg-white/20"
                    >
                      <Image src={detailsLabel} alt="" className="h-11 w-61" />
                    </a>
                    <button
                      type="button"
                      tabIndex={active ? 0 : -1}
                      aria-label={`Add ${p.title} to your list`}
                      className="rounded-full backdrop-blur-[15px] transition-transform hover:scale-105"
                    >
                      <Image src={plus} alt="" className="size-35.75" />
                    </button>
                  </div>
                </div>

                {/* Mobile keeps just the essentials over the art. */}
                <div
                  className="absolute inset-x-16 bottom-14 lg:hidden"
                  style={{ opacity: active ? 1 : 0, transition: wrapped ? "none" : "opacity 400ms ease" }}
                >
                  <span className="text-[11px] font-bold text-[#98f94c]">Editor’s Pick</span>
                  <h3 className="text-[16px] font-bold leading-tight">{p.title}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Now showing {pick.title}
      </p>

      {/* Prev / next — Figma's 106×56 pill with two 40px buttons. */}
      <div className="mx-auto mt-24 flex h-56 w-106 items-center justify-between rounded-full bg-[#0a0a0a] px-8">
        <button
          type="button"
          aria-label="Previous recommendation"
          onClick={() => step(-1)}
          className="grid size-40 place-items-center rounded-full bg-[#181818] transition-colors hover:bg-[#242424]"
        >
          <svg viewBox="-1.5 -1.5 10 15" className="h-15 w-10" aria-hidden>
            <path d="M7 0 0 6l7 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next recommendation"
          onClick={() => step(1)}
          className="grid size-40 place-items-center rounded-full bg-[#181818] transition-colors hover:bg-[#242424]"
        >
          <svg viewBox="-1.5 -1.5 10 15" className="h-15 w-10" aria-hidden>
            <path d="M0 0l7 6-7 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
