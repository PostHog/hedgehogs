// Helpers for the original CDN art. Use these when you want higher-resolution
// rasters (lg/original) than the 768px PNG bundled into the package, or the
// source vector URL. These DO hit the network at runtime, unlike the components.

import { getHedgehog } from "./search.ts";
import type { HedgehogMeta, RasterVariant } from "./types.ts";

/**
 * Returns the Cloudflare Images URL for a raster `variant` of an asset.
 * Accepts a slug or a `HedgehogMeta`. Returns `undefined` for an unknown slug.
 */
export function getRasterUrl(
  target: string | HedgehogMeta,
  variant: RasterVariant = "lg",
): string | undefined {
  const meta = typeof target === "string" ? getHedgehog(target) : target;
  return meta?.files[variant];
}

/** Returns the source SVG URL on R2 for an asset (slug or meta). */
export function getVectorUrl(target: string | HedgehogMeta): string | undefined {
  const meta = typeof target === "string" ? getHedgehog(target) : target;
  return meta?.files.vector;
}
