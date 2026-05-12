export type LayerLevel = "base" | "dropdown" | "drawer" | "modal" | "critical"

export type VisibilityState = "hidden" | "visible" | "transitioning"

export type OverlayLifecycleState = "closed" | "opening" | "open" | "closing"

export type OverlayEntry = {
  id: string
  layer: LayerLevel
}
