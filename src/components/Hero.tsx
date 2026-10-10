import Image from "next/image";
import { designSizes } from "@/lib/sizes";
import heroArt from "@/assets/img/hero-chainsaw-man.jpg";
import play from "@/assets/icons/icon-play.svg";
import info from "@/assets/icons/icon-info.svg";
import plus from "@/assets/icons/hero-plus-btn.svg";
import clock from "@/assets/icons/icon-clock.svg";
import cc from "@/assets/icons/icon-cc.svg";
import star from "@/assets/icons/icon-star.svg";

const SLIDES = 8;
const ACTIVE = 0;

const chip =
  "flex h-30 items-center gap-4 whitespace-nowrap rounded-full bg-[rgba(44,44,44,0.52)] font-inter fs-13 font-bold lowercase tracking-[-0.02em] backdrop-blur-[5px]";

export default function Hero() {
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative mt-20 h-847 r-30 max-lg:mt-16 max-lg:h-[min(78svh,640px)] max-lg:rounded-[20px]"
    >
      <div className="absolute inset-0 overflow-hidden r-30 max-lg:rounded-[20px]">
        <Image
          src={heroArt}
          alt="Chainsaw Man key art: Denji in chainsaw form leaping across a city street"
          fill
          preload
          fetchPriority="high"
          quality={90}
          placeholder="blur"
          sizes={designSizes(1825)}
          className="object-cover object-[50%_29%] max-lg:object-[62%_50%]"
        />
        {/* Mobile only: the full-bleed art needs a scrim for legible copy. */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent lg:hidden" />
      </div>

      <div className="absolute left-79 top-549 w-567 max-lg:inset-x-20 max-lg:bottom-28 max-lg:top-auto max-lg:w-auto">
        <h1 className="fs-36 font-extrabold leading-[1.25] tracking-[-0.02em] max-lg:text-[28px]">
          Chainsaw Man
        </h1>
        <p className="mt-10 line-clamp-3 fs-12 leading-[1.26] max-lg:text-[13px]">
          Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father
          left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil
          corpses with...
        </p>

        <ul className="mt-20 flex items-center gap-4" aria-label="Details">
          <li className={`${chip} w-89 justify-center`}>
            <Image src={clock} alt="" className="size-11" />
            24 mins
          </li>
          <li className={`${chip} w-54 justify-center gap-5`}>
            <Image src={cc} alt="" className="h-11 w-13" />
            <span>
              12<span className="sr-only"> subtitled episodes</span>
            </span>
          </li>
          <li className={`${chip} w-70 justify-center bg-[rgba(238,191,23,0.2)] text-gold`}>
            <Image src={star} alt="" className="h-13 w-14" />
            87%
          </li>
        </ul>

        <div className="mt-17 flex items-center gap-10">
          <a
            href="#"
            className="gradient-ring relative flex h-51 w-155 items-center gap-13 rounded-full bg-lime/20 pl-24 font-inter fs-18 font-semibold tracking-[-0.02em] backdrop-blur-[15px] transition-colors hover:bg-lime/30"
          >
            <Image src={play} alt="" className="h-17 w-15" />
            Play Now
          </a>
          <a
            href="#"
            className="flex h-50 w-138 items-center justify-center gap-8 rounded-full bg-white/10 font-inter fs-18 font-semibold tracking-[-0.02em] backdrop-blur-[15px] transition-colors hover:bg-white/20"
          >
            <Image src={info} alt="" className="size-17" />
            Details
          </a>
          <button
            type="button"
            aria-label="Add Chainsaw Man to your list"
            className="rounded-full backdrop-blur-[15px] transition-transform hover:scale-105"
          >
            <Image src={plus} alt="" className="size-50" />
          </button>
        </div>
      </div>

      {/* Slide pager: sits on the hero's bottom edge; the active dash fills as an autoplay timer. */}
      <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-6 max-lg:bottom-10" aria-hidden>
        {Array.from({ length: SLIDES }, (_, i) => (
          <span key={i} className="relative h-4 w-49 overflow-hidden rounded-full bg-lime/20 max-lg:w-24">
            {i === ACTIVE && (
              <span className="absolute inset-0 origin-left animate-[pager-fill_6s_linear_infinite] rounded-full bg-lime" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
