import { Logo } from "@posthog/brand/logo"

interface EmptyStateProps {
  /** The current search text, echoed back to the user. */
  query: string
  /** Plural noun for what was searched, e.g. "hoggies" or "crests". */
  noun: string
  /** Clears the search. */
  onClear: () => void
}

/** Shown when a search returns no matches. */
export function EmptyState({ query, noun, onClear }: EmptyStateProps) {
  return (
    <div className="empty">
      <Logo.Logomark variant="mono" size={48} color="var(--text-muted)" />
      <p className="empty-title">
        No {noun} match “{query}”
      </p>
      <p className="empty-hint">Try a different search.</p>
      <button type="button" className="btn" onClick={onClear}>
        Clear search
      </button>
    </div>
  )
}
