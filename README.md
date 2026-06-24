# @posthog/brand

PostHog's brand assets, as an npm package: the **logo**, the brand **colors**, the
**hedgehog illustrations** ("hoggies"), and the **crests**. Everything ships as React
components — plus raw SVGs, PNG URLs, and color tokens — bundled right into the package, so
there are **zero runtime CDN calls**.

> 🦔 **Browse everything live at [brand.posthog.com](https://brand.posthog.com)** — every
> logo lockup, color, hoggie, and crest, with the import you need for each one.

```bash
pnpm add @posthog/brand
```

## The idea

The package is split into a handful of subpaths, one per kind of asset. You import what you
need from the matching subpath, and nothing else comes along for the ride:

```tsx
import { Logo } from "@posthog/brand/logo"
import { colors } from "@posthog/brand/colors"
import { HedgehogDoctorHog } from "@posthog/brand/hoggies"
import { ArrayCrest } from "@posthog/brand/crests"
```

The four sections below walk through each one in turn. Every illustration is a React
component that takes two friendly props:

- **`size`** — the width (a number of px, or any CSS length). The height follows the
  artwork's aspect ratio automatically, so you never stretch anything.
- **`title`** — an accessible label. With it, the image is announced to screen readers;
  without it, it's treated as decorative.

You can also pass any other `<svg>` prop (`className`, `style`, `onClick`, `ref`, …), and
every component carries its own metadata as a static `.meta` (`HedgehogDoctorHog.meta.slug`,
`.aspectRatio`, …). Hover any component in your editor and the TSDoc shows you exactly how to
use it.

## 1. Logo

The logo lives at `@posthog/brand/logo`. It's a single, parametric `<Logo>` component that
covers every lockup and color treatment — so it's the one PostHog logo you reach for
everywhere.

```tsx
import { Logo } from "@posthog/brand/logo"

<Logo /> // landscape lockup, full gradient (the defaults)
<Logo variant="mono" color="#fff" /> // single color (e.g. on a dark background)
<Logo variant="mono" /> // inherits the surrounding text color
<Logo variant="print" layout="stacked" /> // 4-color / CMYK, portrait lockup
<Logo.Logomark /> // just the hedgehog icon
<Logo.Wordmark /> // just the "PostHog" wordmark
```

| Prop      | Values                                                    | Default        |
| --------- | --------------------------------------------------------- | -------------- |
| `variant` | `"gradient"` · `"print"` (4-color/CMYK) · `"mono"`        | `"gradient"`   |
| `layout`  | `"landscape"` · `"stacked"` · `"logomark"` · `"wordmark"` | `"landscape"`  |
| `color`   | any CSS color — used by `mono` only                       | `currentColor` |

`Logo.Logomark` and `Logo.Wordmark` are shorthands for `layout="logomark"` / `"wordmark"`. A
`mono` logo (and the always-mono wordmark) draws with `currentColor`, so it inherits the
surrounding text color unless you pass an explicit `color`. As with every illustration, it
also takes `size`, `title`, `className`, `style`, and the rest of the native `<svg>` props.

## 2. Colors

The brand palette lives at `@posthog/brand/colors` as a plain object — no React, no markup.

```ts
import { colors } from "@posthog/brand/colors"

colors.blue.core // "#1490E8"
colors.blue.lighter // a lighter tint
colors.blue.darker // a darker shade
colors["corn-blue"].gradient // ["#2BB3DF", "#1A89AD"] — [from, to]
```

Each color has `core`, `lighter`, `darker`, and a `gradient` pair.

<details>
<summary><strong>Prefer CSS custom properties?</strong></summary>

For stylesheets, import the ready-made CSS custom properties instead of the JS object:

```ts
import { colorsCss } from "@posthog/brand/colors/css"
// :root { --posthog-blue: #1490E8; --posthog-blue-lighter: …; --posthog-blue-gradient: …; }
```

Drop the string into a `<style>` tag (or your CSS-in-JS) and reference the variables anywhere:
`color: var(--posthog-blue)`.

</details>

## 3. Hoggies

The hedgehog illustrations live at `@posthog/brand/hoggies`. Each one is a React component
named `Hedgehog<Name>`:

```tsx
import { HedgehogDoctorHog } from "@posthog/brand/hoggies"

export function Example() {
  return <HedgehogDoctorHog size={120} title="A hedgehog doctor" />
}
```

That's the whole story — pick the hoggie you want, give it a `size`, and you're done. Browse
the full set (with the exact component name for each) at
[brand.posthog.com](https://brand.posthog.com).

## 4. Crests

The crests live at `@posthog/brand/crests`. Each crest comes in two sizes, paired together as
one component: the **base** is the full illustration, and **`.Mini`** is a simplified badge
that stays legible at small sizes (favicons, avatars, inline chips).

```tsx
import { ArrayCrest } from "@posthog/brand/crests"

<ArrayCrest size={64} /> // the full crest
<ArrayCrest.Mini size={24} /> // the simplified mini badge
```

The component is named `<Name>Crest`. A few crests only exist in one size — for those,
`.Mini` simply renders the same artwork as the base.

If you'd rather pull a single tier on its own, the tier-specific subpaths expose each one
individually: `ArrayCrest` from `@posthog/brand/crests/full`, and `ArrayCrestMini` from
`@posthog/brand/crests/mini`.

## Raw SVGs and PNGs

Sometimes you don't want a React component — you need the raw SVG markup (to inline into an
email or a non-React app) or a bundled PNG URL (for an `<img>` tag). Every asset ships as
**both**, so you can grab whichever fits:

```ts
import doctorHogSvg from "@posthog/brand/hoggies/svg/doctor-hog" // an SVG string
import doctorHogPng from "@posthog/brand/hoggies/png/doctor-hog" // a bundled PNG URL
```

<details>
<summary><strong>All <code>/svg</code> and <code>/png</code> subpaths</strong></summary>

Each illustration group exposes the same shapes. Replace `<g>` with one of `hoggies`,
`crests/full`, or `crests/mini` (the combined `crests` barrel and the `logo` are
React-only — use the tier subpaths for raw crest SVG/PNG):

| Subpath                         | Returns                                              |
| ------------------------------- | ---------------------------------------------------- |
| `@posthog/brand/<g>`            | React components                                     |
| `@posthog/brand/<g>/svg`        | barrel of named SVG strings (`hedgehogDoctorHogSvg`) |
| `@posthog/brand/<g>/svg/<slug>` | a single SVG string as the default export            |
| `@posthog/brand/<g>/png`        | barrel of named PNG URLs (`hedgehogDoctorHogPng`)    |
| `@posthog/brand/<g>/png/<slug>` | a single PNG URL as the default export               |
| `@posthog/brand/<g>/metadata`   | the group's `AssetMeta[]` manifest (React-free)      |

```ts
// Default import of the deep path — one asset, one module:
import doctorHogSvg from "@posthog/brand/hoggies/svg/doctor-hog"
import arrayCrestPng from "@posthog/brand/crests/full/png/array"

// Or the named barrel export, if you'd rather pull several from one import:
import { hedgehogDoctorHogSvg, hedgehogCakeHogSvg } from "@posthog/brand/hoggies/svg"

// Lazy-load by slug without bundling the whole namespace:
const svg = (await import("@posthog/brand/hoggies/svg/" + slug)).default
```

The named export is `lowerFirst(ComponentName) + "Svg"` / `+ "Png"` (e.g.
`hedgehogDoctorHogSvg`, `arrayCrestPng`). Crest minis keep a trailing `Mini`:
`arrayCrestMiniSvg`, `arrayCrestMiniPng`.

Both formats are optimized before they're committed — SVGs minified with
[SVGO](https://github.com/svg/svgo), PNGs palette-quantized with
[pngquant](https://pngquant.org/) and recompressed with
[oxipng](https://github.com/oxipng/oxipng) — so every asset stays small and renders anywhere.

</details>

## Metadata and search

The root `@posthog/brand` export is **React-free and image-free** — just types, the
cross-namespace manifest, and helpers for building a picker or looking an asset up by slug:

```ts
import { allAssets, findAssets, getAsset, getComponentName } from "@posthog/brand"

findAssets({ namespace: "crests", tier: "mini", text: "array" })
findAssets({ namespace: "hoggies", text: "doctor" })
getAsset("hoggies", "doctor-hog") // full AssetMeta
getAsset("crests", "array", "mini") // disambiguate the shared crest slug by tier
getComponentName("hoggies", "doctor-hog") // "HedgehogDoctorHog"
getComponentName("crests", "array", "mini") // "ArrayCrestMini"
```

Per-namespace manifests are also available without the cross-namespace pull — e.g.
`@posthog/brand/hoggies/metadata`.

## How assets get here

Brand assets live in PostHog's [brand-book Figma file](https://www.figma.com/design/EqKxlSFoOCkRXCnHi4C3eE).
A daily GitHub Action renders every component to SVG + PNG via the Figma API, syncs the
result into this repo (`assets/`), and commits the changes — plus a
[changeset](https://github.com/changesets/changesets) — straight to `main` (no PR). That
triggers the release workflow, which bumps the version, commits it back to `main`, and
publishes to npm with trusted publishing (OIDC) — gated behind Slack approval, per the
[PostHog SDK release process](https://posthog.com/handbook/engineering/sdks/releases).

The color palette is not synced — it's a fixed, hand-maintained list in
[`static/colors.ts`](./static/colors.ts). The `<Logo>` component is likewise
hand-maintained: its geometry is inlined in [`src/logo/`](./src/logo) (not Figma-synced),
since the logo is small and rarely changes.

## Demo site

The live showcase at [brand.posthog.com](https://brand.posthog.com) is built from
[`site/`](./site) — a Vite + React app that imports `@posthog/brand` as a workspace
dependency, so it renders the **real built components**, not copies. To run it locally:

```bash
pnpm dev:site     # builds the package, then starts the site dev server
pnpm build:site   # builds the package, then the static site into site/dist
```

It deploys to Cloudflare Pages via the dashboard's Git integration.

## Contributing

This package is maintained by the PostHog team and **mirrors a Figma file** — we don't accept
external contributions. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the details.

## License

Source-available under the [PolyForm Strict License 1.0.0](./LICENSE) — you may view
the source, but commercial use, use in your own projects, redistribution, and derivative
works are not licensed. PostHog's illustrations, logos, and crests are PostHog trademarks and
brand assets. For licensing inquiries, contact hey@posthog.com.
