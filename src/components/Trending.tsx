"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
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

type Item = {
  title: string;
  img: StaticImageData;
  /** Outlined brush numeral from Figma and its unrotated size in Figma px. */
  rank: { src: StaticImageData; w: number; h: number };
  sub: number;
  dub?: number;
};

const ITEMS: Item[] = [
  { title: "The Laid-Off Cheat-Granting Mage Enjoys a Second Lease on Life", img: mage, rank: { src: rank1, w: 50, h: 77.4 }, sub: 1, dub: 1 },
  { title: "Black Clover Season 2", img: blackClover, rank: { src: rank2, w: 50, h: 66 }, sub: 1 },
  { title: "So What's Wrong with Getting Reborn as a Goblin?", img: goblin, rank: { src: rank3, w: 56.6, h: 65.6 }, sub: 1 },
  { title: "A Returner's Magic Should be Special Season 2", img: returner, rank: { src: rank4, w: 43.3, h: 79.9 }, sub: 1, dub: 1 },
  { title: "The Exiled Heavy Knight Knows How to Game the System", img: knight, rank: { src: rank5, w: 48.9, h: 83.3 }, sub: 10, dub: 9 },
  { title: "The Detective Is Already Dead Season 2", img: detective, rank: { src: rank6, w: 60, h: 93 }, sub: 10, dub: 9 },
];

const chip =
  "flex h-23 items-center rounded-full bg-[rgba(44,44,44,0.52)] font-inter fs-10 font-bold tracking-[-0.02em] backdrop-blur-[5px]";

export default function Trending() {
  const rail = useRef<HTMLOListElement>(null);

  const scrollNext = () => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const pitch = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 320;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + pitch * 2, behavior: "smooth" });
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
          className="scrollbar-none flex snap-x snap-mandatory scroll-pl-33 gap-51 overflow-x-auto overscroll-x-contain pb-4 pl-33 pr-123 pt-52 max-lg:gap-32 max-lg:scroll-pl-24 max-lg:pl-24 max-lg:pr-60 max-lg:pt-40"
        >
          {ITEMS.map((item, i) => (
            <li key={item.title} className="relative h-369 w-271 shrink-0 snap-start max-lg:h-262 max-lg:w-192">
              <a href="#" className="group absolute inset-0 overflow-hidden r-20 max-lg:rounded-[16px]">
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
              </a>
              {/* Numeral is centred on the poster's top-left corner and tilted 10°. */}
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
            </li>
          ))}
        </ol>

        {/* Right fade + next arrow, pinned to the frame's right edge and aligned to the posters. */}
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Scroll trending"
          className="absolute right-0 top-52 h-369 w-123 transition-opacity hover:opacity-90 max-lg:top-40 max-lg:h-262 max-lg:w-60"
        >
          <Image src={nextArrow} alt="" className="size-full" />
        </button>
      </div>
    </section>
  );
}
