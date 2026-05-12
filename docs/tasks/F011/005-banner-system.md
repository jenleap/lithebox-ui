# Task 005: Banner System

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Implement the `Banner` component and `BannerContainer`. Banner renders a persistent, layout-bound feedback message. BannerContainer subscribes to the notification manager and renders all active banners. Unlike Toast, banners are not overlays — they render within the normal document flow.

## Files
- `src/components/Banner.tsx` (create)
- `src/components/BannerContainer.tsx` (create)

## Implementation Steps

1. Create `src/components/Banner.tsx`:
   ```tsx
   import React from "react"
   import { useTheme } from "../theme/ThemeProvider"
   import { resolveSlot } from "../contracts/resolveContract"
   import { BannerContract } from "../contracts/BannerContract"
   import type { BannerEntry } from "../feedback/types"
   import { notificationManager } from "../feedback/notificationManager"

   type BannerProps = {
     banner: BannerEntry
   }

   export function Banner({ banner }: BannerProps) {
     const { tokens } = useTheme()
     const contract = BannerContract[banner.variant]

     const background = resolveSlot(contract.background, tokens)
     const color = resolveSlot(contract.text, tokens)
     const borderColor = resolveSlot(contract.border, tokens)
     const padding = resolveSlot(BannerContract.spacing.padding, tokens)

     const isDismissed = banner.lifecycleState === "dismissed"

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
           opacity: isDismissed ? 0 : 1,
           transition: "opacity 300ms ease",
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
   ```

2. Create `src/components/BannerContainer.tsx`:
   ```tsx
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
   ```

## Constraints
- `BannerContainer` does not use a fixed/absolute position — it renders in document flow
- `Banner` does not auto-dismiss — it remains until `dismissBanner` is called
- No z-index on `BannerContainer` — banners are layout-bound, not overlay-bound
- `Banner` uses `role="alert"` and `aria-live="assertive"` for persistent messages; `Toast` uses `role="status"` and `aria-live="polite"` for transient ones
- Banners never block page interaction

## Acceptance Criteria
- `Banner` renders title, description, and dismiss button correctly for all four variants
- `BannerContainer` subscribes to `notificationManager` and re-renders on state changes
- `BannerContainer` returns `null` when no active banners exist
- Dismissed banners fade out before removal
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. In Storybook (task 009), add a banner and verify it renders in flow, persists, and dismisses correctly

## Notes
After this task is done, `NotificationManagerProvider` from task 004 will compile cleanly (it imports `BannerContainer`).
