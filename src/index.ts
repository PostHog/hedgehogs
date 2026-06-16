// @posthog/hedgehogs — React components for every hedgehog.
//
// Each export renders the best bundled representation: an inline SVG when the asset
// ships as a vector, otherwise a bundled <img>. All offline; no runtime CDN calls.
//
//   import { HedgehogDoctorNurse } from "@posthog/hedgehogs";
//   <HedgehogDoctorNurse size={120} title="A hedgehog doctor" />

export * from "./generated/components/index.ts";

// Component factories' public types and shared props.
export type { HedgehogComponent } from "./runtime/create-hedgehog.tsx";
export type { PngHedgehogComponent } from "./runtime/create-png-hedgehog.tsx";
export type { HedgehogProps, HedgehogSvgProps, HedgehogImgProps } from "./runtime/props.ts";

// Metadata + search live on `/metadata`, but are re-exported here for convenience.
export {
  hedgehogs,
  tagVocabulary,
  findHedgehogs,
  getHedgehog,
  getRasterUrl,
  getVectorUrl,
  getComponentName,
  type FindHedgehogsFilter,
} from "./metadata.ts";

export type {
  Delivery,
  HedgehogColors,
  HedgehogFiles,
  HedgehogMeta,
  HedgehogPose,
  HedgehogVersion,
  ImageType,
  RasterVariant,
  TagVocabulary,
  UsageType,
} from "./types.ts";
