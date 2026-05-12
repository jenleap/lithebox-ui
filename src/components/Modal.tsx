import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"

export type ModalProps = {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  const { portalRoot } = useOverlay({ id: "modal", layer: "modal" })
  const surfaceRef = useRef<HTMLDivElement>(null)

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
      surfaceRef.current?.focus()
    }
  }, [open])

  if (!open || !portalRoot) return null

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: LAYER_Z_INDEX.modal,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const surfaceStyle: React.CSSProperties = {
    background: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    padding: "var(--spacing-lg)",
    maxWidth: "560px",
    width: "100%",
    outline: "none",
  }

  return ReactDOM.createPortal(
    <div style={backdropStyle} onClick={onClose}>
      <div
        ref={surfaceRef}
        tabIndex={-1}
        style={surfaceStyle}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portalRoot
  )
}
