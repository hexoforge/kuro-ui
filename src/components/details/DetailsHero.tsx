"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { designSizes } from "@/lib/sizes";
import banner from "@/assets/img/hero-black-clover.png";
import poster from "@/assets/details/poster-black-clover.png";
import logo from "@/assets/details/logo-black-clover.png";
import hdcc from "@/assets/details/badge-hd-cc.svg";
import play from "@/assets/details/icon-play.svg";
import plus from "@/assets/details/btn-plus.svg";
import hourglass from "@/assets/details/icon-hourglass.svg";
import scoreIcon from "@/assets/details/stat-score.svg";
import popularityIcon from "@/assets/details/stat-popularity.svg";
import favouritesIcon from "@/assets/details/stat-favourites.svg";
import statusDot from "@/assets/details/status-dot.svg";

const SYNOPSIS =
  "In a world where magic is everything, Asta and Yuno are both found abandoned at a church on the same day. While Yuno is gifted with exceptional magical powers, Asta is the only one in this world without any. At the age of fifteen, both receive grimoires, magic books that amplify their holder’s magic. Asta’s is a rare Grimoire of Anti-Magic that negates and repels his opponent’s spells. Being opposite but good rivals, Yuno and Asta are ready for the hardest of challenges to achieve their common dream: to be the Wizard King. Giving up is never an option!";

const GENRES = ["Action", "Adventure", "Comedy", "Fantasy"];

/** Figma shows the next episode "IN 3d 22h 3m"; count down live from that. */
const COUNTDOWN_MS = ((3 * 24 + 22) * 60 + 3) * 60 * 1000;

function formatCountdown(ms: number) {
  const m = Math.max(0, Math.floor(ms / 60000));
  return `${Math.floor(m / 1440)}d ${Math.floor((m % 1440) / 60)}h ${m % 60}m`;
}

