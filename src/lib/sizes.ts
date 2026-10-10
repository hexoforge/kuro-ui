/**
 * `sizes` attribute for an image that is `px` Figma pixels wide on desktop.
 * Desktop widths scale with the viewport up to the 1920 frame, so the browser
 * picks a srcset candidate that matches the real rendered width.
 */
export function designSizes(px: number, mobile = "100vw") {
  const vw = ((px / 1920) * 100).toFixed(2);
  return `(min-width: 1920px) ${px}px, (min-width: 1024px) ${vw}vw, ${mobile}`;
}
