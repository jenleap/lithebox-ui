import React from "react"
import { resolveSlot } from "../contracts/resolveContract"
import { BannerContract } from "../contracts/BannerContract"
import type { BannerEntry } from "../feedback/types"
import { notificationManager } from "../feedback/notificationManager"
import { useMotionTransition } from "../motion/useMotionTransition"
import { BannerMotionContract } from "../motion/contracts"

type BannerProps = {
  banner: BannerEntry
}

export function Banner({ banner }: BannerProps) {
  const contract = BannerContract[banner.variant]

  const background = resolveSlot(contract.background)
  const color = resolveSlot(contract.text)
  const borderColor = resolveSlot(contract.border)
  const padding = resolveSlot(BannerContract.spacing.padding)

  const motionStyles = useMotionTransition(BannerMotionContract, banner.lifecycleState !== "dismissed")

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        background,
        color,
        padding,
        borderLeft: `4px solid ${borderColor}`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "8px",
        ...motionStyles,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: banner.description ? "4px" : 0 }}>
          {banner.title}
        </div>
        {banner.description && (
          <div style={{ fontSize: "14px", opacity: 0.9 }}>{banner.description}</div>
        )}
      </div>
      {banner.dismissible && (
        <button
          onClick={() => notificationManager.dismissBanner(banner.id)}
          aria-label="Dismiss banner"
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
