import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ContinueWatching from "@/components/ContinueWatching";
import Trending from "@/components/Trending";
import TopPicks from "@/components/TopPicks";
import Coverflow from "@/components/Coverflow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="mx-auto w-1920 overflow-x-clip pl-50 pr-45 pt-23 max-lg:w-full max-lg:px-16 max-lg:pt-12">
      <Nav />
      <Hero />
      <ContinueWatching />
      <Trending />
      <TopPicks />
      <Coverflow />
      <Footer />
    </main>
  );
}