function Countdown() {
  const [left, setLeft] = useState(COUNTDOWN_MS);
  useEffect(() => {
    const target = Date.now() + COUNTDOWN_MS;
    const id = setInterval(() => setLeft(target - Date.now()), 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="absolute left-30 top-30 flex h-34 w-162 items-center rounded-[calc(5*var(--spacing))] bg-black/20 pl-15 font-outfit fs-12 font-bold backdrop-blur-[15px] max-lg:static max-lg:w-fit max-lg:pr-14">
      <Image src={hourglass} alt="" className="h-12 w-8" />
      <span className="ml-10">EP 3</span>
      <span className="ml-6 text-[#989c9d]">IN</span>
      <time className="ml-6 tabular-nums">{formatCountdown(left)}</time>
    </p>
  );
}

const statBox = "flex h-48 w-66 flex-col items-center rounded-[calc(5*var(--spacing))] pt-9";

export default function DetailsHero() {
  return (
    <section
      aria-labelledby="anime-title"
      className="relative isolate -mr-25 ml-20 mt-20 h-568 w-1880 overflow-hidden r-30 max-lg:mx-0 max-lg:mt-16 max-lg:h-auto max-lg:w-full max-lg:rounded-[20px] max-lg:p-16"
    >
      <Image
        src={banner}
        alt=""
        fill
        preload
        fetchPriority="high"
        quality={90}
        placeholder="blur"
        sizes={designSizes(1880)}
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent to-black" />

      <Countdown />

      <div className="absolute left-30 top-191 h-347 w-240 overflow-hidden r-20 max-lg:relative max-lg:inset-auto max-lg:mt-120 max-lg:h-208 max-lg:w-144 max-lg:rounded-[14px]">
        <Image src={poster} alt="Black Clover poster" fill placeholder="blur" sizes={designSizes(240, "144px")} className="object-cover" />
      </div>

      <div className="absolute left-310 top-211 w-567 max-lg:static max-lg:mt-16 max-lg:w-auto">
        <h1 id="anime-title">
          <Image src={logo} alt="Black Clover" className="h-77 w-440 max-lg:h-auto max-lg:w-260" />
        </h1>
        <Image src={hdcc} alt="Available in HD with subtitles" className="mt-20 h-15 w-47" />
        <p className="mt-8 line-clamp-6 font-outfit fs-12 leading-[1.26] max-lg:line-clamp-4 max-lg:text-[13px]">{SYNOPSIS}</p>
        <div className="mt-20 flex items-center gap-10 max-lg:mt-16">
          <a
            href="#episodes"
            className="-ml-10 flex h-51 w-157 items-center gap-10 rounded-full bg-lime/20 pl-25 fs-14 font-bold backdrop-blur-[15px] transition-colors hover:bg-lime/30 max-lg:ml-0"
          >
            <Image src={play} alt="" className="h-14 w-12" />
            Watch Now
          </a>
          <button type="button" aria-label="Add Black Clover to your list" className="rounded-full transition-transform hover:scale-105">
            <Image src={plus} alt="" className="size-51" />
          </button>
        </div>
      </div>

      {/* Info cards, right column */}
      <aside aria-label="Series information" className="absolute left-1606 top-153 w-234 max-lg:static max-lg:mt-24 max-lg:grid max-lg:w-auto max-lg:gap-8">
        <div className="h-121 rounded-[calc(5*var(--spacing))] bg-black/77 px-13 pt-15 backdrop-blur-[10px] max-lg:h-auto max-lg:pb-13">
          <p className="font-outfit fs-12 text-[#6d6d6d]">Japanese</p>
          <p lang="ja" className="mt-5 fs-12">
            ブラッククローバー
          </p>
          <dl className="mt-10 flex gap-5">
            <div className={`${statBox} bg-[#483e1d] text-gold`}>
              <dt className="order-2 mt-7 flex items-center gap-3 font-outfit fs-8 text-gold/56">
                <Image src={scoreIcon} alt="" className="size-8" />
                Score
              </dt>
              <dd className="order-1 fs-10 font-bold">79%</dd>
            </div>
            <div className={`${statBox} bg-[#181818]`}>
              <dt className="order-2 mt-7 flex items-center gap-3 font-outfit fs-8 text-[#6d6d6d]">
                <Image src={popularityIcon} alt="" className="h-6 w-8" />
                Popularity
              </dt>
              <dd className="order-1 fs-10 font-bold">593,373</dd>
            </div>
            <div className={`${statBox} bg-[#181818]`}>
              <dt className="order-2 mt-7 flex items-center gap-3 font-outfit fs-8 text-[#828282]">
                <Image src={favouritesIcon} alt="" className="size-8" />
                Favourites
              </dt>
              <dd className="order-1 fs-10 font-bold">31,023</dd>
            </div>
          </dl>
        </div>

        <dl className="mt-5 grid h-156 grid-cols-[calc(111*var(--spacing))_1fr] gap-y-13 rounded-[calc(10*var(--spacing))] bg-[#0f0f0f] px-13 pt-13 max-lg:h-auto max-lg:pb-13">
          {[
            ["Format", "TV"],
            ["Status", "Finished"],
            ["Season", "Fall 2017"],
            ["Episodes", "170"],
            ["Duration", "24 min"],
            ["Aired", "Oct 3, 2017 -\nMar 30, 2021"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-outfit fs-12 text-[#6d6d6d]">{k}</dt>
              <dd className="mt-3 flex items-center gap-3 whitespace-pre-line fs-10 font-bold">
                {k === "Status" && <Image src={statusDot} alt="" className="size-6" />}
                {v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 h-57 rounded-[calc(10*var(--spacing))] bg-[#0f0f0f] px-10 pt-8 max-lg:h-auto max-lg:pb-10">
          <p className="font-outfit fs-12 text-[#6d6d6d]">Genres</p>
          <ul className="mt-6 flex gap-5">
            {GENRES.map((g) => (
              <li key={g} className="flex h-18 items-center rounded-[calc(5*var(--spacing))] border border-[#303030] bg-[#181818] px-6 font-outfit fs-9">
                {g}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
