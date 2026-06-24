import { getAsset, getComponentName } from "@posthog/brand"
import { Link, useParams } from "react-router-dom"
import { crestComponent } from "../assets-crests.ts"
import { PageHeader } from "../components/PageHeader.tsx"

// A single crest on its own page — renders the full illustration and the mini badge in
// isolation (nothing else heavy on the page). Useful for telling apart a per-asset defect
// from a page-level rendering problem: if a crest looks broken in the grid but fine here,
// the asset is sound and the issue is something about rendering many of them at once.
export function CrestDetailPage() {
  const { slug = "" } = useParams()
  const compound = crestComponent(slug)
  const asset = getAsset("crests", slug, "full")

  if (!compound || !asset) {
    return (
      <div>
        <PageHeader eyebrow="@posthog/brand/crests" title="Crest not found">
          No crest with slug <code>{slug}</code>. <Link to="/crests">Back to all crests</Link>.
        </PageHeader>
      </div>
    )
  }

  const baseName = getComponentName("crests", slug, "full")
  const Full = compound
  const Mini = compound.Mini

  return (
    <div>
      <PageHeader eyebrow="@posthog/brand/crests" title={asset.name}>
        <Link to="/crests">← All crests</Link> · slug <code>{slug}</code>
      </PageHeader>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
            <Full size={240} title={`${asset.name} (full)`} />
          </div>
          <div className="asset-name">{baseName}</div>
          <div className="asset-slug">full</div>
        </div>

        {Mini ? (
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
              <Mini size={240} title={`${asset.name} (mini)`} />
            </div>
            <div className="asset-name">{baseName}.Mini</div>
            <div className="asset-slug">mini</div>
          </div>
        ) : (
          <div className="card" style={{ textAlign: "center", opacity: 0.6 }}>
            <div style={{ padding: "48px 0" }}>No mini tier for this crest.</div>
          </div>
        )}
      </div>
    </div>
  )
}
