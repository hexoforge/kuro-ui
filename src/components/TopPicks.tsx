import Image, { type StaticImageData } from "next/image";
import { designSizes } from "@/lib/sizes";
import viewMoreArrow from "@/assets/icons/icon-view-more-arrow.svg";
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
import rezero from "@/assets/img/cw-rezero.png";
import goblin from "@/assets/img/poster-goblin.png";
import mage from "@/assets/img/poster-laid-off-mage.png";
import wotakoi from "@/assets/img/carousel-center-wotakoi.png";
import eminence from "@/assets/img/cw-eminence.png";

type TileProps = {
  img: StaticImageData;
  /** Visible title; omitted where the Figma tile is image-only. */
  title?: string;
  label: string;
  /** Desktop size in Figma px. */
  w: number;
  h: number;
  position?: string;
  scrim?: string;
  titleClassName?: string;
};

function Tile({ img, title, label, w, h, position = "50% 50%", scrim = "to-black/50", titleClassName = "inset-x-20 bottom-20 fs-18" }: TileProps) {
  return (
    <a
      href="#"
      aria-label={title ? undefined : label}
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
      {title && (
        <h3 className={`absolute font-bold leading-[1.26] max-lg:inset-x-12 max-lg:bottom-12 max-lg:text-[14px] ${titleClassName}`}>
          {title}
        </h3>
      )}
    </a>
  );
}

function PanelHeader({ id, title, className = "" }: { id: string; title: string; className?: string }) {
  return (
    <div className={`flex h-50 items-center justify-between max-lg:h-40 ${className}`}>
      <h2
        id={id}
        className="inline-flex h-50 items-center rounded-full bg-white/10 px-33 fs-14 font-bold tracking-[-0.02em] backdrop-blur-[15px] max-lg:h-40 max-lg:px-20"
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

export default function TopPicks() {
  return (
    <div className="-ml-5 mt-67 flex gap-12 max-lg:ml-0 max-lg:mt-48 max-lg:flex-col max-lg:gap-40">
      {/* Left column: two Top Airing panels */}
      <div className="flex w-935 shrink-0 flex-col gap-10 max-lg:w-full">
        <section aria-labelledby="top-airing" className="flex flex-col gap-10">
          <PanelHeader id="top-airing" title="Top Airing" className="ml-23 mr-20 max-lg:mx-0" />
          <div className={`${panel} flex h-502 gap-10 pb-20 pl-23 pr-20 pt-20 max-lg:h-auto`}>
            <Tile img={onePiece} title="ONE PIECE" label="ONE PIECE" w={318} h={462} />
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={bleach} title="BLEACH: Thousand-Year Blood War" label="BLEACH" w={234} h={226} />
              <Tile img={blackClover} title="Black Clover Season 2" label="Black Clover" w={234} h={226} />
            </div>
            <Tile img={apothecary} title="The Apothecary Diaries" label="The Apothecary Diaries" w={320} h={462} />
          </div>
        </section>

        <section aria-labelledby="top-airing-2" className="flex flex-col gap-10">
          <PanelHeader id="top-airing-2" title="Top Airing" className="ml-23 mr-20 max-lg:mx-0" />
          {/* Tiles are grey placeholders in Figma; filled with existing artwork for the showcase. */}
          <div className={`${panel} flex h-469 gap-10 pb-20 pl-20 pr-20 pt-18 max-lg:h-auto`}>
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={rezero} title="Re:Zero" label="Re:Zero" w={532} h={201} position="50% 22%" />
              <div className="flex gap-10 max-lg:contents">
                <Tile img={goblin} title="Reborn as a Goblin" label="Reborn as a Goblin" w={272} h={220} />
                <Tile img={mage} title="Laid-Off Cheat Mage" label="Laid-Off Cheat Mage" w={250} h={220} />
              </div>
            </div>
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={wotakoi} title="Wotakoi: Love is Hard for Otaku" label="Wotakoi" w={353} h={288} />
              <Tile img={eminence} title="Eminence in Shadow" label="Eminence in Shadow" w={353} h={133} position="50% 30%" />
            </div>
          </div>
        </section>
      </div>

      {/* Right column: Most Popular */}
      <section aria-labelledby="most-popular" className="flex w-883 shrink-0 flex-col max-lg:w-full">
        <PanelHeader id="most-popular" title="Most Popular" className="mr-20 max-lg:mr-0" />
        <div className={`${panel} mt-10 flex h-1039 flex-col gap-10 p-20 max-lg:mt-10 max-lg:h-auto`}>
          <div className="flex gap-10 max-lg:contents">
            <Tile
              img={deathNote}
              title="Death Note"
              label="Death Note"
              w={536}
              h={396}
              scrim="to-black/80"
              titleClassName="left-30 top-290 fs-24 max-lg:top-auto"
            />
            <Tile img={aot} label="Attack on Titan" w={297} h={396} scrim="to-black/80" position="50% 50%" />
          </div>
          <div className="flex gap-10 max-lg:contents">
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={jjk} label="Jujutsu Kaisen" w={416} h={364} scrim="to-black/80" position="50% 0%" />
              <Tile img={tokyoGhoul} label="Tokyo Ghoul" w={416} h={219} scrim="to-black/80" position="50% 14.5%" />
            </div>
            <div className="flex flex-col gap-10 max-lg:contents">
              <Tile img={fma} label="Fullmetal Alchemist: Brotherhood" w={417} h={246} scrim="to-black/80" position="50% 36.7%" />
              <div className="flex gap-10 max-lg:contents">
                <Tile img={hxh} label="Hunter x Hunter" w={204} h={337} scrim="to-black/80" position="50% 50%" />
                <Tile img={naruto} label="Naruto" w={203} h={337} scrim="to-black/80" position="50% 50%" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
