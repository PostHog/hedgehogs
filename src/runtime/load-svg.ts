// Lazily load a single hedgehog's SVG string without bundling all of them.
// Backed by a codegen'd map of dynamic imports, so each SVG is its own chunk.

import { svgLoaders } from "../generated/svg-loaders.ts";

/**
 * Resolves the optimized SVG string for `slug`, or `undefined` if the asset is
 * PNG-delivered (no bundled vector). Intended for pickers built on `/metadata`.
 */
export async function loadHedgehogSvg(slug: string): Promise<string | undefined> {
  const loader = svgLoaders[slug];
  if (!loader) return undefined;
  return (await loader()).svg;
}

/** Lazily load a single hedgehog's bundled PNG URL. */
export async function loadHedgehogPng(slug: string): Promise<string | undefined> {
  const { pngLoaders } = await import("../generated/png-loaders.ts");
  const loader = pngLoaders[slug];
  if (!loader) return undefined;
  return (await loader()).src;
}
