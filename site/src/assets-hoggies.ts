// Resolve a hoggie's *live React component* from its slug — the dogfooding bit.
//
// The package exposes components only as named exports (no slug→component map). We
// namespace-import the real barrel and look each component up by its generated name,
// so the grid renders the actual components consumers get. Imported only by the
// Hoggies route, so this whole barrel stays out of the initial bundle.

import { getComponentName, type SvgAssetComponent } from "@posthog/brand"
import * as Hoggies from "@posthog/brand/hoggies"

const hoggieComponents = Hoggies as unknown as Record<string, SvgAssetComponent>

/** The hoggie component for a slug, e.g. "doctor-hog" → `HedgehogDoctorHog`. */
export function hoggieComponent(slug: string): SvgAssetComponent | undefined {
  return hoggieComponents[getComponentName("hoggies", slug)]
}
