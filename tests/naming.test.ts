import { describe, expect, it } from "vitest";
import {
  assertNoCollisions,
  componentName,
  pngConstName,
  slugToPascal,
  svgConstName,
} from "../scripts/lib/naming.ts";

describe("slug -> identifier", () => {
  it.each([
    ["doctor-nurse", "DoctorNurse"],
    ["70-s-dance-hog", "70SDanceHog"],
    ["996-coder-hog", "996CoderHog"],
    ["404", "404"],
    ["confused-3", "Confused3"],
    ["mr-blobby", "MrBlobby"],
  ])("slugToPascal(%s) === %s", (slug, expected) => {
    expect(slugToPascal(slug)).toBe(expected);
  });

  it("prefixes component names with Hedgehog", () => {
    expect(componentName("doctor-nurse")).toBe("HedgehogDoctorNurse");
    expect(componentName("404")).toBe("Hedgehog404");
    expect(componentName("70-s-dance-hog")).toBe("Hedgehog70SDanceHog");
  });

  it("derives svg/png const names", () => {
    expect(svgConstName("doctor-nurse")).toBe("hedgehogDoctorNurseSvg");
    expect(pngConstName("doctor-nurse")).toBe("hedgehogDoctorNursePng");
  });

  it("produces valid JS identifiers for every component name", () => {
    const slugs = ["404", "70-s-dance-hog", "996-coder-hog", "a", "z-9"];
    for (const slug of slugs) {
      expect(componentName(slug)).toMatch(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
    }
  });
});

describe("collision detection", () => {
  it("passes for distinct names", () => {
    expect(() => assertNoCollisions(["doctor-nurse", "404", "pirate"])).not.toThrow();
  });

  it("ignores duplicate slugs (same asset listed twice)", () => {
    expect(() => assertNoCollisions(["pirate", "pirate"])).not.toThrow();
  });

  it("throws when two slugs collapse to the same component name", () => {
    expect(() => assertNoCollisions(["foo-bar", "foo--bar"])).toThrow(/collision/i);
  });
});
