"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type CSSProperties } from "react";
import { designSizes } from "@/lib/sizes";
import crown from "@/assets/icons/icon-recommends.svg";
import pickIcon from "@/assets/icons/icon-editors-pick.svg";
import cc from "@/assets/icons/icon-cc.svg";
import star from "@/assets/icons/icon-star.svg";
import playNow from "@/assets/icons/reco-play-now.svg";
import detailsLabel from "@/assets/icons/reco-details-label.svg";
import plus from "@/assets/icons/reco-plus.svg";
import chainsaw from "@/assets/img/hero-chainsaw-man.jpg";
import tokyoRev from "@/assets/img/release-tokyorev-bg.png";
import wotakoi from "@/assets/img/carousel-center-wotakoi.png";
import apothecary from "@/assets/img/release-apothecary-bg.png";
import jjk from "@/assets/img/popular-jjk.png";

type Pick = {
  title: string;
  synopsis: string;
  episodes: number;
  status: string;
  score: string;
  genres: string[];
  img: StaticImageData;
  position: string;
};

const PICKS: Pick[] = [
  {
    title: "Chainsaw Man",
    synopsis:
      "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita. One day, Denji is betrayed and killed — and Pochita merges with his body to bring him back as Chainsaw Man....",
    episodes: 12,
    status: "Finished",
    score: "87%",
    genres: ["Action", "Horror", "Supernatural"],
    img: chainsaw,
    position: "50% 25%",
  },
  {
    title: "Tokyo Revengers",
    synopsis:
      "Takemichi Hanagaki learns that his middle-school girlfriend was killed by the Tokyo Manji Gang. Pushed in front of a train, he wakes up twelve years in the past — and gets one chance to change everything....",
    episodes: 24,
    status: "Finished",
    score: "84%",
    genres: ["Action", "Drama", "Time Travel"],
    img: tokyoRev,
    position: "50% 35%",
  },
  {
    title: "Wotakoi: Love is Hard for Otaku",
    synopsis:
      "Having slept through all four of her alarms, the energetic Narumi Momose finds herself running late for her first day of work at a new office. As she races to catch her train, she makes a promise to herself that none of her coworkers will find out about her dark secret: that she is an otaku and a fujoshi. Her plan goes instantly awry, though, when she runs into Hirotaka Nifuji, an old friend from middle school....",
    episodes: 12,
    status: "Finished",
    score: "78%",
    genres: ["Slice of Life", "Romance", "Comedy"],
    img: wotakoi,
    position: "50% 39%",
  },
  {
    title: "The Apothecary Diaries",
    synopsis:
      "Maomao lived a peaceful life with her apothecary father until she was sold as a lowly servant to the emperor's palace. But she wasn't meant for a compliant life among royalty, and when the emperor's heirs fall ill she decides to step in and find a cure....",
    episodes: 24,
    status: "Airing",
    score: "93%",
    genres: ["Mystery", "Drama", "Historical"],
    img: apothecary,
    position: "50% 35%",
  },
  {
    title: "Jujutsu Kaisen",
    synopsis:
      "Yuji Itadori is an unnaturally strong high schooler who spends his days at the Occult Club. When a cursed talisman is unsealed at school, he swallows a finger of Ryomen Sukuna, the King of Curses, to save his friends — and is pulled into the world of jujutsu sorcerers....",
    episodes: 47,
    status: "Finished",
    score: "86%",
    genres: ["Action", "Supernatural", "Shounen"],
    img: jjk,
    position: "50% 22%",
  },
];

const START = 2; // Wotakoi sits in the centre, as in the Figma frame.

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

const n = PICKS.length;
/** Position of card `i` relative to the centred card, in −2…2. */
const slotOf = (i: number, center: number) => ((i - center + n + 2) % n) - 2;

const EASE = "cubic-bezier(0.22, 0.8, 0.2, 1)";

const glass = "flex h-30 items-center rounded-full bg-[rgba(44,44,44,0.52)] font-inter fs-13 font-bold backdrop-blur-[5px]";

export default function Coverflow() {
  // `prev` lets the card that wraps from one end to the other jump instead of sweeping across.
  const [{ index, prev }, setState] = useState({ index: START, prev: START });
  const go = (to: number) => setState((s) => ({ index: (to + n) % n, prev: s.index }));
  const step = (d: number) => go(index + d);
  const pick = PICKS[index];

  return (
    <section aria-labelledby="reco-heading" aria-roledescription="carousel" className="mt-121 pb-120 max-lg:mt-56 max-lg:pb-64">
      <h2 id="reco-heading" className="flex items-center justify-center gap-10 fs-20 font-bold max-lg:text-[18px]">
        <Image src={crown} alt="" className="size-20" />
        Kuro Recommends
      </h2>

      <div
        className="mt-89 overflow-hidden max-lg:-mx-16 max-lg:mt-24"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          if (e.key === "ArrowRight") step(1);
        }}
      >
        <div
          className="relative mx-auto aspect-[1799/448] w-1799 max-lg:left-1/2 max-lg:w-[220%] max-lg:-translate-x-1/2"
          style={{ perspective: "calc(2000 * var(--spacing))" }}
        >
          {PICKS.map((p, i) => {
            const slot = slotOf(i, index);
            const s = SLOTS[slot];
            const wrapped = Math.abs(slot - slotOf(i, prev)) > 1;
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
