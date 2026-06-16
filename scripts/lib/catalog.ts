// Shared types for the on-disk catalog and the upstream art-library payloads.
// `sync.ts` writes these; `codegen.ts` reads them.

import type { Delivery, HedgehogMeta } from "../../src/types.ts";

/** Shape of one asset in the upstream `index.json`. */
export interface IndexEntry {
  slug: string;
  name: string;
  version: HedgehogMeta["version"];
  imageType: HedgehogMeta["imageType"];
  usageType: HedgehogMeta["usageType"];
  team: string | null;
  caption: string;
  tags: string[];
  pathTags: string[];
  colors: HedgehogMeta["colors"];
  hedgehogs: HedgehogMeta["hedgehogs"];
  verified: boolean;
  files: HedgehogMeta["files"];
}

/** Upstream `index.json`. */
export interface SearchIndex {
  generatedAt: string;
  assets: IndexEntry[];
}

/** Upstream `tags.json` — every field is a tag -> count map. */
export interface TagsIndex {
  generatedAt: string;
  freeform: Record<string, number>;
  poses: Record<string, number>;
  expressions: Record<string, number>;
  outfits: Record<string, number>;
  accessories: Record<string, number>;
  teams: Record<string, number>;
  pathTags: Record<string, number>;
}

/** A catalog entry is the public metadata plus sync bookkeeping for size reporting. */
export interface CatalogEntry extends HedgehogMeta {
  /** Bytes of the source SVG, or null when it was too large to download. */
  rawVectorBytes: number | null;
  /** Bytes of the optimized inline SVG, or null for png-delivery assets. */
  inlineVectorBytes: number | null;
  /** Bytes of the bundled 768px PNG. */
  pngBytes: number;
}

/** `assets/catalog.json`. */
export interface Catalog {
  generatedAt: string;
  /** Source catalog `generatedAt`, to detect upstream regenerations. */
  source: string;
  entries: CatalogEntry[];
}

/** Per-asset bookkeeping used to skip unchanged assets on the next sync. */
export interface SyncStateEntry {
  /** Hash of the upstream index entry (detects metadata changes). */
  indexHash: string;
  delivery: Delivery;
}

/** `assets/sync-state.json`. */
export interface SyncState {
  source: string;
  entries: Record<string, SyncStateEntry>;
}
