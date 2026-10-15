import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { designSizes } from "@/lib/sizes";
import viewMoreArrow from "@/assets/icons/icon-view-more-arrow.svg";
import star from "@/assets/icons/icon-star-sm2.svg";
import onePiece from "@/assets/img/top-onepiece.png";
import bleach from "@/assets/img/top-bleach.png";
import blackClover from "@/assets/img/poster-black-clover.png";
import apothecary from "@/assets/img/top-apothecary.png";
import deathNote from "@/assets/img/popular-deathnote.png";
import aot from "@/assets/img/cw-aot.png";
import jjk from "@/assets/img/popular-jjk.png";
import fma from "@/assets/img/popular-fma.png";
import hxh from "@/assets/img/popular-hxh.png";
import naruto from "@/assets/img/popular-naruto.png";
import tokyoGhoul from "@/assets/img/popular-tokyo-ghoul.png";
import aoAshi from "@/assets/img/new-aoashi.png";
import witch from "@/assets/img/new-witch-love-potion.png";
import goblin from "@/assets/img/poster-goblin.png";
import mage from "@/assets/img/poster-laid-off-mage.png";
import eminence from "@/assets/img/cw-eminence.png";

type TileProps = {
  img: StaticImageData;
  title: string;
  /** Desktop size in Figma px. */
  w: number;
  h: number;
  position?: string;
  scrim?: string;
  /** Image-only tile in Figma: the title stays for screen readers only. */
  hideTitle?: boolean;
  /** Gold score badge above the title (Top Airing). */
  score?: string;
  titleClassName?: string;
  href?: string;
};

function Tile({ img, title, w, h, position = "50% 50%", scrim = "to-black/50", score, hideTitle, titleClassName = "fs-18", href = "#" }: TileProps) {
  return (
    <Link
      href={href}
      className="group relative isolate block shrink-0 overflow-hidden r-20 max-lg:aspect-[3/4] max-lg:h-auto! max-lg:w-auto! max-lg:rounded-[14px]"
      style={{ width: `calc(${w} * var(--spacing))`, height: `calc(${h} * var(--spacing))` }}
    >
      <Image
        src={img}
        alt=""
        fill
        placeholder="blur"
        sizes={designSizes(w, "50vw")}
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ objectPosition: position }}
      />
      <div className={`absolute inset-0 -z-10 bg-linear-to-b from-transparent ${scrim}`} />
      <div className={hideTitle ? "sr-only" : "absolute inset-x-20 bottom-20 max-lg:inset-x-12 max-lg:bottom-12"}>
        {score && (
          <span className="mb-3 flex items-center gap-3 font-inter fs-8 font-bold text-gold">
            <Image src={star} alt="" className="size-8" />
            {score}
            <span className="sr-only"> rating</span>
          </span>
        )}
        <h3 className={`font-bold leading-[1.26] max-lg:text-[14px] ${titleClassName}`}>{title}</h3>
      </div>
    </Link>
  );
}

function PanelHeader({ id, title, className = "", tabClassName = "px-30" }: { id: string; title: string; className?: string; tabClassName?: string }) {
  return (
    <div className={`flex h-50 items-center justify-between max-lg:h-40 ${className}`}>
      <h2
        id={id}
        className={`inline-flex h-50 items-center rounded-full bg-white/10 fs-14 font-bold tracking-[-0.02em] backdrop-blur-[15px] max-lg:h-40 max-lg:px-20 ${tabClassName}`}
      >
        {title}
      </h2>
      <a href="#" className="flex items-center gap-5 font-outfit fs-10 font-bold transition-colors hover:text-lime">
        View More
        <Image src={viewMoreArrow} alt="" className="size-7" />
      </a>
    </div>
  );
}

const panel = "r-20 bg-surface max-lg:grid max-lg:grid-cols-2 max-lg:gap-8 max-lg:rounded-[18px] max-lg:p-10";
// New on Kuro tiles stack two gradients in Figma (→ .8 and → .5), which composite to ~.9 at the bottom.
const deepScrim = "to-black/90";

