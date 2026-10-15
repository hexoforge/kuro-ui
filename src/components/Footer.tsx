import Image from "next/image";
import { designSizes } from "@/lib/sizes";
import QuoteBand, { type Quote } from "@/components/QuoteBand";
import banner from "@/assets/img/footer-banner.png";
import mascot from "@/assets/img/footer-mascot.png";
import wordmark from "@/assets/icons/footer-kuro-wordmark.svg";

const DISCOVERY = ["This Season", "Upcoming Season", "Airing Schedule", "Movies", "TV Series"];
const SUPPORT = ["Request Anime", "Upcoming Season", "Airing Schedule", "DMCA"];

/*
 * Figma group 236 (y4035–5032), full-bleed, so the footer breaks out of the page gutters.
 * The quote band sits in flow and grows to two lines when a quote needs it; everything below it
 * (banner, wordmark, glass panel) lives in a block 40 below the band, at the Figma offsets from
 * the banner's top (the band's 199 + 40 = the 239 the frame used).
 */
export default function Footer({ quotes }: { quotes?: Quote[] }) {
  return (
    <footer className="relative -ml-50 -mr-45 mt-50 max-lg:-mx-16 max-lg:mt-56">
      {/* Quote band — 2px lime border, bleeding 2px past both edges so only top/bottom show. */}
      <QuoteBand quotes={quotes} />

      <div className="relative mt-40 h-693 max-lg:mt-24 max-lg:h-auto">
        {/* Banner art */}
        <div className="absolute left-60 top-0 h-633 w-1800 overflow-hidden r-40 max-lg:relative max-lg:inset-auto max-lg:mx-16 max-lg:aspect-[16/10] max-lg:h-auto max-lg:w-auto max-lg:rounded-[24px]">
          <Image
            src={banner}
            alt=""
            fill
            placeholder="blur"
            sizes={designSizes(1800)}
            className="object-cover object-[50%_33.8%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 to-transparent" />
        </div>

        {/* Oversized outlined wordmark, black at 20%, spilling off the banner's lower-left. */}
        <div aria-hidden className="pointer-events-none absolute left-12 top-345 h-348 w-809 overflow-hidden max-lg:hidden">
          <Image src={wordmark} alt="" className="h-357 w-809 max-w-none" />
        </div>

        {/* Glass panel */}
        <div className="absolute left-932 top-40 h-344 w-888 r-27 bg-black/10 backdrop-blur-[15px] max-lg:relative max-lg:inset-auto max-lg:mx-16 max-lg:-mt-80 max-lg:h-auto max-lg:w-auto max-lg:rounded-[20px] max-lg:bg-black/40 max-lg:p-20">
          <p className="absolute left-40 top-40 font-sedgwick-display fs-50 leading-[normal] text-lime max-lg:static max-lg:text-[36px]">kuro</p>
          <p className="absolute left-40 top-117 w-279 font-outfit fs-14 leading-[normal] max-lg:static max-lg:mt-8 max-lg:w-auto">
            Kuro does not store any file on its server, all contents are provided by non-affiliated third parties.
          </p>

          <nav aria-label="Footer" className="contents max-lg:mt-24 max-lg:flex max-lg:gap-40">
            <div className="absolute left-504 top-53 max-lg:static">
              <h2 className="fs-12 font-bold leading-[normal]">DISCOVERY</h2>
              <ul className="mt-30 flex flex-col font-outfit fs-14 leading-[normal] [&>li]:h-38 max-lg:[&>li]:h-auto max-lg:mt-12 max-lg:gap-10">
                {DISCOVERY.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-lime">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute left-696 top-53 max-lg:static">
              <h2 className="fs-12 font-bold leading-[normal]">SUPPORT</h2>
              <ul className="mt-30 flex flex-col font-outfit fs-14 leading-[normal] [&>li]:h-38 max-lg:[&>li]:h-auto max-lg:mt-12 max-lg:gap-10">
                {SUPPORT.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-lime">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <p className="absolute left-40 top-286 fs-14 font-bold leading-[normal] max-lg:static max-lg:mt-24">
            © 2026 Kuro. All rights reserved.
          </p>
        </div>
      </div>

      {/* Mascot — mirrored, overlapping the quote band from above. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-65 left-83 h-535 w-490 -scale-x-100 overflow-hidden max-lg:hidden"
      >
        <Image
          src={mascot}
          alt=""
          sizes={designSizes(987)}
          className="absolute left-[-57.61%] top-[-3.02%] h-[103.02%] w-[201.46%] max-w-none"
        />
      </div>
    </footer>
  );
}
