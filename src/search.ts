// Pure search/filter helpers over the bundled manifest. No React, no image payload.

import { hedgehogs } from "./generated/manifest.ts";
import type { Delivery, HedgehogMeta, ImageType, UsageType, HedgehogVersion } from "./types.ts";

export interface FindHedgehogsFilter {
  /** Substring match across name, caption, and tags (case-insensitive). */
  text?: string;
  /** Freeform tags to match. */
  tags?: string[];
  /** Whether `tags` must all match (`"all"`) or any (`"any"`, default). */
  tagsMode?: "any" | "all";
  /** Match a hedgehog pose anywhere in the asset. */
  pose?: string;
  /** Match a hedgehog expression anywhere in the asset. */
  expression?: string;
  version?: HedgehogVersion | HedgehogVersion[];
  imageType?: ImageType | ImageType[];
  usageType?: UsageType | UsageType[];
  team?: string;
  verified?: boolean;
  delivery?: Delivery;
}

function matchesOneOf<T>(value: T, filter: T | T[] | undefined): boolean {
  if (filter === undefined) return true;
  return Array.isArray(filter) ? filter.includes(value) : value === filter;
}

function matches(asset: HedgehogMeta, filter: FindHedgehogsFilter): boolean {
  if (!matchesOneOf(asset.version, filter.version)) return false;
  if (!matchesOneOf(asset.imageType, filter.imageType)) return false;
  if (!matchesOneOf(asset.usageType, filter.usageType)) return false;
  if (filter.delivery !== undefined && asset.delivery !== filter.delivery) return false;
  if (filter.verified !== undefined && asset.verified !== filter.verified) return false;
  if (filter.team !== undefined && asset.team !== filter.team) return false;

  if (filter.tags?.length) {
    const have = new Set(asset.tags);
    const mode = filter.tagsMode ?? "any";
    const ok =
      mode === "all" ? filter.tags.every((t) => have.has(t)) : filter.tags.some((t) => have.has(t));
    if (!ok) return false;
  }

  if (filter.pose && !asset.hedgehogs.some((h) => h.pose.includes(filter.pose as string))) {
    return false;
  }
  if (
    filter.expression &&
    !asset.hedgehogs.some((h) => h.expression.includes(filter.expression as string))
  ) {
    return false;
  }

  if (filter.text?.trim()) {
    const q = filter.text.trim().toLowerCase();
    const hay = [asset.name, asset.caption, ...asset.tags, ...asset.pathTags]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }

  return true;
}

/** Returns every asset matching `filter` (empty filter returns all of them). */
export function findHedgehogs(filter: FindHedgehogsFilter = {}): HedgehogMeta[] {
  return hedgehogs.filter((asset) => matches(asset, filter));
}

/** Looks up a single asset's metadata by slug. */
export function getHedgehog(slug: string): HedgehogMeta | undefined {
  return hedgehogs.find((asset) => asset.slug === slug);
}
