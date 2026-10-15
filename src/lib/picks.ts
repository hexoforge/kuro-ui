import type { StaticImageData } from "next/image";
import chainsaw from "@/assets/img/hero-chainsaw-man.jpg";
import tokyoRev from "@/assets/img/release-tokyorev-bg.png";
import wotakoi from "@/assets/img/carousel-center-wotakoi.png";
import apothecary from "@/assets/img/release-apothecary-bg.png";
import jjk from "@/assets/img/popular-jjk.png";

export type Pick = {
  title: string;
  synopsis: string;
  episodes: number;
  status: string;
  score: string;
  genres: string[];
  img: StaticImageData;
  position: string;
};

export const LANDING_PICKS: Pick[] = [
  {
    title: "Chainsaw Man",
    synopsis:
      "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt by harvesting devil corpses with Pochita. One day, Denji is betrayed and killed — and Pochita merges with his body to bring him back as Chainsaw Man....",
    episodes: 12,
    status: "Finished",
    score: "87%",
    genres: ["Action", "Horror", "Supernatural"],
    img: chainsaw,
    position: "50% 25%",
  },
  {
    title: "Tokyo Revengers",
    synopsis:
      "Takemichi Hanagaki learns that his middle-school girlfriend was killed by the Tokyo Manji Gang. Pushed in front of a train, he wakes up twelve years in the past — and gets one chance to change everything....",
    episodes: 24,
    status: "Finished",
    score: "84%",
    genres: ["Action", "Drama", "Time Travel"],
    img: tokyoRev,
    position: "50% 35%",
  },
  {
    title: "Wotakoi: Love is Hard for Otaku",
    synopsis:
      "Having slept through all four of her alarms, the energetic Narumi Momose finds herself running late for her first day of work at a new office. As she races to catch her train, she makes a promise to herself that none of her coworkers will find out about her dark secret: that she is an otaku and a fujoshi. Her plan goes instantly awry, though, when she runs into Hirotaka Nifuji, an old friend from middle school....",
    episodes: 12,
    status: "Finished",
    score: "78%",
    genres: ["Slice of Life", "Romance", "Comedy"],
    img: wotakoi,
    position: "50% 39%",
  },
  {
    title: "The Apothecary Diaries",
    synopsis:
      "Maomao lived a peaceful life with her apothecary father until she was sold as a lowly servant to the emperor's palace. But she wasn't meant for a compliant life among royalty, and when the emperor's heirs fall ill she decides to step in and find a cure....",
    episodes: 24,
    status: "Airing",
    score: "93%",
    genres: ["Mystery", "Drama", "Historical"],
    img: apothecary,
    position: "50% 35%",
  },
  {
    title: "Jujutsu Kaisen",
    synopsis:
      "Yuji Itadori is an unnaturally strong high schooler who spends his days at the Occult Club. When a cursed talisman is unsealed at school, he swallows a finger of Ryomen Sukuna, the King of Curses, to save his friends — and is pulled into the world of jujutsu sorcerers....",
    episodes: 47,
    status: "Finished",
    score: "86%",
    genres: ["Action", "Supernatural", "Shounen"],
    img: jjk,
    position: "50% 22%",
  },
];
