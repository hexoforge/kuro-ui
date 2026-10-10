import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Outfit, Sedgwick_Ave, Sora } from "next/font/google";
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
      className={`${sora.variable} ${manrope.variable} ${inter.variable} ${outfit.variable} ${sedgwick.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
