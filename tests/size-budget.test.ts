import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { Catalog } from "../scripts/lib/catalog.ts";

const ROOT = join(import.meta.dirname, "..");
const ASSETS = join(ROOT, "assets");
const catalog = JSON.parse(readFileSync(join(ASSETS, "catalog.json"), "utf8")) as Catalog;

const INLINE_BUDGET = 512 * 1024;
const TOTAL_CAP = 60 * 1024 * 1024;

function dirBytes(dir: string, ext: string): number {
  let total = 0;
  for (const e of catalog.entries) {
    const p = join(dir, `${e.slug}${ext}`);
    if (existsSync(p)) total += statSync(p).size;
  }
  return total;
}

describe("package size budget", () => {
  it("ships a PNG for every asset", () => {
    for (const e of catalog.entries) {
      expect(existsSync(join(ASSETS, "png", `${e.slug}.png`))).toBe(true);
    }
  });

  it("ships a vector for every svg-delivery asset and none for png-delivery", () => {
    for (const e of catalog.entries) {
      const hasVector = existsSync(join(ASSETS, "vectors", `${e.slug}.svg`));
      expect(hasVector).toBe(e.delivery === "svg");
    }
  });

  it("keeps every inlined vector under the per-asset budget", () => {
    for (const e of catalog.entries) {
      if (e.delivery !== "svg") continue;
      const size = statSync(join(ASSETS, "vectors", `${e.slug}.svg`)).size;
      expect(size, `${e.slug} optimized vector`).toBeLessThanOrEqual(INLINE_BUDGET);
    }
  });

  it("keeps the bundled art under the total cap", () => {
    const total = dirBytes(join(ASSETS, "vectors"), ".svg") + dirBytes(join(ASSETS, "png"), ".png");
    expect(total).toBeLessThanOrEqual(TOTAL_CAP);
  });
});
