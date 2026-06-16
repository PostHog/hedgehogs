// Prints a Markdown size + migration report. CI appends it to $GITHUB_STEP_SUMMARY.

import { migrationStats, mib, readCatalog } from "./lib/stats.ts";

const stats = migrationStats(await readCatalog());

const lines = [
  "## 🦔 Hedgehog catalog",
  "",
  "| Metric | Value |",
  "| --- | --- |",
  `| Total assets | ${stats.total} |`,
  `| Shipped as SVG | ${stats.svg} (${stats.svgPct}%) |`,
  `| Shipped as PNG fallback | ${stats.png} |`,
  `| Bundled SVG size | ${mib(stats.svgBytes)} |`,
  `| Bundled PNG size | ${mib(stats.pngBytes)} |`,
  `| **Total bundled art** | **${mib(stats.totalBytes)}** |`,
  "",
  "### Largest assets still awaiting SVG migration",
  "",
  ...stats.largestPending.map(
    (e) => `- \`${e.slug}\` — source vector ${e.rawVectorBytes ? mib(e.rawVectorBytes) : "> 2 MB"}`,
  ),
];

console.log(lines.join("\n"));
