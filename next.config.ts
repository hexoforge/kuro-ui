import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first (smallest), WebP fallback; browsers without either get the source format.
    formats: ["image/avif", "image/webp"],
    // 90 is reserved for the hero / carousel key art, 75 for everything else.
    qualities: [75, 90],
    // Cache optimized variants for a year — the source assets are content-hashed static imports.
    minimumCacheTTL: 31536000,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
