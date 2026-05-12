import React from "react"

export type ContentAreaProps = {
  children?: React.ReactNode
}

export function ContentArea({ children }: ContentAreaProps) {
  const style: React.CSSProperties = {
    flex: 1,
    overflow: "auto",
    background: "var(--color-background)",
    padding: "var(--spacing-lg)",
  }

  return <main style={style}>{children}</main>
}
