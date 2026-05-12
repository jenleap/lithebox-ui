import { useEffect } from "react"
import { LAYER_Z_INDEX } from "./layerStack"
import { useOverlayContext } from "./OverlayManager"
import type { LayerLevel } from "./types"

type UseOverlayConfig = {
  id: string
  layer: LayerLevel
}

type UseOverlayResult = {
  portalRoot: HTMLElement | null
  zIndex: number
}

export function useOverlay({ id, layer }: UseOverlayConfig): UseOverlayResult {
  const { registerOverlay, unregisterOverlay, portalRoot } = useOverlayContext()

  useEffect(() => {
    registerOverlay({ id, layer })
    return () => unregisterOverlay(id)
  }, [id, layer])

  return { portalRoot, zIndex: LAYER_Z_INDEX[layer] }
}
