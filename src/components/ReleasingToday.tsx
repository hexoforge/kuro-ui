import Image, { type StaticImageData } from "next/image";
import { designSizes } from "@/lib/sizes";
import headerIcon from "@/assets/icons/icon-release-header.svg";
import viewMoreArrow from "@/assets/icons/icon-view-more-arrow.svg";
import dot from "@/assets/icons/icon-popular-dot.svg";
import hourglass from "@/assets/icons/icon-clock-sm.svg";
import hourglassSm from "@/assets/icons/icon-clock-sm2.svg";
import star from "@/assets/icons/icon-star-sm.svg";
import starSm from "@/assets/icons/icon-star-sm2.svg";
import cc from "@/assets/icons/icon-cc-sm.svg";
import runtime from "@/assets/icons/release-chip-group7.svg";
import runtimeSm from "@/assets/icons/release-chip-group8.svg";
import ccChipSm from "@/assets/icons/release-chip-group132.svg";
import apothecaryBg from "@/assets/img/release-apothecary-bg.png";
import apothecaryPoster from "@/assets/img/top-apothecary.png";
import fireflyPoster from "@/assets/img/release-firefly-poster.png";
import tokyoPoster from "@/assets/img/release-tokyorev-poster.png";

type Release = {
  title: string;
  synopsis: string;
  airsIn: string;
  ep: string;
  subs: number;
  score: string;
  poster: StaticImageData;
  /** Large cards sit on a blurred backdrop; compact cards are plain panels. */
  bg?: StaticImageData;
  /** Figma crops Firefly Wedding's poster to a zoomed detail instead of a plain cover fit. */
  zoomCrop?: boolean;
};

const RELEASES: Release[] = [
  {
    title: "The Apothecary Diaries Season 3",
    synopsis:
      "In the aftermath of the Shi Clan’s rebellion, things have finally settled down, and Maomao has returned to her old life as a pharmacist in the pleasure district. One day, triggered by a breakfast....",
    airsIn: "2h 4m",
    ep: "EP 03",
    subs: 10,
    score: "93%",
    poster: apothecaryPoster,
    bg: apothecaryBg,
  },
  {
    title: "Firefly Wedding",
    synopsis:
      "On the surface, Satoko has it all—she’s beautiful, the daughter of a nobleman, and at a prime age for marriage. Unfortunately, she is also quite ill and only has a short time left to live....",
    airsIn: "4h 20m",
    ep: "EP 02",
    subs: 10,
    score: "87%",
    poster: fireflyPoster,
    zoomCrop: true,
  },
  {
    title: "Tokyo Revengers: War of Three Titans Arc",
    synopsis: "Sequel to Tokyo Revengers: Tenjiku-hen.",
    airsIn: "5h 40m",
    ep: "EP 02",
    subs: 10,
    score: "87%",
    poster: tokyoPoster,
  },
];

const glass = "flex items-center bg-[rgba(44,44,44,0.52)] backdrop-blur-[5px]";

