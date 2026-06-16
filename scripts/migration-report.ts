// Posts a Slack TLDR on the SVG-vs-PNG migration after a release publishes.
// Goal: every hedgehog ships as a true SVG. Until then, this nudges progress.
//
// Run as `pnpm migration-report`. Reads SLACK_HEDGEHOGS_WEBHOOK_URL from the env;
// if it's absent the report is printed but not posted (so local runs don't fail).

import { migrationStats, mib, readCatalog } from "./lib/stats.ts";

const version = process.env.npm_package_version ?? "unknown";
const webhook = process.env.SLACK_HEDGEHOGS_WEBHOOK_URL;

const stats = migrationStats(await readCatalog());

function progressBar(pct: number, width = 20): string {
  const filled = Math.round((pct / 100) * width);
  return `${"█".repeat(filled)}${"░".repeat(width - filled)}`;
}

const pending = stats.largestPending
  .map(
    (e) => `• \`${e.slug}\` — ${e.rawVectorBytes ? mib(e.rawVectorBytes) : "> 2 MB"} source vector`,
  )
  .join("\n");

const summary =
  `*🦔 @posthog/hedgehogs ${version} published*\n\n` +
  `*${stats.svg}* of *${stats.total}* hedgehogs ship as true SVGs ` +
  `(*${stats.svgPct}%*) — the rest fall back to bundled PNGs.\n` +
  `\`${progressBar(stats.svgPct)}\` ${stats.svgPct}%\n\n` +
  `Bundled art: ${mib(stats.totalBytes)} (${mib(stats.svgBytes)} SVG + ${mib(stats.pngBytes)} PNG).\n\n` +
  `*Biggest assets still awaiting SVG migration:*\n${pending}\n\n` +
  `_Goal: 100% true SVGs. Re-trace these upstream in the art pipeline to migrate them._`;

console.log(summary);

if (!webhook) {
  console.warn("\nSLACK_HEDGEHOGS_WEBHOOK_URL not set — skipping Slack post.");
} else {
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `@posthog/hedgehogs ${version}: ${stats.svgPct}% migrated to SVG`,
      blocks: [{ type: "section", text: { type: "mrkdwn", text: summary } }],
    }),
  });
  if (!res.ok) {
    throw new Error(`Slack post failed: ${res.status} ${res.statusText}`);
  }
  console.log("\nPosted migration report to Slack.");
}
