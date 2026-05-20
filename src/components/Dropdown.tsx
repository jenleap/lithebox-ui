import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"
import { DropdownA11yContract } from "../a11y/ariaContracts"

export type DropdownProps = {
  open: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement>
  children?: React.ReactNode
}

export function Dropdown({ open, onClose, anchorRef, children }: DropdownProps) {
  const { portalRoot } = useOverlay({ id: "dropdown", layer: "dropdown" })
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  // useLayoutEffect to avoid a flash at 0,0 before positioning
  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX })
  }, [open, anchorRef])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      const surface = surfaceRef.current
      if (!surface) return
      const items = Array.from(surface.querySelectorAll<HTMLElement>('[role="menuitem"]'))
      if (items.length === 0) return
      const current = document.activeElement as HTMLElement
      const idx = items.indexOf(current)
      if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = idx < items.length - 1 ? items[idx + 1] : items[0]
        next.focus()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prev = idx > 0 ? items[idx - 1] : items[items.length - 1]
        prev.focus()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      const outsideSurface = surfaceRef.current && !surfaceRef.current.contains(target)
      const outsideAnchor = anchorRef.current && !anchorRef.current.contains(target)
      if (outsideSurface && outsideAnchor) onClose()
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, onClose, anchorRef])

  if (!open || !portalRoot) return null

  const surfaceStyle: React.CSSProperties = {
    position: "absolute",
    top: position.top,
    left: position.left,
    zIndex: LAYER_Z_INDEX.dropdown,
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sm)",
    padding: "var(--spacing-xs)",
    minWidth: 160,
  }

  return ReactDOM.createPortal(
    <div ref={surfaceRef} role={DropdownA11yContract.role} style={surfaceStyle}>
      {children}
    </div>,
    portalRoot
  )
}
