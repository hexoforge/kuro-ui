"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { designSizes } from "@/lib/sizes";
import chainsaw from "@/assets/img/hero-chainsaw-man.jpg";
import apothecary from "@/assets/img/release-apothecary-bg.png";
import blackClover from "@/assets/img/hero-black-clover.png";
import blackCloverMovie from "@/assets/img/hero-black-clover-movie.png";
import play from "@/assets/icons/icon-play.svg";
import info from "@/assets/icons/icon-info.svg";
import plus from "@/assets/icons/hero-plus-btn.svg";
import clock from "@/assets/icons/icon-clock.svg";
import cc from "@/assets/icons/icon-cc.svg";
import star from "@/assets/icons/icon-star.svg";

type Slide = {
  title: string;
  synopsis: string;
  runtime: string;
  episodes: number;
  score: string;
  img: StaticImageData;
  alt: string;
  /** Desktop / mobile focal points for the cover crop. */
  position: string;
  mobilePosition: string;
  /** Details page, where one exists. */
  href?: string;
};

const SLIDES: Slide[] = [
  {
    title: "Chainsaw Man",
    synopsis:
      "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with...",
    runtime: "24 mins",
    episodes: 12,
    score: "87%",
    img: chainsaw,
    alt: "Chainsaw Man key art: Denji in chainsaw form leaping across a city street",
    position: "50% 29%",
    mobilePosition: "62% 50%",
  },
  {
    title: "The Apothecary Diaries",
    synopsis:
      "Maomao, a young woman trained in the art of herbal medicine, is forced to work as a lowly servant in the inner palace. Though she yearns for life outside its perfumed halls, she isn't long for a life of drudgery...",
    runtime: "24 mins",
    episodes: 24,
    score: "93%",
    img: apothecary,
    alt: "The Apothecary Diaries: Maomao covering her face with a gloved hand",
    position: "50% 35%",
    mobilePosition: "50% 40%",
  },
  {
    title: "Black Clover",
    synopsis:
      "In a world where magic is everything, Asta and Yuno are both found abandoned at a church on the same day. While Yuno is gifted with exceptional magical powers, Asta is the only one in this world without any...",
    runtime: "24 mins",
    episodes: 170,
    score: "79%",
    img: blackClover,
    alt: "Black Clover: Asta and Yuno watching a glowing sunset",
    position: "50% 40%",
    mobilePosition: "30% 50%",
    href: "/anime/black-clover",
  },
  {
    title: "Black Clover: Sword of the Wizard King",
    synopsis:
      "As a lionhearted boy who can't wield magic strives for the title of Wizard King, four banished Wizard Kings of yore return to crush the Clover Kingdom...",
    runtime: "113 mins",
    episodes: 1,
    score: "76%",
    img: blackCloverMovie,
    alt: "Black Clover: the Black Bulls squad gathered among ancient ruins",
    position: "50% 35%",
    mobilePosition: "55% 50%",
    href: "/anime/black-clover",
  },
];

const INTERVAL_MS = 6000;

const chip =
  "flex h-30 items-center gap-4 whitespace-nowrap rounded-full bg-[rgba(44,44,44,0.52)] px-13 font-inter fs-13 font-bold lowercase tracking-[-0.02em] backdrop-blur-[5px]";

