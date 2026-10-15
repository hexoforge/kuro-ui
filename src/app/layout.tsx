import type { Metadata, Viewport } from "next";
import {
  Bpmf_Zihi_Kai_Std,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Manrope,
  Outfit,
  Sedgwick_Ave,
  Sedgwick_Ave_Display,
  Sora,
} from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const sora = Sora({ variable: "--ff-sora", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--ff-manrope", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--ff-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--ff-outfit", subsets: ["latin"], display: "swap" });
const sedgwick = Sedgwick_Ave({
  variable: "--ff-sedgwick",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Details-page tile captions.
const mono = JetBrains_Mono({ variable: "--ff-mono", weight: "700", subsets: ["latin"], display: "swap", preload: false });
// Footer-only display faces: no preload so they don't compete with the hero.
// Google publishes no fallback metrics for this face, so skip the size-adjusted fallback.
const zihiKai = Bpmf_Zihi_Kai_Std({ variable: "--ff-zihi", weight: "400", subsets: ["latin"], display: "swap", preload: false, adjustFontFallback: false });
const instrument = Instrument_Serif({ variable: "--ff-instrument", weight: "400", subsets: ["latin"], display: "swap", preload: false });
const sedgwickDisplay = Sedgwick_Ave_Display({ variable: "--ff-sedgwick-display", weight: "400", subsets: ["latin"], display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Kuro - Watch anime",
  description: "Kuro UI showcase: stream the latest anime, track what you watch and see what airs next.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${inter.variable} ${outfit.variable} ${sedgwick.variable} ${zihiKai.variable} ${instrument.variable} ${sedgwickDisplay.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
