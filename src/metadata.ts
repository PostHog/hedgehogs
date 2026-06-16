// @posthog/hedgehogs/metadata — tiny, React-free, zero image payload.
// Everything you need to build a picker without bundling any art.

import { componentName } from "./naming.ts";

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

export { hedgehogs } from "./generated/manifest.ts";
export { tagVocabulary } from "./generated/tags.ts";
export { findHedgehogs, getHedgehog, type FindHedgehogsFilter } from "./search.ts";
export { getRasterUrl, getVectorUrl } from "./cdn.ts";

/** The generated React component name for a slug, e.g. "doctor-nurse" → "HedgehogDoctorNurse". */
export function getComponentName(slug: string): string {
  return componentName(slug);
}
