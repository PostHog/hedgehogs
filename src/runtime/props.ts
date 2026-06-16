// Shared prop types for the generated components. Imported only by the React
// entry points, so `/svg` (strings) and `/metadata` stay React-free.

import type { ComponentPropsWithoutRef } from "react";

interface CommonHedgehogProps {
  /**
   * Convenience sizing: sets the rendered width. Height follows from the
   * illustration's intrinsic aspect ratio. Accepts a number (px) or any CSS length.
   */
  size?: number | string;
  /**
   * Accessible label. When provided the image is announced to assistive tech
   * (SVG `<title>` / `<img alt>`); when omitted the image is treated as decorative.
   */
  title?: string;
}

/** Props for an SVG-delivered hedgehog (renders an `<svg>`). */
export type HedgehogSvgProps = Omit<ComponentPropsWithoutRef<"svg">, "title"> & CommonHedgehogProps;

/** Props for a PNG-delivered hedgehog (renders an `<img>`). */
export type HedgehogImgProps = Omit<ComponentPropsWithoutRef<"img">, "title"> & CommonHedgehogProps;

/** The common prop surface; both delivery kinds accept `size`, `title`, `className`, `style`. */
export type HedgehogProps = HedgehogSvgProps;
