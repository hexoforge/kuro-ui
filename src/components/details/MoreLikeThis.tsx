"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { designSizes } from "@/lib/sizes";
import sidePrev from "@/assets/details/side-prev.svg";
import sideNext from "@/assets/details/side-next.svg";
import fma from "@/assets/img/popular-fma.png";
import deathNote from "@/assets/img/popular-deathnote.png";
import hxh from "@/assets/img/popular-hxh.png";
import aot from "@/assets/img/cw-aot.png";
import tokyoGhoul from "@/assets/img/popular-tokyo-ghoul.png";
import jjk from "@/assets/img/popular-jjk.png";
import naruto from "@/assets/img/popular-naruto.png";
import chainsaw from "@/assets/img/hero-chainsaw-man.jpg";
import onePiece from "@/assets/img/top-onepiece.png";
import bleach from "@/assets/img/cw-bleach.png";
import eminence from "@/assets/img/cw-eminence.png";
import rezero from "@/assets/img/cw-rezero.png";

type Title = { title: string; meta: string; score: string; img: StaticImageData };

const TITLES: Title[] = [
  { title: "Fullmetal Alchemist: Brotherhood", meta: "BONES · TV · 64 EPS", score: "91%", img: fma },
  { title: "Death Note", meta: "MADHOUSE · TV · 37 EPS", score: "86%", img: deathNote },
  { title: "Hunter x Hunter (2011)", meta: "MADHOUSE · TV · 148 EPS", score: "90%", img: hxh },
  { title: "Attack on Titan", meta: "WIT · MAPPA · TV · 89 EPS", score: "85%", img: aot },
  { title: "Tokyo Ghoul", meta: "PIERROT · TV · 12 EPS", score: "75%", img: tokyoGhoul },
  { title: "Jujutsu Kaisen", meta: "MAPPA · TV · 47 EPS", score: "86%", img: jjk },
  { title: "Naruto", meta: "PIERROT · TV · 220 EPS", score: "79%", img: naruto },
  { title: "Chainsaw Man", meta: "MAPPA · TV · 12 EPS", score: "85%", img: chainsaw },
  { title: "ONE PIECE", meta: "TOEI · TV · 1100+ EPS", score: "88%", img: onePiece },
  { title: "Bleach: Thousand-Year Blood War", meta: "PIERROT · TV · 26 EPS", score: "91%", img: bleach },
  { title: "The Eminence in Shadow", meta: "NEXUS · TV · 32 EPS", score: "82%", img: eminence },
  { title: "Re:Zero − Starting Life in Another World", meta: "WHITE FOX · TV · 66 EPS", score: "83%", img: rezero },
];

/* Figma group 191:520 — a 1781×844 brick masonry. Boxes in Figma px relative to the grid. */
const SLOTS = [
  { x: 0, y: 0, w: 435, h: 373 },
  { x: 449, y: 0, w: 499, h: 330 },
  { x: 962, y: 0, w: 371, h: 373 },
  { x: 1347, y: 0, w: 434, h: 373 },
  { x: 449, y: 343, w: 499, h: 202 },
  { x: 0, y: 385, w: 435, h: 245 },
  { x: 962, y: 385, w: 435, h: 245 },
  { x: 1411, y: 385, w: 370, h: 245 },
  { x: 449, y: 556, w: 499, h: 288 },
  { x: 0, y: 642, w: 435, h: 202 },
  { x: 962, y: 642, w: 435, h: 202 },
  { x: 1411, y: 642, w: 370, h: 202 },
];

// Accent per slot, in Figma order: border colour, tint gradient.
const ACCENTS = [
  ["#22d3ee", "rgb(14 116 144 / 0.55)"],
  ["#e879f9", "rgb(88 28 135 / 0.6)"],
  ["#4ade80", "rgb(20 83 45 / 0.55)"],
  ["#fb923c", "rgb(124 45 18 / 0.55)"],
  ["#fb7185", "rgb(136 19 55 / 0.55)"],
  ["#a5b4fc", "rgb(49 46 129 / 0.55)"],
];

