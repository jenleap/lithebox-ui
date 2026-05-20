import React from "react"
import { SidebarA11yContract } from "../a11y/ariaContracts"

export type SidebarProps = {
  children?: React.ReactNode
  label?: string
}

export function Sidebar({ children, label = "Main navigation" }: SidebarProps) {
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

  return (
    <aside role={SidebarA11yContract.role} aria-label={label} style={style}>
      {children}
    </aside>
  )
}
