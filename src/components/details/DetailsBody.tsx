"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { designSizes } from "@/lib/sizes";
import Episodes from "@/components/details/Episodes";
import season1 from "@/assets/img/hero-black-clover-movie.png";
import movie from "@/assets/details/watch-movie.png";
import season2 from "@/assets/img/poster-black-clover.png";
import season3 from "@/assets/details/poster-black-clover.png";
import season4 from "@/assets/img/hero-black-clover.png";
import railNext from "@/assets/details/rail-next.svg";

const TABS = ["Overview", "Characters", "Merch"] as const;
type Tab = (typeof TABS)[number];

type Entry = { title: string; img: StaticImageData; current?: boolean; align?: "center" | "left" };

// Figma lists Season 1 (current), the movie, then Season 2; the later seasons extend the rail.
const WATCH_ORDER: Entry[] = [
  { title: "Season 1", img: season1, current: true },
  { title: "Movie: Sword of the Wizard King", img: movie, align: "left" },
  { title: "Season 2", img: season2 },
  { title: "Season 3", img: season3 },
  { title: "Season 4", img: season4 },
];

function WatchOrder() {
  const rail = useRef<HTMLOListElement>(null);
  // Only offer the arrow + fade when the rail actually overflows (at 1920 all entries fit).
  const [overflows, setOverflows] = useState(false);
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scrollNext = () => {
    const el = rail.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.5, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="watch-order" className="mt-51 max-lg:mt-40">
      <h2 id="watch-order" className="ml-50 font-outfit fs-30 font-extrabold leading-[normal] max-lg:ml-0 max-lg:text-[24px]">
        Watch Order
      </h2>
      <div className="relative mt-20 max-lg:-mr-16 max-lg:mt-16">
        <ol ref={rail} className="scrollbar-none flex items-start gap-20 overflow-x-auto pl-50 pr-123 max-lg:gap-12 max-lg:pl-0 max-lg:pr-60">
          {WATCH_ORDER.map((e) => (
            <li key={e.title} className="shrink-0">
              <a
                href={e.current ? "#episodes" : "#"}
                aria-current={e.current ? "true" : undefined}
                className={`group relative isolate grid overflow-hidden ${
                  e.current ? "h-187 w-375 rounded-[calc(10*var(--spacing))] max-lg:h-140 max-lg:w-280" : "h-145 w-290 r-20 max-lg:h-110 max-lg:w-220"
                } ${e.align === "left" ? "items-center px-20" : "place-items-center"}`}
              >
                <Image
                  src={e.img}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes={designSizes(e.current ? 375 : 290, "280px")}
                  className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black" />
                {e.current && (
                  <span className="absolute left-10 top-10 grid h-23 w-58 place-items-center rounded-[calc(5*var(--spacing))] bg-black/30 font-inter fs-10 font-bold backdrop-blur-[2.5px]">
                    Current
                  </span>
                )}
                <h3 className={`fs-20 font-extrabold leading-[normal] max-lg:text-[16px] ${e.align === "left" ? "w-250" : "text-center"}`}>
                  {e.title}
                </h3>
              </a>
            </li>
          ))}
        </ol>
        {overflows && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Scroll watch order"
          className="absolute right-0 top-0 h-145 w-123 transition-opacity hover:opacity-90 max-lg:h-110 max-lg:w-60"
        >
          <Image src={railNext} alt="" className="size-full" />
        </button>
        )}
      </div>
      {/* Lime connector from the current season down into its episode list. */}
      <div aria-hidden className="ml-237 h-91 w-2 bg-linear-to-b from-black to-lime max-lg:hidden" />
    </section>
  );
}

function EmptyTab({ tab }: { tab: Tab }) {
  return (
    <section className="mx-50 mt-51 grid h-400 place-items-center r-20 border border-dashed border-lime/30 bg-[#0a0a0a] max-lg:mx-0 max-lg:h-240">
      <div className="text-center">
        <p className="font-outfit fs-30 font-extrabold">{tab}</p>
        <p className="mt-8 font-outfit fs-14 text-[#919191]">Coming soon to Kuro.</p>
      </div>
    </section>
  );
}

export default function DetailsBody() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <>
      <div
        role="tablist"
        aria-label="Details sections"
        className="mx-auto mt-50 flex h-50 w-912 items-center gap-10 rounded-[calc(5*var(--spacing))] bg-[#0f0f0f] px-5 max-lg:mt-24 max-lg:w-full max-lg:gap-4 max-lg:px-4"
      >
        {TABS.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={`grid h-40 flex-1 place-items-center font-outfit fs-12 transition-colors ${
                active ? "rounded-full bg-lime/10 text-lime backdrop-blur-[15px]" : "rounded-[calc(3*var(--spacing))] bg-[#181818] text-[#919191] hover:text-white"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {tab === "Overview" ? (
        <>
          <WatchOrder />
          <Episodes />
        </>
      ) : (
        <EmptyTab tab={tab} />
      )}
    </>
  );
}
