import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"

export type DrawerProps = {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  children?: React.ReactNode
}

export function Drawer({ open, onClose, side = "left", children }: DrawerProps) {
  const { portalRoot } = useOverlay({ id: "drawer", layer: "drawer" })
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      panelRef.current?.focus()
    }
  }, [open])

  if (!open || !portalRoot) return null

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: LAYER_Z_INDEX.drawer,
    background: "rgba(0, 0, 0, 0.4)",
  }

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    [side === "right" ? "right" : "left"]: 0,
    width: "var(--spacing-drawer, 320px)",
    // panel sits above its own backdrop within the drawer layer
    zIndex: LAYER_Z_INDEX.drawer + 1,
    background: "var(--color-surface)",
    boxShadow: "var(--shadow-lg, 0 8px 24px rgba(0,0,0,0.15))",
    padding: "var(--spacing-lg)",
    overflowY: "auto",
    outline: "none",
  }

  return ReactDOM.createPortal(
    <>
      <div style={backdropStyle} onClick={onClose} />
      <div ref={panelRef} tabIndex={-1} style={panelStyle}>
        {children}
      </div>
    </>,
    portalRoot
  )
}
