import React from "react"

export type TopBarProps = {
  children?: React.ReactNode
}

export function TopBar({ children }: TopBarProps) {
  const style: React.CSSProperties = {
    height: "var(--spacing-topbar, 56px)",
    flexShrink: 0,
    background: "var(--color-surface)",
    borderBottom: "1px solid var(--color-border)",
    paddingLeft: "var(--spacing-lg)",
    paddingRight: "var(--spacing-lg)",
    paddingTop: "var(--spacing-sm)",
    paddingBottom: "var(--spacing-sm)",
    display: "flex",
    alignItems: "center",
  }

  return <header style={style}>{children}</header>
}
