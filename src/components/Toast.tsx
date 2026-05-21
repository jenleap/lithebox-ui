import React from "react"
import { resolveSlot } from "../contracts/resolveContract"
import { ToastContract } from "../contracts/ToastContract"
import type { ToastEntry } from "../feedback/types"
import { notificationManager } from "../feedback/notificationManager"
import { useMotionTransition } from "../motion/useMotionTransition"
import { ToastMotionContract } from "../motion/contracts"

type ToastProps = {
  toast: ToastEntry
}

export function Toast({ toast }: ToastProps) {
  const contract = ToastContract[toast.variant]

  const background = resolveSlot(contract.background)
  const color = resolveSlot(contract.text)
  const padding = resolveSlot(ToastContract.spacing.padding)
  const borderRadius = resolveSlot(ToastContract.radius.default)

  const motionStyles = useMotionTransition(ToastMotionContract, toast.lifecycleState !== "exiting")

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        background,
        color,
        padding,
        borderRadius,
        minWidth: "280px",
        maxWidth: "400px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "8px",
        ...motionStyles,
      }}
    >
      <div>
        {toast.title && (
          <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: toast.description ? "4px" : 0 }}>
            {toast.title}
          </div>
        )}
        {toast.description && (
          <div style={{ fontSize: "14px", opacity: 0.9 }}>{toast.description}</div>
        )}
      </div>
      {toast.dismissible && (
        <button
          onClick={() => notificationManager.dismissToast(toast.id)}
          aria-label="Dismiss notification"
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            padding: "2px",
            fontSize: "16px",
            lineHeight: 1,
            opacity: 0.8,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
