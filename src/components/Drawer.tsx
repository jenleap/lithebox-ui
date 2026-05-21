import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"
import { focusManager } from "../a11y/focusManager"
import { useFocusTrap } from "../a11y/useFocusTrap"
import { DrawerA11yContract } from "../a11y/ariaContracts"
import { useMotionTransition } from "../motion/useMotionTransition"
import { DrawerLeftMotionContract, DrawerRightMotionContract, BannerMotionContract } from "../motion/contracts"
import { duration } from "../motion/motionTokens"

const BackdropMotionContract = BannerMotionContract

export type DrawerProps = {
  open: boolean
  onClose: () => void
  side?: "left" | "right"
  children?: React.ReactNode
}

export function Drawer({ open, onClose, side = "left", children }: DrawerProps) {
  const { portalRoot } = useOverlay({ id: "drawer", layer: "drawer" })
  const panelRef = useRef<HTMLDivElement>(null)
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

  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    focusManager.push(panelRef.current)
    return () => focusManager.pop()
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const contract = side === "right" ? DrawerRightMotionContract : DrawerLeftMotionContract
  const backdropMotion = useMotionTransition(BackdropMotionContract, open)
  const panelMotion = useMotionTransition(contract, open)

  if (!mounted || !portalRoot) return null

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: LAYER_Z_INDEX.drawer,
    background: "rgba(0, 0, 0, 0.4)",
    ...backdropMotion,
  }

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    [side === "right" ? "right" : "left"]: 0,
    width: "var(--spacing-drawer, 320px)",
    zIndex: LAYER_Z_INDEX.drawer + 1,
    background: "var(--color-surface)",
    boxShadow: "var(--shadow-lg, 0 8px 24px rgba(0,0,0,0.15))",
    padding: "var(--spacing-lg)",
    overflowY: "auto",
    outline: "none",
    ...panelMotion,
  }

  return ReactDOM.createPortal(
    <>
      <div style={backdropStyle} onClick={onClose} />
      <div
        ref={panelRef}
        role={DrawerA11yContract.role}
        aria-modal="true"
        tabIndex={-1}
        style={panelStyle}
      >
        {children}
      </div>
    </>,
    portalRoot
  )
}
