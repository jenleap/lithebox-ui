import React from "react"

export type AppShellProps = {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  children?: React.ReactNode
}

export function AppShell({ sidebar, header, children }: AppShellProps) {
  const shellStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    background: "var(--color-background)",
    overflow: "hidden",
  }

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }

  return (
    <div style={shellStyle}>
      {sidebar}
      <div style={mainStyle}>
        {header}
        {children}
      </div>
    </div>
  )
}
