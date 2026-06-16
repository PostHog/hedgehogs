import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const VECTORS = join(import.meta.dirname, "..", "assets", "vectors");
const files = readdirSync(VECTORS).filter((f) => f.endsWith(".svg"));

describe("bundled vectors", () => {
  it("has at least one vector", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s is a valid, safe, prefixed SVG", (file) => {
    const slug = file.replace(/\.svg$/, "");
    const svg = readFileSync(join(VECTORS, file), "utf8");

    // Single root <svg> with a viewBox and no intrinsic dimensions.
    expect(svg).toMatch(/<svg\b/);
    expect(svg).toMatch(/viewBox\s*=/);
    const root = svg.slice(0, svg.indexOf(">") + 1);
    expect(root).not.toMatch(/\bwidth\s*=/);
    expect(root).not.toMatch(/\bheight\s*=/);

    // Every id is namespaced (so two inlined hedgehogs never collide).
    const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
    for (const id of ids) {
      expect(id?.startsWith(`hh-${slug}-`)).toBe(true);
    }

    // No active content — this markup is injected via dangerouslySetInnerHTML.
    expect(svg).not.toMatch(/<script/i);
    expect(svg).not.toMatch(/\son\w+\s*=/i);
    expect(svg).not.toMatch(/javascript:/i);
  });
});
