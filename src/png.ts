// @posthog/hedgehogs/png — bundled PNG URLs for EVERY asset, plus a lazy loader.
// Use this to force a raster regardless of an asset's default delivery.
//
//   import { hedgehogDoctorNursePng } from "@posthog/hedgehogs/png";
//   import doctorNurse from "@posthog/hedgehogs/png/doctor-nurse";  // -> bundled URL

export * from "./generated/png/index.ts";

export { loadHedgehogPng } from "./runtime/load-svg.ts";

export { hedgehogs, findHedgehogs, getHedgehog, type FindHedgehogsFilter } from "./metadata.ts";
export type { HedgehogMeta } from "./types.ts";