const u = (n: number) => `calc(${n} * var(--spacing))`;

function Arrow({ dir, onClick, className }: { dir: "prev" | "next"; onClick: () => void; className: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous titles" : "More titles"}
      className={`grid size-40 place-items-center rounded-full bg-[#1a1a1a] transition-colors hover:bg-[#262626] ${className}`}
    >
      <svg viewBox="-1.5 -1.5 10 15" className="h-15 w-10" aria-hidden>
        <path d={dir === "prev" ? "M7 0 0 6l7 6" : "M0 0l7 6-7 6"} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function MoreLikeThis() {
  // Arrows rotate which titles fill the masonry, four at a time.
  const [offset, setOffset] = useState(0);
  const step = (d: number) => setOffset((o) => (o + d * 4 + TITLES.length) % TITLES.length);

  return (
    <section aria-labelledby="more-like-this" className="mt-120 max-lg:mt-48">
      <div className="flex items-start justify-between pl-60 pr-61 max-lg:items-center max-lg:px-0">
        <h2 id="more-like-this" className="font-outfit fs-30 font-extrabold leading-[normal] max-lg:text-[24px]">
          More Like This
        </h2>
        <div className="mt-10 flex h-56 w-106 items-center justify-between rounded-full bg-[#0a0a0a] px-8 max-lg:mt-0">
          <Arrow dir="prev" onClick={() => step(-1)} className="" />
          <Arrow dir="next" onClick={() => step(1)} className="" />
        </div>
      </div>

      <div className="relative ml-69 mt-20 h-844 w-1781 max-lg:ml-0 max-lg:mt-16 max-lg:h-auto max-lg:w-full">
        <button type="button" onClick={() => step(-1)} aria-label="Previous titles" className="absolute -left-50 top-1/2 -translate-y-1/2 max-lg:hidden">
          <Image src={sidePrev} alt="" className="size-40" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="More titles" className="absolute -right-50 top-1/2 -translate-y-1/2 max-lg:hidden">
          <Image src={sideNext} alt="" className="size-40" />
        </button>

        <ol className="contents max-lg:grid max-lg:grid-cols-2 max-lg:gap-8">
          {SLOTS.map((slot, i) => {
            const t = TITLES[(i + offset) % TITLES.length];
            const [stroke, tint] = ACCENTS[i % ACCENTS.length];
            return (
              <li
                key={`${i}-${t.title}`}
                className="absolute max-lg:relative max-lg:inset-auto max-lg:aspect-[4/3] max-lg:h-auto! max-lg:w-auto!"
                style={{ left: u(slot.x), top: u(slot.y), width: u(slot.w), height: u(slot.h) }}
              >
                <a
                  href="#"
                  className="group relative isolate block size-full animate-[mlt-in_500ms_ease-out_both] overflow-hidden rounded-[calc(16*var(--spacing))] border-[1.5px] max-lg:rounded-[12px]"
                  style={{ borderColor: stroke, animationDelay: `${i * 30}ms` }}
                >
                  <Image
                    src={t.img}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes={designSizes(slot.w, "50vw")}
                    className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Accent tint, as in the Figma wireframe, fading into a dark base for the copy. */}
                  <div
                    className="absolute inset-0 -z-10 transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: `linear-gradient(160deg, ${tint}, rgb(0 0 0 / 0.15) 45%, rgb(0 0 0 / 0.85))` }}
                  />
                  <p className="absolute left-13 top-9 font-mono fs-11 font-bold max-lg:left-10 max-lg:top-8" style={{ color: stroke }}>
                    #{((i + offset) % TITLES.length) + 1} · {t.score}
                  </p>
                  <div className="absolute inset-x-13 bottom-12 max-lg:inset-x-10 max-lg:bottom-10">
                    <p className="truncate font-mono fs-10 font-bold" style={{ color: stroke }}>
                      {t.meta}
                    </p>
                    <h3 className="mt-2 line-clamp-2 font-inter fs-16 font-bold leading-[1.2] max-lg:text-[13px]">{t.title}</h3>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
