import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Coverflow from "@/components/Coverflow";
import { LANDING_PICKS, type Pick } from "@/lib/picks";
import Footer from "@/components/Footer";
import DetailsHero from "@/components/details/DetailsHero";
import DetailsBody from "@/components/details/DetailsBody";
import MoreLikeThis from "@/components/details/MoreLikeThis";
import darkSummoner from "@/assets/img/reco-dark-summoner.png";

export const metadata: Metadata = {
  title: "Black Clover — Kuro",
  description: "Watch Black Clover on Kuro: episodes, watch order and similar anime.",
};

// The Details frame features "I'm Dating a Dark Summoner" in the centre of the recommendations.
const DARK_SUMMONER: Pick = {
  title: "I’m Dating a Dark Summoner",
  synopsis:
    "Amona’s a dark summoner with demonic powers. Roni’s a devout priest who’s way too uptight. By all rights, they should hate each other. Instead, they end up fast-tracking their enemies-to-lovers arc with a one-night stand that somehow insists on becoming a recurring event. Now they must hide their situationship from the rest of the party while denying their growing attraction to one another, all while dealing with an imp who’s far too invested in their love life.",
  episodes: 12,
  status: "Airing",
  score: "78%",
  genres: ["Romance", "Comedy", "Fantasy"],
  img: darkSummoner,
  position: "50% 37%",
};

const PICKS = LANDING_PICKS.map((p, i) => (i === 2 ? DARK_SUMMONER : p));

export default function BlackCloverPage() {
  return (
    <main className="mx-auto w-1920 overflow-x-clip pt-23 max-lg:w-full max-lg:px-16 max-lg:pt-12">
      <div className="pl-48 pr-46 max-lg:px-0">
        <Nav crumb="Black Clover" />
      </div>
      <DetailsHero />
      <DetailsBody />
      <MoreLikeThis />
      {/* Same gutters as the landing page so the shared sections line up identically. */}
      <div className="pl-50 pr-45 max-lg:px-0">
        <Coverflow picks={PICKS} className="mt-120" trackClassName="mt-89" />
        <Footer />
      </div>
    </main>
  );
}
