import { describe, expect, it } from "vitest";
import { findHedgehogs, getHedgehog } from "../src/search.ts";
import { hedgehogs } from "../src/generated/manifest.ts";

describe("findHedgehogs", () => {
  it("returns the whole manifest with no filter", () => {
    expect(findHedgehogs()).toHaveLength(hedgehogs.length);
  });

  it("filters by delivery", () => {
    const svg = findHedgehogs({ delivery: "svg" });
    expect(svg.length).toBeGreaterThan(0);
    expect(svg.every((h) => h.delivery === "svg")).toBe(true);
  });

  it("filters by a single version and by a list", () => {
    const v3 = findHedgehogs({ version: "v3" });
    expect(v3.every((h) => h.version === "v3")).toBe(true);
    const multi = findHedgehogs({ version: ["v2", "v3"] });
    expect(multi.every((h) => h.version === "v2" || h.version === "v3")).toBe(true);
    expect(multi.length).toBeGreaterThanOrEqual(v3.length);
  });

  it("matches tags with any vs all semantics", () => {
    const sample = hedgehogs.find((h) => h.tags.length >= 2)!;
    const [a, b] = sample.tags;
    const any = findHedgehogs({ tags: [a!, "definitely-not-a-real-tag"], tagsMode: "any" });
    expect(any.some((h) => h.slug === sample.slug)).toBe(true);
    const all = findHedgehogs({ tags: [a!, b!], tagsMode: "all" });
    expect(all.every((h) => h.tags.includes(a!) && h.tags.includes(b!))).toBe(true);
  });

  it("does a case-insensitive text search across name/caption/tags", () => {
    const sample = hedgehogs[0]!;
    const word = sample.name.split(/\s+/)[0]!;
    const hits = findHedgehogs({ text: word.toUpperCase() });
    expect(hits.some((h) => h.slug === sample.slug)).toBe(true);
  });
});

describe("getHedgehog", () => {
  it("finds a known slug and returns undefined for an unknown one", () => {
    expect(getHedgehog(hedgehogs[0]!.slug)?.slug).toBe(hedgehogs[0]!.slug);
    expect(getHedgehog("nope-not-real")).toBeUndefined();
  });
});
