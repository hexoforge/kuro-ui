"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { designSizes } from "@/lib/sizes";
import fire from "@/assets/icons/icon-fire.svg";
import epIcon from "@/assets/icons/icon-chip-ep.svg";
import micIcon from "@/assets/icons/icon-chip-mic.svg";
import tvBadge from "@/assets/icons/icon-chip-tv.svg";
import nextArrow from "@/assets/icons/trending-next-arrow.svg";
import rank1 from "@/assets/icons/rank-1.svg";
import rank2 from "@/assets/icons/rank-2.svg";
import rank3 from "@/assets/icons/rank-3.svg";
import rank4 from "@/assets/icons/rank-4.svg";
import rank5 from "@/assets/icons/rank-5.svg";
import rank6 from "@/assets/icons/rank-6.svg";
import mage from "@/assets/img/poster-laid-off-mage.png";
import blackClover from "@/assets/img/poster-black-clover.png";
import goblin from "@/assets/img/poster-goblin.png";
import returner from "@/assets/img/poster-returner.png";
import knight from "@/assets/img/poster-exiled-knight.png";
import detective from "@/assets/img/poster-detective-dead.png";
import apothecary from "@/assets/img/top-apothecary.png";
import jjk from "@/assets/img/popular-jjk.png";
import bleach from "@/assets/img/top-bleach.png";
import rezero from "@/assets/img/cw-rezero.png";

type Item = {
  title: string;
  href?: string;
  img: StaticImageData;
  /**
   * Outlined brush numeral from Figma and its unrotated size in Figma px. Figma only drew 1–6;
   * later ranks are typeset in the same face (Sedgwick Ave Display) with `color`.
   */
  rank: { src: StaticImageData; w: number; h: number } | { color: string };
  sub: number;
  dub?: number;
};

const ITEMS: Item[] = [
  { title: "The Laid-Off Cheat-Granting Mage Enjoys a Second Lease on Life", img: mage, rank: { src: rank1, w: 50, h: 77.4 }, sub: 1, dub: 1 },
  { title: "Black Clover Season 2", href: "/anime/black-clover", img: blackClover, rank: { src: rank2, w: 50, h: 66 }, sub: 1 },
  { title: "So What's Wrong with Getting Reborn as a Goblin?", img: goblin, rank: { src: rank3, w: 56.6, h: 65.6 }, sub: 1 },
  { title: "A Returner's Magic Should be Special Season 2", img: returner, rank: { src: rank4, w: 43.3, h: 79.9 }, sub: 1, dub: 1 },
  { title: "The Exiled Heavy Knight Knows How to Game the System", img: knight, rank: { src: rank5, w: 48.9, h: 83.3 }, sub: 10, dub: 9 },
  { title: "The Detective Is Already Dead Season 2", img: detective, rank: { src: rank6, w: 60, h: 93 }, sub: 10, dub: 9 },
  { title: "The Apothecary Diaries Season 3", img: apothecary, rank: { color: "#ffa047" }, sub: 3, dub: 1 },
  { title: "Jujutsu Kaisen: The Culling Game", img: jjk, rank: { color: "#ff5c8a" }, sub: 4, dub: 2 },
  { title: "BLEACH: Thousand-Year Blood War - The Calamity", img: bleach, rank: { color: "#00f5d4" }, sub: 2, dub: 1 },
  { title: "Re:ZERO - Starting Life in Another World Season 3", img: rezero, rank: { color: "#d2fe4e" }, sub: 8, dub: 6 },
];

const chip =
  "flex h-23 items-center rounded-full bg-[rgba(44,44,44,0.52)] font-inter fs-10 font-bold tracking-[-0.02em] backdrop-blur-[5px]";