export default function TopPicks() {
  return (
    <div className="-ml-5 mt-69 flex gap-12 max-lg:ml-0 max-lg:mt-48 max-lg:flex-col max-lg:gap-40">
      {/* Left column: New on Kuro above Top Airing */}
      <div className="flex w-935 shrink-0 flex-col gap-18 max-lg:w-full max-lg:gap-40">
        <section aria-labelledby="new-on-kuro" className="flex flex-col gap-10">
          <PanelHeader id="new-on-kuro" title="New on Kuro" className="mr-20 max-lg:mr-0" />
          <div className={`${panel} flex h-469 gap-10 pb-20 pl-20 pr-20 pt-18 max-lg:h-auto`}>
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={aoAshi} title="Aoshi 2nd Season" w={532} h={201} scrim={deepScrim} position="50% 30%" />
              <div className="flex gap-10 max-lg:contents">
                {/* The next three tiles are grey placeholders in Figma; filled with existing art for the showcase. */}
                <Tile img={goblin} title="Reborn as a Goblin" w={272} h={220} scrim={deepScrim} />
                <Tile img={mage} title="Laid-Off Cheat Mage" w={250} h={220} scrim={deepScrim} />
              </div>
            </div>
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile
                img={witch}
                title="Hello, I am a Witch and my Crush Wants me to Make a Love Potion!"
                w={353}
                h={288}
                scrim={deepScrim}
                position="50% 34.4%"
              />
              <Tile img={eminence} title="Eminence in Shadow" w={353} h={133} scrim={deepScrim} position="50% 30%" />
            </div>
          </div>
        </section>

        <section aria-labelledby="top-airing" className="flex flex-col gap-10">
          <PanelHeader id="top-airing" title="Top Airing" className="mr-20 max-lg:mr-0" />
          <div className={`${panel} flex h-492 gap-10 pb-20 pl-23 pr-20 pt-20 max-lg:h-auto`}>
            <Tile img={onePiece} title="ONE PIECE" score="88%" w={318} h={452} />
            <div className="flex flex-col gap-4 max-lg:contents">
              <Tile img={bleach} title="BLEACH: Thousand-Year Blood War" score="91%" w={234} h={226} />
              <Tile img={blackClover} title="Black Clover Season 2" score="82%" href="/anime/black-clover" w={234} h={222} />
            </div>
            <Tile img={apothecary} title="The Apothecary Diaries" score="93%" w={320} h={452} />
          </div>
        </section>
      </div>

      {/* Right column: Most Popular */}
      <section aria-labelledby="most-popular" className="flex w-883 shrink-0 flex-col max-lg:w-full">
        <PanelHeader id="most-popular" title="Most Popular" className="mr-20 max-lg:mr-0" tabClassName="px-33" />
        <div className={`${panel} mt-10 flex h-1039 flex-col gap-10 p-20 max-lg:mt-10 max-lg:h-auto`}>
          <div className="flex gap-10 max-lg:contents">
            <Tile img={deathNote} title="Death Note" w={536} h={396} scrim="to-black/80" />
            <Tile img={aot} title="Attack on Titan" w={297} h={396} scrim="to-black/80" />
          </div>
          <div className="flex gap-10 max-lg:contents">
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={jjk} title="Jujutsu Kaisen" w={416} h={364} scrim="to-black/80" position="50% 0%" />
              <Tile img={tokyoGhoul} title="Tokyo Ghoul" w={416} h={219} scrim="to-black/80" position="50% 14.5%" />
            </div>
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={fma} title="Fullmetal Alchemist: Brotherhood" hideTitle w={417} h={246} scrim="to-black/80" position="50% 36.7%" />
              <div className="flex gap-10 max-lg:contents">
                <Tile img={hxh} title="Hunter x Hunter" w={204} h={337} scrim="to-black/80" />
                <Tile img={naruto} title="Naruto" w={203} h={337} scrim="to-black/80" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