function LargeCard({ r }: { r: Release }) {
  return (
    <a href="#" className="group relative isolate flex h-209 overflow-hidden r-20 p-20 max-lg:h-auto max-lg:rounded-[16px] max-lg:p-14">
      {r.bg && (
        <Image
          src={r.bg}
          alt=""
          fill
          placeholder="blur"
          sizes={designSizes(478)}
          className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[5px]" />

      <div className="relative h-169 w-123 shrink-0 overflow-hidden rounded-[calc(10*var(--spacing))] max-lg:h-142 max-lg:w-104 max-lg:rounded-[10px]">
        <Image src={r.poster} alt="" fill placeholder="blur" sizes={designSizes(123, "104px")} className="object-cover" />
      </div>

      <div className="ml-13 flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className={`${glass} h-23 gap-5 rounded-[calc(5*var(--spacing))] px-10 fs-10 font-bold`}>
            <Image src={hourglass} alt="" className="h-11 w-8" />
            <span>
              <span className="sr-only">Airs in </span>
              {r.airsIn}
            </span>
          </span>
          <span className={`${glass} h-23 gap-5 rounded-full px-10 fs-9 font-bold`}>
            <Image src={dot} alt="" className="size-5" />
            Popular
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="line-clamp-2 fs-20 font-bold leading-[1.26] max-lg:text-[16px]">{r.title}</h3>
          <p className="mt-5 line-clamp-3 font-outfit fs-10 leading-[1.26] max-lg:line-clamp-2">{r.synopsis}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5 font-inter font-bold">
            <span className={`${glass} h-23 w-67 justify-center rounded-full`}>
              <Image src={runtime} alt="24 mins" className="h-8.25 w-47" />
            </span>
            <span className="grid h-23 w-50 place-items-center rounded-[calc(11.5*var(--spacing))] bg-[rgba(44,44,44,0.5)] fs-8 backdrop-blur-[5px]">
              {r.ep}
            </span>
            <span className={`${glass} h-23 w-41 gap-2 rounded-full pl-9 fs-9`}>
              <Image src={cc} alt="" className="h-9 w-10" />
              {r.subs}
              <span className="sr-only"> subtitled episodes</span>
            </span>
            <span className="flex h-23 w-54 items-center gap-1.5 rounded-full bg-gold/20 pl-11 fs-9 lowercase text-gold backdrop-blur-[5px]">
              <Image src={star} alt="" className="h-10 w-10.75" />
              {r.score}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function CompactCard({ r }: { r: Release }) {
  return (
    <a href="#" className="group mx-20 flex h-182 r-20 bg-surface p-20 transition-colors hover:bg-[#181818] max-lg:mx-0 max-lg:h-auto max-lg:rounded-[16px] max-lg:p-14">
      <div className="relative h-142 w-112 shrink-0 overflow-hidden rounded-[calc(10*var(--spacing))] max-lg:w-104 max-lg:rounded-[10px]">
        {r.zoomCrop ? (
          // 208% × 230% of the frame, shifted up 81% — the exact Figma crop.
          <Image
            src={r.poster}
            alt=""
            placeholder="blur"
            sizes={designSizes(233, "216px")}
            className="absolute left-[0.18%] top-[-81%] h-[230.15%] w-[207.95%] max-w-none"
          />
        ) : (
          <Image src={r.poster} alt="" fill placeholder="blur" sizes={designSizes(112, "104px")} className="object-cover" />
        )}
      </div>

      <div className="ml-9 flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className={`${glass} h-21 gap-5 rounded-[calc(5*var(--spacing))] px-10 fs-8 font-bold`}>
            <Image src={hourglassSm} alt="" className="h-10 w-7" />
            <span>
              <span className="sr-only">Airs in </span>
              {r.airsIn}
            </span>
          </span>
          <span className={`${glass} h-21 gap-3 rounded-full px-10 fs-8 font-bold`}>
            <Image src={dot} alt="" className="size-5" />
            Popular
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="line-clamp-2 fs-18 font-bold leading-[1.26] max-lg:text-[16px]">{r.title}</h3>
          <p className="mt-4 line-clamp-3 font-outfit fs-9 leading-[1.3] max-lg:line-clamp-2">{r.synopsis}</p>
          <div className="mt-10 flex flex-wrap items-center gap-5 font-inter font-bold">
            <span className={`${glass} h-21 w-67 justify-center rounded-full`}>
              <Image src={runtimeSm} alt="24 mins" className="h-9 w-47" />
            </span>
            <span className="grid h-22 w-46 place-items-center rounded-[calc(11.5*var(--spacing))] bg-[rgba(44,44,44,0.5)] fs-8 backdrop-blur-[5px]">
              {r.ep}
            </span>
            <Image src={ccChipSm} alt={`${r.subs} subtitled episodes`} className="h-22 w-38" />
            <span className="flex h-21 w-52 items-center gap-2 rounded-full bg-gold/20 pl-10 fs-8 lowercase text-gold backdrop-blur-[5px]">
              <Image src={starSm} alt="" className="size-10" />
              {r.score}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function ReleasingHeader() {
  return (
    <div className="flex h-30 items-center pl-19 pr-20 max-lg:px-0">
      <Image src={headerIcon} alt="" className="h-30 w-33 max-lg:h-22 max-lg:w-24" />
      <h2 id="releasing-heading" className="ml-20 fs-20 font-bold max-lg:ml-12 max-lg:text-[18px]">
        Top Anime Releasing Today
      </h2>
      <a href="#" className="ml-auto flex items-center gap-5 font-outfit fs-10 font-bold transition-colors hover:text-lime">
        View More
        <Image src={viewMoreArrow} alt="" className="size-7" />
      </a>
    </div>
  );
}

export default function ReleasingToday() {
  const [first, ...rest] = RELEASES;
  return (
    <ul className="flex h-673 flex-col justify-between max-lg:h-auto max-lg:gap-12">
      <li>
        <LargeCard r={first} />
      </li>
      {rest.map((r) => (
        <li key={r.title}>
          <CompactCard r={r} />
        </li>
      ))}
    </ul>
  );
}
