"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { designSizes } from "@/lib/sizes";
import crown from "@/assets/icons/icon-recommends.svg";
import pickIcon from "@/assets/icons/icon-editors-pick.svg";
import ccChip from "@/assets/icons/reco-chip-cc12.svg";
import star from "@/assets/icons/icon-star.svg";
import playNow from "@/assets/icons/reco-play-now.svg";
import detailsLabel from "@/assets/icons/reco-details-label.svg";
import plus from "@/assets/icons/reco-plus.svg";
import farLeft from "@/assets/img/carousel-far-left.png";
import farLeftOverlay from "@/assets/img/carousel-far-left-overlay.png";
import left from "@/assets/img/carousel-left.png";
import leftOverlay from "@/assets/icons/carousel-left-overlay.svg";
import right from "@/assets/img/carousel-right.png";
import farRight from "@/assets/img/carousel-far-right.png";
import wotakoi from "@/assets/img/carousel-center-wotakoi.png";
import apothecary from "@/assets/img/release-apothecary-bg.png";
import tokyoRev from "@/assets/img/release-tokyorev-bg.png";

/*
 * Figma group is 1799×448. The side cards ship with their perspective baked into transparent
 * PNGs (right-hand cards are mirrored), so they are reproduced as placed layers. Every box is a
 * percentage of the group, so the composition scales as one piece at any width.
 */
const W = 1799;
const H = 448;

const box = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
});

// Bottom → top, matching the Figma layer order.
const LAYERS: { img: StaticImageData; x: number; y: number; w: number; h: number; flip?: boolean }[] = [
  { img: farLeft, x: 0, y: 31.22, w: 521, h: 385.61 },
  { img: farLeftOverlay, x: 0, y: 31.22, w: 521, h: 385.61 },
  { img: farRight, x: 1278, y: 31.22, w: 521, h: 385.61, flip: true },
  { img: left, x: 133, y: 16.92, w: 521, h: 414.22 },
  { img: leftOverlay, x: 133, y: 16.92, w: 521, h: 414.22 },
  { img: right, x: 1145, y: 16.92, w: 521, h: 414.22, flip: true },
];

type Pick = {
  title: string;
  synopsis: string;
  status: string;
  score: string;
  genres: string[];
  img: StaticImageData;
  position: string;
};

// First entry is the Figma frame; the arrows step through the rest.
const PICKS: Pick[] = [
  {
    title: "Wotakoi: Love is Hard for Otaku",
    synopsis:
      "Having slept through all four of her alarms, the energetic Narumi Momose finds herself running late for her first day of work at a new office. As she races to catch her train, she makes a promise to herself that none of her coworkers will find out about her dark secret: that she is an otaku and a fujoshi. Her plan goes instantly awry, though, when she runs into Hirotaka Nifuji, an old friend from middle school....",
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
    status: "Airing",
    score: "93%",
    genres: ["Mystery", "Drama", "Historical"],
    img: apothecary,
    position: "50% 35%",
  },
  {
    title: "Tokyo Revengers",
    synopsis:
      "Takemichi Hanagaki learns that his middle-school girlfriend was killed by the Tokyo Manji Gang. Pushed in front of a train, he wakes up twelve years in the past — and gets one chance to change everything....",
    status: "Airing",
    score: "87%",
    genres: ["Action", "Drama", "Time Travel"],
    img: tokyoRev,
    position: "50% 40%",
  },
];

const glass = "flex h-30 items-center rounded-full bg-[rgba(44,44,44,0.52)] font-inter fs-13 font-bold backdrop-blur-[5px]";