export default function Trending() {
  const rail = useRef<HTMLOListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  /**
   * Page by whatever is fully visible: the first card that is cut off (or hidden under the
   * right-hand fade) becomes the new first card. Snap points then align it exactly.
   */
  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
    const fade = el.clientWidth * 0.07;
    const viewLeft = el.scrollLeft + pad;
    const viewRight = el.scrollLeft + el.clientWidth - fade;
    if (dir === 1) {
      if (edges.end) return el.scrollTo({ left: 0, behavior: "smooth" });
      const next = cards.find((c) => c.offsetLeft + c.offsetWidth > viewRight) ?? cards[cards.length - 1];
      el.scrollTo({ left: next.offsetLeft - pad, behavior: "smooth" });
    } else {
      const span = viewRight - viewLeft;
      const prev = cards.find((c) => c.offsetLeft >= viewLeft - span) ?? cards[0];
      el.scrollTo({ left: Math.max(0, prev.offsetLeft - pad), behavior: "smooth" });
    }
  };

  return (
    <section aria-labelledby="trending-heading" className="mt-70 max-lg:mt-48">
      <h2 id="trending-heading" className="flex items-center gap-11 pl-2 fs-20 font-bold max-lg:text-[18px]">
        <Image src={fire} alt="" className="h-20 w-18" />
        Trending Right Now
      </h2>

      <div className="relative -mr-45 -mt-4 max-lg:-mr-16">
        <ol
          ref={rail}
          className="scrollbar-none flex snap-x snap-mandatory scroll-pl-33 gap-51 overflow-x-auto overscroll-x-contain pb-4 pl-33 pr-83 pt-52 max-lg:gap-32 max-lg:scroll-pl-24 max-lg:pl-24 max-lg:pr-40 max-lg:pt-40"
        >
          {ITEMS.map((item, i) => (
            <li key={item.title} className="relative h-369 w-271 shrink-0 snap-start max-lg:h-262 max-lg:w-192">
              <Link href={item.href ?? "#"} className="group absolute inset-0 overflow-hidden r-20 max-lg:rounded-[16px]">
                <Image
                  src={item.img}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes={designSizes(271, "192px")}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-black opacity-70" />
                <div className="absolute inset-x-31 bottom-31 max-lg:inset-x-14 max-lg:bottom-16">
                  <h3 className="line-clamp-3 w-208 fs-18 font-bold leading-[1.26] max-lg:w-auto max-lg:text-[14px]">
                    <span className="sr-only">#{i + 1} </span>
                    {item.title}
                  </h3>
                  <div className="mt-10 flex items-center gap-3">
                    <span className={`${chip} w-42 justify-center gap-3`}>
                      <Image src={epIcon} alt="" className="h-8.5 w-10" />
                      {item.sub}
                      <span className="sr-only"> subtitled</span>
                    </span>
                    {item.dub !== undefined && (
                      <span className={`${chip} w-34 justify-center gap-2.5`}>
                        <Image src={micIcon} alt="" className="h-8.5 w-6" />
                        {item.dub}
                        <span className="sr-only"> dubbed</span>
                      </span>
                    )}
                    <Image src={tvBadge} alt="TV" className="size-15" />
                  </div>
                </div>
              </Link>
              {/* Numeral is centred on the poster's top-left corner and tilted 10°. */}
              {"src" in item.rank ? (
                <Image
                  src={item.rank.src}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-10 max-lg:scale-75"
                  style={{
                    width: `calc(${item.rank.w} * var(--spacing))`,
                    height: `calc(${item.rank.h} * var(--spacing))`,
                  }}
                />
              ) : (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rotate-10 font-sedgwick-display leading-none max-lg:scale-75 ${
                    i + 1 >= 10 ? "fs-88 tracking-[-0.08em]" : "fs-110"
                  }`}
                  style={{ color: item.rank.color }}
                >
                  {i + 1}
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* Fades + arrows, pinned to the frame edges and aligned to the posters. The left one only
            appears once the rail has moved, so the resting state matches the design. */}
        {!edges.start && (
          <button
            type="button"
            onClick={() => page(-1)}
            aria-label="Previous trending titles"
            className="absolute -left-50 top-52 h-369 w-123 transition-opacity hover:opacity-90 max-lg:-left-16 max-lg:top-40 max-lg:h-262 max-lg:w-60"
          >
            <Image src={nextArrow} alt="" className="size-full -scale-x-100" />
          </button>
        )}
        {/* The rail ends 83 from the frame edge, mirroring its 83 start. At the end there's nothing left to
            reveal, so the fade would only shade card 10 — show just the chevron (wraps to the start). */}
        <button
          type="button"
          onClick={() => page(1)}
          aria-label={edges.end ? "Back to the first trending titles" : "Next trending titles"}
          className={`absolute right-0 top-52 h-369 transition-opacity hover:opacity-90 max-lg:top-40 max-lg:h-262 max-lg:w-40 ${
            edges.end ? "grid w-83 place-items-center" : "w-123 max-lg:w-60"
          }`}
        >
          {edges.end ? (
            <svg viewBox="-1.5 -1.5 7.6 11.9" className="h-12 w-6" aria-hidden>
              <path d="M0 0l4.6 4.4L0 8.9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <Image src={nextArrow} alt="" className="size-full" />
          )}
        </button>
      </div>
    </section>
  );
}
