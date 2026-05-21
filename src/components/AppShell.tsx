import React, { useContext } from "react"
import { ResponsiveContext } from "../responsive/ResponsiveContext"

export type SidebarMode = "full" | "icon-rail" | "hidden"

export type AppShellProps = {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children?: React.ReactNode
  onSidebarModeChange?: (mode: SidebarMode) => void
}

const SIDEBAR_FULL_WIDTH = 240
const SIDEBAR_ICON_RAIL_WIDTH = 60

export function AppShell({ sidebar, header, children, onSidebarModeChange }: AppShellProps) {
  const { isMobile, isTablet } = useContext(ResponsiveContext)

  const sidebarMode: SidebarMode = isMobile ? "hidden" : isTablet ? "icon-rail" : "full"

  React.useEffect(() => {
    onSidebarModeChange?.(sidebarMode)
  }, [sidebarMode, onSidebarModeChange])

  const sidebarWidth =
    sidebarMode === "full"
      ? SIDEBAR_FULL_WIDTH
      : sidebarMode === "icon-rail"
      ? SIDEBAR_ICON_RAIL_WIDTH
      : 0

  const shellStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    background: "var(--color-background)",
    overflow: "hidden",
  }

  const sidebarContainerStyle: React.CSSProperties = {
    width: sidebarWidth,
    flexShrink: 0,
    overflow: "hidden",
    display: sidebarMode === "hidden" ? "none" : "block",
  }

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }

  return (
    <div style={shellStyle}>
      <div style={sidebarContainerStyle}>{sidebar}</div>
      <div style={mainStyle}>
        {header}
        {children}
      </div>
    </div>
  )
}