export default function Coverflow() {
  const [index, setIndex] = useState(0);
  const pick = PICKS[index];
  const step = (d: number) => setIndex((i) => (i + d + PICKS.length) % PICKS.length);

  return (
    <section aria-labelledby="reco-heading" className="mt-121 pb-120 max-lg:mt-56 max-lg:pb-64">
      <h2 id="reco-heading" className="ml-376 flex items-center gap-10 fs-20 font-bold max-lg:ml-0 max-lg:text-[18px]">
        <Image src={crown} alt="" className="size-20" />
        Kuro Recommends
      </h2>

      <div className="mt-89 overflow-hidden max-lg:-mx-16 max-lg:mt-24">
        <div className="relative mx-auto aspect-[1799/448] w-1799 max-lg:left-1/2 max-lg:w-[220%] max-lg:-translate-x-1/2">
          {LAYERS.map((l, i) => (
            <div key={i} aria-hidden className="pointer-events-none absolute" style={box(l)}>
              <Image
                src={l.img}
                alt=""
                fill
                sizes={designSizes(521, "60vw")}
                className={`object-fill ${l.flip ? "-scale-x-100" : ""}`}
              />
            </div>
          ))}

          <article
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${PICKS.length}: ${pick.title}`}
            className="absolute isolate overflow-hidden r-34 max-lg:rounded-[18px]"
            style={box({ x: 500, y: 0, w: 799, h: 448 })}
          >
            {PICKS.map((p, i) => (
              <Image
                key={p.title}
                src={p.img}
                alt=""
                fill
                quality={90}
                placeholder="blur"
                sizes={designSizes(799, "95vw")}
                className={`-z-10 object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                style={{ objectPosition: p.position }}
              />
            ))}
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black/80" />

            <div className="absolute bottom-34 left-40 right-40 max-lg:hidden">
              <span className="inline-flex h-29 items-center gap-5 rounded-full bg-[rgba(32,74,0,0.52)] pl-15 pr-14 font-inter fs-12 font-bold backdrop-blur-[5px]">
                <Image src={pickIcon} alt="" className="size-11" />
                Editor’s Pick
              </span>
              <h3 className="mt-6 fs-28 font-bold leading-[1.26] tracking-[-0.02em]">{pick.title}</h3>
              <p className="mt-5 line-clamp-3 w-719 font-outfit fs-10 leading-[1.26]">{pick.synopsis}</p>
              <div className="mt-9 flex items-center gap-5">
                <Image src={ccChip} alt="12 subtitled episodes" className="h-31 w-52" />
                <span className={`${glass} px-17`}>{pick.status}</span>
                <span className={`${glass} gap-5 bg-gold/20 pl-10 pr-11 lowercase text-gold`}>
                  <Image src={star} alt="" className="h-13 w-14" />
                  {pick.score}
                </span>
              </div>
              <ul className="mt-6 flex items-center gap-5" aria-label="Genres">
                {pick.genres.map((g) => (
                  <li key={g} className={`${glass} px-15`}>
                    {g}
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-6 right-0 flex items-center gap-7">
                <a href="#" aria-label={`Play ${pick.title}`} className="transition-transform hover:scale-[1.03]">
                  <Image src={playNow} alt="" className="h-36.25 w-110.5" />
                </a>
                <a
                  href="#"
                  aria-label={`${pick.title} details`}
                  className="grid h-35.75 w-98.5 place-items-center rounded-full bg-white/10 backdrop-blur-[15px] transition-colors hover:bg-white/20"
                >
                  <Image src={detailsLabel} alt="" className="h-11 w-61" />
                </a>
                <button type="button" aria-label={`Add ${pick.title} to your list`} className="rounded-full backdrop-blur-[15px] transition-transform hover:scale-105">
                  <Image src={plus} alt="" className="size-35.75" />
                </button>
              </div>
            </div>

            {/* Mobile keeps just the essentials over the art. */}
            <div className="absolute inset-x-16 bottom-14 lg:hidden">
              <span className="text-[11px] font-bold text-[#98f94c]">Editor’s Pick</span>
              <h3 className="text-[16px] font-bold leading-tight">{pick.title}</h3>
            </div>
          </article>
        </div>
      </div>

      {/* Prev / next — Figma's 106×56 pill with two 38px buttons. */}
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
