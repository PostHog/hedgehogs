// Framework-agnostic types. Deliberately free of any React import so that the
// `/metadata` and `/svg` (string) entry points work with zero React present.

/** Illustration style era. v3 is the newest. */
export type HedgehogVersion = "v1" | "v2" | "v3";

export type ImageType =
  | "isolated-hedgehog"
  | "full-scene"
  | "sticker"
  | "spot-illustration"
  | "pattern"
  | "icon"
  | "object";

export type UsageType = "public" | "team-specific" | "internal" | "event";

/**
 * How this asset is bundled:
 * - `"svg"`: shipped as an optimized inline vector (crisp, scalable).
 * - `"png"`: shipped as a 768px raster (the source was too large to inline as SVG).
 *
 * We're migrating everything toward `"svg"`.
 */
export type Delivery = "svg" | "png";

export interface HedgehogPose {
  pose: string;
  expression: string;
  outfit: string[];
  accessories: string[];
  activity: string;
}

export interface HedgehogColors {
  /** Up to five dominant colors as hex strings. */
  dominant: string[];
  /** e.g. "warm", "cool", "pastel", "monochrome". */
  palette: string;
}

/** Absolute CDN URLs for the original art (raster variants + source vector). */
export interface HedgehogFiles {
  /** 256px raster (Cloudflare Images). */
  thumb: string;
  /** 768px raster (Cloudflare Images). This is the variant bundled into the package. */
  md: string;
  /** 1536px raster (Cloudflare Images). */
  lg: string;
  /** Source-resolution raster (Cloudflare Images). */
  original: string;
  /** Source SVG on R2. */
  vector: string;
}

/** All metadata for a single hedgehog. Carried on each component as `.meta`. */
export interface HedgehogMeta {
  slug: string;
  name: string;
  version: HedgehogVersion;
  imageType: ImageType;
  usageType: UsageType;
  team: string | null;
  caption: string;
  tags: string[];
  pathTags: string[];
  colors: HedgehogColors;
  hedgehogs: HedgehogPose[];
  verified: boolean;
  delivery: Delivery;
  /** Intrinsic aspect ratio (width / height) of the bundled image. */
  aspectRatio: number;
  files: HedgehogFiles;
}

/** A Cloudflare Images raster variant. */
export type RasterVariant = "thumb" | "md" | "lg" | "original";

/** Tag vocabulary across the whole catalog; each field maps a value to its count. */
export interface TagVocabulary {
  freeform: Record<string, number>;
  poses: Record<string, number>;
  expressions: Record<string, number>;
  outfits: Record<string, number>;
  accessories: Record<string, number>;
  teams: Record<string, number>;
  pathTags: Record<string, number>;
}
