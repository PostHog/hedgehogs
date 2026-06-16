import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/svg.ts",
    "src/png.ts",
    "src/metadata.ts",
    // Per-asset modules are emitted individually so deep imports
    // (@posthog/hedgehogs/svg/<slug>, /png/<slug>) and tree-shaking work.
    "src/generated/**/*.ts",
    "src/generated/**/*.tsx",
  ],
  format: "esm",
  // Preserve the module graph (no mega-bundle) — required for per-asset
  // tree-shaking, code-split dynamic imports, and per-PNG asset emission.
  unbundle: true,
  dts: true,
  clean: true,
  sourcemap: false,
  // React is an optional peer; never bundle it.
  external: ["react", "react/jsx-runtime", "react-dom"],
  // Ship the real PNG files next to the generated png modules so their
  // `new URL("../../png/<slug>.png", import.meta.url)` references resolve.
  copy: [{ from: "assets/png", to: "dist" }],
});
