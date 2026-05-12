import React, { useEffect, useState } from "react"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { notificationManager } from "../feedback/notificationManager"
import type { NotificationState } from "../feedback/types"
import { Toast } from "./Toast"

export function ToastContainer() {
  const [state, setState] = useState<NotificationState>(() => notificationManager.getState())

  useEffect(() => {
    return notificationManager.subscribe(setState)
  }, [])

  const activeToasts = state.toasts.filter((t) => t.lifecycleState !== "removed")

  if (activeToasts.length === 0) return null

  return (
    <div
      aria-label="Notifications"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: LAYER_Z_INDEX.toast,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        pointerEvents: "none",
      }}
    >
      {activeToasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: "auto" }}>
          <Toast toast={toast} />
        </div>
      ))}
    </div>
  )
}
