import { CopyButton } from "./CopyButton.tsx"

interface CodeBlockProps {
  /** Source to render and copy. */
  code: string
}

/** A dark code block with a copy-to-clipboard button in the corner. */
export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <div className="code">
      <CopyButton value={code} />
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
