import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import * as components from "../src/generated/components/index.ts";
import { hedgehogs } from "../src/generated/manifest.ts";
import { componentName } from "../src/naming.ts";
import type { HedgehogComponent } from "../src/runtime/create-hedgehog.tsx";

type AnyHedgehog = HedgehogComponent;
const all = components as unknown as Record<string, AnyHedgehog>;

describe("generated components", () => {
  it("exports exactly one component per manifest asset", () => {
    expect(Object.keys(all).length).toBe(hedgehogs.length);
    for (const meta of hedgehogs) {
      // forwardRef components are exotic objects, not plain functions.
      expect(all[componentName(meta.slug)]).toBeDefined();
    }
  });

  it("every component renders and carries its metadata", () => {
    for (const meta of hedgehogs) {
      const Component = all[componentName(meta.slug)]!;
      expect(Component.meta.slug).toBe(meta.slug);
      const html = renderToStaticMarkup(createElement(Component));
      if (meta.delivery === "svg") {
        expect(html).toContain("<svg");
        expect(html).toContain("viewBox=");
      } else {
        expect(html).toContain("<img");
        expect(html).toContain(`${meta.slug}.png`);
      }
    }
  });

  it("renders an accessible label when given a title, decorative otherwise", () => {
    const svgMeta = hedgehogs.find((h) => h.delivery === "svg")!;
    const Svg = all[componentName(svgMeta.slug)]!;
    const titled = renderToStaticMarkup(createElement(Svg, { title: "A test hog" }));
    expect(titled).toContain('role="img"');
    expect(titled).toContain("<title>A test hog</title>");

    const decorative = renderToStaticMarkup(createElement(Svg));
    expect(decorative).toContain('aria-hidden="true"');

    const pngMeta = hedgehogs.find((h) => h.delivery === "png")!;
    const Png = all[componentName(pngMeta.slug)]!;
    const pngTitled = renderToStaticMarkup(createElement(Png, { title: "Raster hog" }));
    expect(pngTitled).toContain('alt="Raster hog"');
  });

  it("maps `size` to width", () => {
    const svgMeta = hedgehogs.find((h) => h.delivery === "svg")!;
    const Svg = all[componentName(svgMeta.slug)]!;
    const html = renderToStaticMarkup(createElement(Svg, { size: 120 }));
    expect(html).toContain('width="120"');
  });

  it("escapes titles to prevent markup injection", () => {
    const svgMeta = hedgehogs.find((h) => h.delivery === "svg")!;
    const Svg = all[componentName(svgMeta.slug)]!;
    const html = renderToStaticMarkup(createElement(Svg, { title: "<b>x</b>" }));
    expect(html).toContain("&lt;b&gt;x&lt;/b&gt;");
    expect(html).not.toContain("<title><b>x</b></title>");
  });
});
