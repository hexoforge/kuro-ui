import Image from "next/image";
import Link from "next/link";
import crumbChevron from "@/assets/details/crumb-chevron.svg";
import logo from "@/assets/icons/logo-kuro.svg";
import home from "@/assets/icons/nav-home.svg";
import calendar from "@/assets/icons/nav-calendar.svg";
import tv from "@/assets/icons/icon-tv.svg";
import movies from "@/assets/icons/icon-movies.svg";
import swapA from "@/assets/icons/nav-swap-a.svg";
import swapB from "@/assets/icons/nav-swap-b.svg";
import shuffle from "@/assets/icons/icon-shuffle.svg";
import search from "@/assets/icons/icon-search.svg";
import bell from "@/assets/icons/nav-bell.svg";
import shop from "@/assets/icons/nav-shop.svg";
import avatar from "@/assets/icons/nav-avatar.svg";

const circleBase = "slash-hover grid shrink-0 place-items-center rounded-full bg-surface hover:bg-[#1c1c1c]";
const circle = `${circleBase} size-38`;

/**
 * Site header. On inner pages pass `crumb` (e.g. the anime title) to swap the Anime/Movies
 * toggle for a breadcrumb pill, as in the Figma Details page.
 */
export default function Nav({ crumb }: { crumb?: string }) {
  return (
    <header className="relative flex h-38 items-center justify-between max-lg:h-44">
      {/* Left cluster */}
      <div className="flex items-center">
        <Link
          href="/"
          aria-label="Kuro home"
          className="slash-hover grid h-38 w-64 place-items-center rounded-full bg-surface max-lg:h-44 max-lg:w-72"
        >
          <Image src={logo} alt="" className="h-8 w-26 max-lg:h-10 max-lg:w-32" />
        </Link>

        {crumb ? (
          <nav aria-label="Breadcrumb" className="ml-20 flex items-center gap-10 max-lg:hidden">
            <ol className="slash-hover flex h-38 items-center gap-6 rounded-full bg-lime/10 pl-15 pr-14">
              <li className="flex items-center gap-6">
                <Link href="/" aria-label="Home">
                  <Image src={home} alt="" className="size-14" />
                </Link>
                <Image src={crumbChevron} alt="" className="h-6 w-4" />
              </li>
              <li aria-current="page" className="max-w-160 truncate fs-10 text-lime/70">
                {crumb}
              </li>
            </ol>
            <Link href="/#releasing" aria-label="Releasing today" className={circle}>
              <Image src={calendar} alt="" className="h-14 w-16" />
            </Link>
          </nav>
        ) : (
          <>
            <nav aria-label="Primary" className="ml-20 flex items-center gap-10 max-lg:hidden">
              <Link href="/" aria-label="Home" aria-current="page" className={circle}>
                <Image src={home} alt="" className="size-14" />
              </Link>
              <Link href="/#releasing" aria-label="Releasing today" className={circle}>
                <Image src={calendar} alt="" className="h-14 w-16" />
              </Link>
            </nav>

            <div role="group" aria-label="Content type" className="ml-20 flex items-center gap-8 max-lg:hidden">
              <Link
                href="/"
                aria-current="page"
                className="slash-hover flex h-30 w-87 items-center gap-5 rounded-full border border-lime bg-lime/20 pl-15 font-inter fs-13 font-bold tracking-[-0.02em] text-lime backdrop-blur-[5px]"
              >
                <Image src={tv} alt="" className="size-12" />
                Anime
              </Link>
              <span aria-hidden className="relative h-30 w-15">
                <Image src={swapA} alt="" className="absolute left-6 top-8 h-7.5 w-8.75" />
                <Image src={swapB} alt="" className="absolute left-0 top-14 h-7.5 w-8.75" />
              </span>
              <Link
                href="/"
                className="slash-hover flex h-30 w-91 items-center gap-5 rounded-full bg-surface pl-15 font-inter fs-13 font-bold tracking-[-0.02em] text-muted backdrop-blur-[5px] hover:text-white/70"
              >
                <Image src={movies} alt="" className="h-12 w-11" />
                Movies
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Center search — absolutely centred on the frame like the design */}
      <form
        role="search"
        action="/"
        className="absolute left-1/2 top-0 flex h-38 w-462 -translate-x-1/2 items-center gap-10 max-lg:hidden"
      >
        <Link href="/" aria-label="Random anime" className={circle}>
          <Image src={shuffle} alt="" className="h-13 w-15" />
        </Link>
        <label className="relative h-38 flex-1">
          <span className="sr-only">Search anime</span>
          <input
            type="search"
            name="q"
            placeholder="Search"
            className="size-full rounded-full bg-surface px-20 text-center font-inter fs-13 font-semibold text-white outline-none placeholder:text-white/50 focus-visible:outline-2 focus-visible:outline-lime"
          />
        </label>
        <Link href="/" aria-label="Search" className={circle}>
          <Image src={search} alt="" className="size-15" />
        </Link>
      </form>

      {/* Right cluster */}
      <div className="flex items-center gap-5 max-lg:gap-8">
        <Link href="/" aria-label="Search" className={`${circleBase} size-44 lg:hidden`}>
          <Image src={search} alt="" className="size-16" />
        </Link>
        <Link href="/" aria-label="Notifications" className={`${circleBase} size-38 max-lg:size-44`}>
          <Image src={bell} alt="" className="h-14 w-12" />
        </Link>
        <Link href="/" aria-label="Merch store" className={`${circleBase} size-40 max-lg:hidden`}>
          <Image src={shop} alt="" className="h-14 w-15.5" />
        </Link>
        <Link
          href="/"
          aria-label="Account"
          className="slash-hover grid size-40 shrink-0 place-items-center rounded-full bg-lime/10 hover:bg-lime/20 max-lg:size-44"
        >
          <Image src={avatar} alt="" className="size-16" />
        </Link>
      </div>
    </header>
  );
}
