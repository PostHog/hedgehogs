import type { ReactNode } from "react"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  children?: ReactNode
}

/** Standard page heading: small eyebrow + title + optional lede paragraph. */
export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </header>
  )
}
