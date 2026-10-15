"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        // Let horizontal rails (trending, genres) keep native touch/trackpad scrolling.
        gestureOrientation: "vertical",
        // Inner scroll areas (episode lists) scroll natively only while they can; otherwise the
        // wheel goes to the page — no dead zones over panels that don't overflow.
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
