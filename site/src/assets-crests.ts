// Resolve a crest's *live React component* from its slug — the dogfooding bit.
//
// The package exposes components only as named exports (no slug→component map). We
// namespace-import the real combined barrel and look each component up by its generated
// name, so the grid renders the actual compound components consumers get. Imported only
// by the Crests route, so this whole barrel stays out of the initial bundle.

import { getComponentName, type SvgAssetComponent } from "@posthog/brand"
import * as Crests from "@posthog/brand/crests"

/** A combined crest component: the full illustration, with `.Mini` when a mini exists. */
export type CrestComponent = SvgAssetComponent & { Mini?: SvgAssetComponent }

const crestComponents = Crests as unknown as Record<string, CrestComponent>

/** The combined crest component for a slug, e.g. "array" → `ArrayCrest` (+ `.Mini`). */
export function crestComponent(slug: string): CrestComponent | undefined {
  return crestComponents[getComponentName("crests", slug, "full")]
}
