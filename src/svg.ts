// @posthog/hedgehogs/svg — raw optimized SVG strings (framework-agnostic) plus a
// lazy loader. Only assets that ship as vectors are available here; PNG-delivered
// assets are not (use `/png` or `getRasterUrl` for those).
//
//   import { hedgehogDoctorNurseSvg } from "@posthog/hedgehogs/svg";
//   import doctorNurse from "@posthog/hedgehogs/svg/doctor-nurse";

export * from "./generated/svg/index.ts";

export { loadHedgehogSvg } from "./runtime/load-svg.ts";

// Metadata helpers are handy when working with raw strings.
export { hedgehogs, findHedgehogs, getHedgehog, type FindHedgehogsFilter } from "./metadata.ts";
export type { HedgehogMeta } from "./types.ts";
