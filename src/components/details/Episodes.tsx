"use client";

import Image from "next/image";
import { useState } from "react";
import { designSizes } from "@/lib/sizes";
import gridIcon from "@/assets/details/view-grid.svg";
import cardsIcon from "@/assets/details/view-cards.svg";
import listIcon from "@/assets/details/view-list.svg";
import thumbA from "@/assets/img/hero-black-clover.png";
import thumbB from "@/assets/img/hero-black-clover-movie.png";
import thumbC from "@/assets/details/poster-black-clover.png";
import thumbD from "@/assets/img/poster-black-clover.png";

const TOTAL = 170;
const PAGE = 100;
const WATCHED = 2; // episodes 1–2 watched
const UP_NEXT = 3;
const FIRST_AIR = Date.UTC(2017, 9, 3); // Oct 3, 2017, weekly
const THUMBS = [thumbA, thumbB, thumbC, thumbD];

type View = "list" | "cards" | "grid";

const pad = (n: number) => String(n).padStart(3, "0");
const airDate = (ep: number) =>
  new Date(FIRST_AIR + (ep - 1) * 7 * 864e5).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function state(ep: number) {
  return ep <= WATCHED ? "watched" : ep === UP_NEXT ? "next" : "new";
}

export default function Episodes() {
  const [view, setView] = useState<View>("grid");
  const [range, setRange] = useState(0);
  const from = range * PAGE + 1;
  const to = Math.min(TOTAL, from + PAGE - 1);
  const eps = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const ranges = Array.from({ length: Math.ceil(TOTAL / PAGE) }, (_, i) => i);

  const views: { id: View; icon: typeof gridIcon; label: string; size: string }[] = [
    { id: "list", icon: listIcon, label: "List view", size: "h-14 w-16" },
    { id: "cards", icon: cardsIcon, label: "Card view", size: "h-14 w-17" },
    { id: "grid", icon: gridIcon, label: "Grid view", size: "size-14" },
  ];

  return (
    <section id="episodes" aria-labelledby="episodes-heading" className="relative ml-50 h-887 w-1820 scroll-mt-80 r-20 border border-lime bg-black p-40 max-lg:mx-0 max-lg:mt-24 max-lg:h-auto max-lg:w-full max-lg:rounded-[16px] max-lg:p-16">
      {/* View toggles sit just above the panel's top-right corner, as in Figma. */}
      <div role="group" aria-label="Episode view" className="absolute -top-34 right-40 flex items-center gap-20 max-lg:static max-lg:mb-16 max-lg:justify-end">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-label={v.label}
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
            className={`transition-opacity ${view === v.id ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
          >
            <Image src={v.icon} alt="" className={v.size} />
          </button>
        ))}
      </div>

      <div className="flex items-start justify-between gap-16 max-lg:flex-col">
        <h2 id="episodes-heading" className="fs-24 font-bold leading-[normal] tracking-[-0.02em]">
          Episodes
        </h2>
        <div role="tablist" aria-label="Episode range" className="flex gap-8">
          {ranges.map((r) => {
            const a = r * PAGE + 1;
            const b = Math.min(TOTAL, a + PAGE - 1);
            return (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={r === range}
                onClick={() => setRange(r)}
                className={`h-34 rounded-full px-16 font-outfit fs-12 tabular-nums transition-colors ${
                  r === range ? "bg-lime/10 text-lime" : "bg-[#181818] text-[#919191] hover:text-white"
                }`}
              >
                EP {pad(a)}–{pad(b)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="kuro-scroll mt-30 h-[calc(100%-calc(64*var(--spacing)))] overflow-y-auto pr-4 max-lg:h-auto max-lg:max-h-[70svh]">
        {view === "grid" && (
          <ol className="grid grid-cols-10 gap-12 max-lg:grid-cols-5 max-lg:gap-6">
            {eps.map((ep) => {
              const s = state(ep);
              return (
                <li key={ep}>
                  <a
                    href="#"
                    aria-label={`Episode ${ep}${s === "watched" ? ", watched" : s === "next" ? ", up next" : ""}`}
                    className={`relative flex h-62 flex-col items-center justify-center rounded-[calc(10*var(--spacing))] border transition-colors max-lg:h-48 ${
                      s === "watched"
                        ? "border-transparent bg-lime/10 text-lime"
                        : s === "next"
                          ? "border-lime bg-[#121212] text-white"
                          : "border-[#1f1f1f] bg-[#121212] text-white hover:border-lime/50 hover:bg-[#181818]"
                    }`}
                  >
                    <span className="fs-16 font-bold tabular-nums">{pad(ep)}</span>
                    <span className={`font-outfit fs-10 ${s === "watched" ? "text-lime/60" : "text-[#6d6d6d]"}`}>
                      {s === "next" ? "Up next" : s === "watched" ? "Watched" : "24m"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        )}

        {view === "cards" && (
          <ol className="grid grid-cols-5 gap-16 max-lg:grid-cols-2 max-lg:gap-8">
            {eps.map((ep) => {
              const s = state(ep);
              return (
                <li key={ep}>
                  <a href="#" className="group block">
                    <div className={`relative aspect-video overflow-hidden rounded-[calc(12*var(--spacing))] border ${s === "next" ? "border-lime" : "border-transparent"}`}>
                      <Image
                        src={THUMBS[ep % THUMBS.length]}
                        alt=""
                        fill
                        placeholder="blur"
                        sizes={designSizes(334, "45vw")}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: `50% ${(ep * 37) % 100}%` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />
                      <span className="absolute bottom-10 left-12 fs-14 font-bold">EP {pad(ep)}</span>
                      <span className="absolute bottom-10 right-12 font-outfit fs-10 text-white/70">24m</span>
                      {s === "watched" && <div className="absolute inset-x-0 bottom-0 h-3 bg-lime" />}
                    </div>
                    <p className="mt-8 font-outfit fs-12 text-[#919191]">{s === "next" ? "Up next" : airDate(ep)}</p>
                  </a>
                </li>
              );
            })}
          </ol>
        )}

        {view === "list" && (
          <ol className="divide-y divide-[#1a1a1a]">
            {eps.map((ep) => {
              const s = state(ep);
              return (
                <li key={ep}>
                  <a href="#" className="flex h-56 items-center gap-24 px-12 transition-colors hover:bg-[#0f0f0f]">
                    <span className={`w-48 fs-16 font-bold tabular-nums ${s === "watched" ? "text-lime" : ""}`}>{pad(ep)}</span>
                    <span className="flex-1 font-outfit fs-14">Episode {ep}</span>
                    <span className="font-outfit fs-12 text-[#6d6d6d] max-lg:hidden">{airDate(ep)}</span>
                    <span className="w-48 text-right font-outfit fs-12 text-[#6d6d6d]">24m</span>
                    <span
                      className={`w-80 rounded-full px-10 py-4 text-center font-outfit fs-10 ${
                        s === "watched" ? "bg-lime/10 text-lime" : s === "next" ? "border border-lime text-lime" : "bg-[#181818] text-[#919191]"
                      }`}
                    >
                      {s === "watched" ? "Watched" : s === "next" ? "Up next" : "SUB · DUB"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
