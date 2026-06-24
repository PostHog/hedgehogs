import type { Namespace } from "../src/types.ts"
import { describe, expect, it } from "vitest"
import { applyRename, titleFromSlug } from "../scripts/lib/renames.ts"

describe("applyRename", () => {
  it.each<[Namespace, string, string, { slug: string; name: string }]>([
    // No rule: inputs pass through unchanged.
    ["hoggies", "doctor-hog", "Doctor Hog", { slug: "doctor-hog", name: "Doctor Hog" }],
    ["crests", "array", "Array", { slug: "array", name: "Array" }],
    // Configured renames (slug + name).
    ["hoggies", "dadd-ai-l", "Dadd-ai L", { slug: "dadd-ai-left", name: "Dadd AI Left" }],
    ["hoggies", "dadd-ai-r", "Dadd-ai R", { slug: "dadd-ai-right", name: "Dadd AI Right" }],
    ["hoggies", "9-9-6", "9-9-6", { slug: "996", name: "996" }],
  ])("applyRename(%s, %s, %s)", (namespace, slug, name, expected) => {
    expect(applyRename(namespace, slug, name)).toEqual(expected)
  })
})

describe("titleFromSlug", () => {
  it.each([
    ["foo-bar-baz", "Foo Bar Baz"],
    ["dadd-ai-left", "Dadd Ai Left"],
    ["array", "Array"],
  ])("titleFromSlug(%s) === %s", (slug, expected) => {
    expect(titleFromSlug(slug)).toBe(expected)
  })
})
