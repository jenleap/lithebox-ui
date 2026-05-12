import React, { useEffect, useState } from "react"
import { notificationManager } from "../feedback/notificationManager"
import type { NotificationState } from "../feedback/types"
import { Banner } from "./Banner"

export function BannerContainer() {
  const [state, setState] = useState<NotificationState>(() => notificationManager.getState())

  useEffect(() => {
    return notificationManager.subscribe(setState)
  }, [])

  const activeBanners = state.banners.filter((b) => b.lifecycleState !== "dismissed")

  if (activeBanners.length === 0) return null

  return (
    <div aria-label="Banners" style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {activeBanners.map((banner) => (
        <Banner key={banner.id} banner={banner} />
      ))}
    </div>
  )
}