export default function Hero() {
  // `cut` counts transitions; it re-keys the animated layers so every change replays the slash.
  const [{ index, prev, cut }, setState] = useState({ index: 0, prev: 0, cut: 0 });
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(mq.matches);
    const onVisibility = () => setHidden(document.hidden);
    onMotion();
    mq.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const go = (to: number) =>
    setState((s) => (to === s.index ? s : { index: to, prev: s.index, cut: s.cut + 1 }));
  const next = () => go((index + 1) % SLIDES.length);

  // Autoplay keeps running under the pointer; it only pauses for keyboard focus or a hidden tab.
  const paused = focused || hidden;
  const autoplay = !reducedMotion;
  const slide = SLIDES[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      className="relative mt-20 h-847 r-30 max-lg:mt-16 max-lg:h-[min(78svh,640px)] max-lg:rounded-[20px]"
    >
      <div className={`absolute inset-0 isolate overflow-hidden r-30 max-lg:rounded-[20px] ${cut ? "hero-cut" : ""}`}>
        {SLIDES.map((s, i) => {
          const role = i === index ? "hero-incoming" : i === prev && cut ? "hero-outgoing" : "";
          return (
            <div
              key={s.title}
              aria-hidden={i !== index}
              className={`absolute inset-0 overflow-hidden ${role}`}
              style={{ zIndex: i === index ? 2 : i === prev ? 1 : 0, opacity: role || i === index ? 1 : 0 }}
            >
              <Image
                src={s.img}
                alt={i === index ? s.alt : ""}
                fill
                preload={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                quality={90}
                placeholder="blur"
                sizes={designSizes(1825)}
                className="object-cover [object-position:var(--pos)] max-lg:[object-position:var(--mobile-pos)]"
                style={{ ["--pos" as string]: s.position, ["--mobile-pos" as string]: s.mobilePosition }}
              />
            </div>
          );
        })}

        {cut > 0 && (
          <div key={cut} aria-hidden className="hero-blade z-[4]" />
        )}

        {/* Same fade as the Details banner: clear at the top, solid black at the bottom, so the art sinks
            into the page and the copy reads. Under the blade so the slash stays bright. */}
        <div className="absolute inset-0 z-[3] bg-linear-to-b from-transparent to-black" />
      </div>

      {/* Copy is anchored to the bottom (Figma: buttons end 81 above the edge) so long titles grow upward. */}
      <div
        key={`copy-${cut}`}
        aria-live={paused ? "polite" : "off"}
        className="absolute bottom-81 left-79 z-10 w-567 max-lg:inset-x-20 max-lg:bottom-28 max-lg:w-auto"
      >
        <h1 className={`line-clamp-2 fs-36 font-extrabold leading-[1.25] tracking-[-0.02em] max-lg:text-[28px] ${cut ? "hero-rise" : ""}`}>
          {slide.title}
        </h1>
        <p
          className={`mt-10 line-clamp-3 fs-12 leading-[1.26] max-lg:text-[13px] ${cut ? "hero-rise" : ""}`}
          style={{ ["--i" as string]: 1 }}
        >
          {slide.synopsis}
        </p>

        <ul className={`mt-20 flex items-center gap-4 ${cut ? "hero-rise" : ""}`} style={{ ["--i" as string]: 2 }} aria-label="Details">
          <li className={chip}>
            <Image src={clock} alt="" className="size-11" />
            {slide.runtime}
          </li>
          <li className={`${chip} gap-5`}>
            <Image src={cc} alt="" className="h-11 w-13" />
            <span>
              {slide.episodes}
              <span className="sr-only"> subtitled episodes</span>
            </span>
          </li>
          <li className={`${chip} bg-[rgba(238,191,23,0.2)] text-gold`}>
            <Image src={star} alt="" className="h-13 w-14" />
            {slide.score}
          </li>
        </ul>

        <div className={`mt-17 flex items-center gap-10 ${cut ? "hero-rise" : ""}`} style={{ ["--i" as string]: 3 }}>
          <a
            href="#"
            className="gradient-ring relative flex h-51 w-155 items-center gap-13 rounded-full bg-lime/20 pl-24 font-inter fs-18 font-semibold tracking-[-0.02em] backdrop-blur-[15px] transition-colors hover:bg-lime/30"
          >
            <Image src={play} alt="" className="h-17 w-15" />
            Play Now
          </a>
          <Link
            href={slide.href ?? "#"}
            className="flex h-50 w-138 items-center justify-center gap-8 rounded-full bg-white/10 font-inter fs-18 font-semibold tracking-[-0.02em] backdrop-blur-[15px] transition-colors hover:bg-white/20"
          >
            <Image src={info} alt="" className="size-17" />
            Details
          </Link>
          <button
            type="button"
            aria-label={`Add ${slide.title} to your list`}
            className="rounded-full backdrop-blur-[15px] transition-transform hover:scale-105"
          >
            <Image src={plus} alt="" className="size-50" />
          </button>
        </div>
      </div>

      {/*
       * Pager, centred 20px below the hero. The active dash's fill *is* the autoplay timer:
       * when its animation ends we advance, and pausing simply pauses the animation.
       */}
      <div role="tablist" aria-label="Featured slides" className="absolute -bottom-32 left-1/2 z-10 flex -translate-x-1/2 gap-6 max-lg:-bottom-28">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.title}`}
            onClick={() => go(i)}
            className="group flex h-20 items-center"
          >
            <span className="relative h-4 w-49 overflow-hidden rounded-full bg-lime/20 transition-colors group-hover:bg-lime/40 max-lg:w-24">
              {i === index && (
                <span
                  key={cut}
                  className="absolute inset-0 origin-left rounded-full bg-lime"
                  style={
                    autoplay
                      ? {
                          animation: `pager-fill ${INTERVAL_MS}ms linear both`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : undefined
                  }
                  onAnimationEnd={autoplay ? next : undefined}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
