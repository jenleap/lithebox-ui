import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"
import { useMotionTransition } from "../motion/useMotionTransition"
import { DropdownMotionContract } from "../motion/contracts"
import { duration } from "../motion/motionTokens"

export type PopoverProps = {
  open: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLElement>
  children?: React.ReactNode
}

export function Popover({ open, onClose, anchorRef, children }: PopoverProps) {
  const { portalRoot } = useOverlay({ id: "popover", layer: "dropdown" })
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
    } else {
      const delay = parseInt(duration.fast, 10)
      const timer = setTimeout(() => setMounted(false), delay)
      return () => clearTimeout(timer)
    }
  }, [open])

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    })
  }, [open, anchorRef])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
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

  const panelMotion = useMotionTransition(DropdownMotionContract, open)

  if (!mounted || !portalRoot) return null

  const surfaceStyle: React.CSSProperties = {
    position: "absolute",
    top: position.top,
    left: position.left,
    zIndex: LAYER_Z_INDEX.dropdown,
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    ...panelMotion,
  }

  return ReactDOM.createPortal(
    <div
      ref={surfaceRef}
      role="dialog"
      aria-modal="true"
      style={surfaceStyle}
    >
      {children}
    </div>,
    portalRoot
  )
}
