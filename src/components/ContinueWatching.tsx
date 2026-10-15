import Image, { type StaticImageData } from "next/image";
import { designSizes } from "@/lib/sizes";
import ReleasingToday, { ReleasingHeader } from "@/components/ReleasingToday";
import playBar from "@/assets/icons/icon-cw-play-bar.svg";
import rezero from "@/assets/img/cw-rezero.png";
import eminence from "@/assets/img/cw-eminence.png";
import bleach from "@/assets/img/cw-bleach.png";
import aot from "@/assets/img/cw-aot.png";

type TileProps = {
  img: StaticImageData;
  title: string;
  /** Figma crops each still differently; keep the same focal point. */
  position: string;
  sizes: string;
  scrim: string;
  className: string;
  textClassName: string;
  synopsis?: string;
};

function Tile({ img, title, position, sizes, scrim, className, textClassName, synopsis }: TileProps) {
  return (
    <a
      href="#"
      className={`group relative isolate block overflow-hidden r-20 max-lg:rounded-[16px] ${className}`}
    >
      <Image
        src={img}
        alt=""
        fill
        placeholder="blur"
        sizes={sizes}
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
      <div className={`absolute inset-0 -z-10 bg-linear-to-b from-transparent ${scrim}`} />
      <div className={`absolute bottom-20 max-lg:inset-x-16 max-lg:bottom-16 max-lg:w-auto ${textClassName}`}>
        <h3 className="fs-24 font-extrabold leading-[1.25] tracking-[-0.02em] max-lg:text-[18px]">{title}</h3>
        {synopsis && (
          <p className="mt-13 line-clamp-3 fs-13 leading-[1.23] tracking-[-0.02em] max-lg:line-clamp-2">
            {synopsis}
          </p>
        )}
      </div>
    </a>
  );
}

export default function ContinueWatching() {
  return (
    <div className="mt-70 flex gap-30 max-lg:mt-48 max-lg:flex-col max-lg:gap-48">
      <section aria-labelledby="cw-heading" className="w-1314 shrink-0 max-lg:w-full">
        <h2 id="cw-heading" className="flex h-30 items-center gap-20 pl-4 fs-20 font-bold max-lg:gap-12 max-lg:pl-0 max-lg:text-[18px]">
          <Image src={playBar} alt="" className="h-26 w-30 max-lg:h-20 max-lg:w-23" />
          Continue Watching
        </h2>

        <div className="mt-32 flex h-673 gap-12 max-lg:mt-20 max-lg:h-auto max-lg:flex-col">
          <div className="flex w-871 shrink-0 flex-col gap-10 max-lg:w-full">
            <Tile
              img={rezero}
              title="RE:Zero - Starting Life in Another World"
              synopsis="In the story, Subaru Natsuki is an ordinary high school student who is lost in an alternate world, where he is rescued by a beautiful, silver-haired girl. He stays near her to return the..."
              position="50% 24%"
              sizes={designSizes(871)}
              scrim="to-black/80"
              className="h-447 max-lg:aspect-[871/447] max-lg:h-auto"
              textClassName="left-30 w-551"
            />
            <div className="flex h-216 gap-10 max-lg:h-auto">
              <Tile
                img={eminence}
                title="Eminence in Shadow"
                position="50% 31%"
                sizes={designSizes(431, "50vw")}
                scrim="to-black/70"
                className="w-431 max-lg:aspect-[4/3] max-lg:w-auto max-lg:flex-1"
                textClassName="left-20"
              />
              <Tile
                img={bleach}
                title="Bleach - Thousand Year Blood War"
                position="50% 84%"
                sizes={designSizes(430, "50vw")}
                scrim="to-black/80"
                className="w-430 max-lg:aspect-[4/3] max-lg:w-auto max-lg:flex-1"
                textClassName="left-20 w-390"
              />
            </div>
          </div>
          <Tile
            img={aot}
            title="Attack on Titan"
            position="50% 50%"
            sizes={designSizes(431)}
            scrim="to-black/80"
            className="w-431 max-lg:aspect-[16/10] max-lg:w-full"
            textClassName="left-40"
          />
        </div>
      </section>

      <section id="releasing" aria-labelledby="releasing-heading" className="w-478 shrink-0 max-lg:w-full">
        <ReleasingHeader />
        <div className="mt-32 max-lg:mt-20">
          <ReleasingToday />
        </div>
      </section>
    </div>
  );
}
