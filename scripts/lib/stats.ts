// Shared catalog statistics for size reporting and the Slack migration report.

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Catalog, CatalogEntry } from "./catalog.ts";

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets");

export async function readCatalog(): Promise<Catalog> {
  return JSON.parse(await readFile(join(ASSETS, "catalog.json"), "utf8")) as Catalog;
}

export interface MigrationStats {
  total: number;
  svg: number;
  png: number;
  /** Percentage of assets shipping as true vectors (0–100, one decimal). */
  svgPct: number;
  svgBytes: number;
  pngBytes: number;
  totalBytes: number;
  /** Largest source vectors still shipping as PNG — the best migration targets. */
  largestPending: Array<{ slug: string; rawVectorBytes: number | null }>;
}

export function migrationStats(catalog: Catalog): MigrationStats {
  const entries = catalog.entries;
  const svgEntries = entries.filter((e) => e.delivery === "svg");
  const pngEntries = entries.filter((e) => e.delivery === "png");
  const svgBytes = sum(svgEntries, (e) => e.inlineVectorBytes ?? 0);
  const pngBytes = sum(entries, (e) => e.pngBytes);

  // A null rawVectorBytes means the source vector was skipped for being over the
  // download cap — i.e. it's among the *largest*, so rank nulls first.
  const rank = (b: number | null): number => (b == null ? Number.MAX_SAFE_INTEGER : b);
  const largestPending = [...pngEntries]
    .sort((a, b) => rank(b.rawVectorBytes) - rank(a.rawVectorBytes))
    .slice(0, 5)
    .map((e) => ({ slug: e.slug, rawVectorBytes: e.rawVectorBytes }));

  return {
    total: entries.length,
    svg: svgEntries.length,
    png: pngEntries.length,
    svgPct: entries.length ? Math.round((svgEntries.length / entries.length) * 1000) / 10 : 0,
    svgBytes,
    pngBytes,
    totalBytes: svgBytes + pngBytes,
    largestPending,
  };
}

function sum(entries: CatalogEntry[], pick: (e: CatalogEntry) => number): number {
  return entries.reduce((acc, e) => acc + pick(e), 0);
}

export function mib(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
