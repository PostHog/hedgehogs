// Slug -> identifier helpers shared by sync, codegen, and tests.
//
// Component names use a uniform `Hedgehog` prefix so that:
//   - digit-leading slugs (404, 70-s-dance-hog) still produce valid identifiers,
//   - generated names never collide with consumer code (e.g. `Dog`, `Pirate`),
//   - typing `Hedgehog` autocompletes the whole library.

/** "doctor-nurse" -> "DoctorNurse", "70-s-dance-hog" -> "70SDanceHog". */
export function slugToPascal(slug: string): string {
  return slug
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** "doctor-nurse" -> "HedgehogDoctorNurse", "404" -> "Hedgehog404". */
export function componentName(slug: string): string {
  return `Hedgehog${slugToPascal(slug)}`;
}

/** "doctor-nurse" -> "hedgehogDoctorNurseSvg". */
export function svgConstName(slug: string): string {
  return `hedgehog${slugToPascal(slug)}Svg`;
}

/** "doctor-nurse" -> "hedgehogDoctorNursePng". */
export function pngConstName(slug: string): string {
  return `hedgehog${slugToPascal(slug)}Png`;
}

/**
 * Throws if two distinct slugs map to the same component name. Codegen calls this
 * before writing anything so a future ambiguous slug fails loudly instead of
 * silently overwriting a module.
 */
export function assertNoCollisions(slugs: readonly string[]): void {
  const byName = new Map<string, string>();
  for (const slug of slugs) {
    const name = componentName(slug);
    const existing = byName.get(name);
    if (existing !== undefined && existing !== slug) {
      throw new Error(
        `Component name collision: "${existing}" and "${slug}" both map to ${name}. ` +
          `Rename one slug upstream in the art pipeline.`,
      );
    }
    byName.set(name, slug);
  }
}
