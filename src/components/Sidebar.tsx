import React, { createContext, useContext, useState } from "react"
import { SidebarA11yContract } from "../a11y/ariaContracts"
import { useBreakpoint } from "../responsive/useBreakpoint"
import { Drawer } from "./Drawer"

export interface SidebarModeContextValue {
  iconRail: boolean
}

export const SidebarModeContext = createContext<SidebarModeContextValue>({ iconRail: false })

export type SidebarProps = {
  children?: React.ReactNode
  label?: string
}

export function Sidebar({ children, label = "Main navigation" }: SidebarProps) {
  const { isMobile, isTablet } = useBreakpoint()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <button
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "fixed",
            top: "var(--spacing-md)",
            left: "var(--spacing-md)",
            zIndex: 100,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            padding: "var(--spacing-sm)",
            cursor: "pointer",
            lineHeight: 1,
            fontSize: "1.25rem",
          }}
        >
          ☰
        </button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="left">
          <SidebarModeContext.Provider value={{ iconRail: false }}>
            <aside
              role={SidebarA11yContract.role}
              aria-label={label}
              style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}
            >
              {children}
            </aside>
          </SidebarModeContext.Provider>
        </Drawer>
      </>
    )
  }

  const iconRail = isTablet

  const style: React.CSSProperties = {
    width: iconRail ? 60 : "var(--spacing-sidebar, 240px)",
    flexShrink: 0,
    background: "var(--color-surface)",
    borderRight: "1px solid var(--color-border)",
    padding: iconRail ? "var(--spacing-sm)" : "var(--spacing-md)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    overflowY: "auto",
    overflowX: "hidden",
  }

  return (
    <SidebarModeContext.Provider value={{ iconRail }}>
      <aside role={SidebarA11yContract.role} aria-label={label} style={style}>
        {children}
      </aside>
    </SidebarModeContext.Provider>
  )
}

export function useSidebarMode(): SidebarModeContextValue {
  return useContext(SidebarModeContext)
}
