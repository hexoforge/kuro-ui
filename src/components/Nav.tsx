import Image from "next/image";
import logo from "@/assets/icons/logo-kuro.svg";
import home from "@/assets/icons/nav-icon-a.svg";
import calendar from "@/assets/icons/nav-icon-b.svg";
import tv from "@/assets/icons/icon-tv.svg";
import movies from "@/assets/icons/icon-movies.svg";
import swapA from "@/assets/icons/nav-swap-a.svg";
import swapB from "@/assets/icons/nav-swap-b.svg";
import shuffle from "@/assets/icons/icon-shuffle.svg";
import search from "@/assets/icons/icon-search.svg";
import notify from "@/assets/icons/icon-shuffle-group74.svg";
import bell from "@/assets/icons/icon-bell-group72.svg";
import avatar from "@/assets/icons/icon-avatar.svg";

const circle =
  "grid size-38 shrink-0 place-items-center rounded-full bg-surface transition-colors hover:bg-[#1c1c1c]";

export default function Nav() {
  return (
    <header className="relative flex h-38 items-center justify-between max-lg:h-44">
      {/* Left cluster */}
      <div className="flex items-center">
        <a
          href="#"
          aria-label="Kuro home"
          className="grid h-38 w-64 place-items-center rounded-full bg-surface max-lg:h-44 max-lg:w-72"
        >
          <Image src={logo} alt="" className="h-8 w-26 max-lg:h-10 max-lg:w-32" />
        </a>

        <nav aria-label="Primary" className="ml-20 flex items-center gap-10 max-lg:hidden">
          <a href="#" aria-label="Home" aria-current="page" className={circle}>
            <Image src={home} alt="" className="h-18 w-16" />
          </a>
          <a href="#releasing" aria-label="Releasing today" className={circle}>
            <Image src={calendar} alt="" className="h-18 w-20" />
          </a>
        </nav>

        <div role="group" aria-label="Content type" className="ml-20 flex items-center max-lg:hidden">
          <button
            type="button"
            aria-pressed="true"
            className="flex h-30 w-87 items-center gap-5 rounded-full border border-lime bg-lime/20 pl-15 font-inter fs-13 font-bold tracking-[-0.02em] text-lime backdrop-blur-[5px]"
          >
            <Image src={tv} alt="" className="size-12" />
            Anime
          </button>
          <span aria-hidden className="relative h-30 w-15">
            <Image src={swapA} alt="" className="absolute left-6 top-8 h-7.5 w-8.75" />
            <Image src={swapB} alt="" className="absolute left-0 top-14 h-7.5 w-8.75" />
          </span>
          <button
            type="button"
            aria-pressed="false"
            className="flex h-30 w-91 items-center gap-5 rounded-full bg-surface pl-15 font-inter fs-13 font-bold tracking-[-0.02em] text-muted backdrop-blur-[5px] transition-colors hover:text-white/70"
          >
            <Image src={movies} alt="" className="h-12 w-11" />
            Movies
          </button>
        </div>
      </div>

      {/* Center search — absolutely centred on the frame like the design */}
      <form
        role="search"
        action="#"
        className="absolute left-1/2 top-0 flex h-38 w-462 -translate-x-1/2 items-center gap-10 max-lg:hidden"
      >
        <button type="button" aria-label="Random anime" className={circle}>
          <Image src={shuffle} alt="" className="h-13 w-15" />
        </button>
        <label className="relative h-38 flex-1">
          <span className="sr-only">Search anime</span>
          <input
            type="search"
            placeholder="Search"
            className="size-full rounded-full bg-surface px-20 text-center font-inter fs-13 font-semibold text-white outline-none placeholder:text-white/50 focus-visible:outline-2 focus-visible:outline-lime"
          />
        </label>
        <button type="submit" aria-label="Search" className={circle}>
          <Image src={search} alt="" className="size-15" />
        </button>
      </form>

      {/* Right cluster */}
      <div className="flex items-center gap-5 max-lg:gap-8">
        <button type="button" aria-label="Search" className={`${circle} lg:hidden max-lg:size-44`}>
          <Image src={search} alt="" className="size-16" />
        </button>
        <button type="button" aria-label="Watch together" className="max-lg:hidden">
          <Image src={notify} alt="" className="size-38" />
        </button>
        <button type="button" aria-label="Notifications">
          <Image src={bell} alt="" className="size-40 max-lg:size-44" />
        </button>
        <button type="button" aria-label="Account">
          <Image src={avatar} alt="" className="h-38 w-39 max-lg:h-44 max-lg:w-45" />
        </button>
      </div>
    </header>
  );
}
