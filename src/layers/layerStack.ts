import type { LayerLevel } from "./types"

export const LAYER_Z_INDEX: Record<LayerLevel, number> = {
  base: 0,
  dropdown: 100,
  toast: 150,
  drawer: 200,
  modal: 300,
  critical: 400,
} as const
