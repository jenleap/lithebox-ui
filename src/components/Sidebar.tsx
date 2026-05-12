import React from "react"

export type SidebarProps = {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  const style: React.CSSProperties = {
    width: "var(--spacing-sidebar, 240px)",
    flexShrink: 0,
    background: "var(--color-surface)",
    borderRight: "1px solid var(--color-border)",
    padding: "var(--spacing-md)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    overflowY: "auto",
  }

  return <aside style={style}>{children}</aside>
}
