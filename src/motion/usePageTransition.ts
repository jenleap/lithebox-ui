import type React from "react"
import { useMotionTransition } from "./useMotionTransition"
import { PageMotionContract } from "./contracts"

export function usePageTransition(active: boolean): React.CSSProperties {
  return useMotionTransition(PageMotionContract, active)
}
