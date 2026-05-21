import type React from "react"
import type { MotionContract, MotionPrimitive } from "./types"
import { duration, easing } from "./motionTokens"
import { useReducedMotion } from "./useReducedMotion"

function buildTransitionString(primitive: MotionPrimitive): string {
  const d = duration[primitive.duration]
  const e = easing[primitive.easing]
  const hasTransform = primitive.transform.from !== "none" || primitive.transform.to !== "none"

  if (hasTransform) {
    return `opacity ${d} ${e}, transform ${d} ${e}`
  }
  return `opacity ${d} ${e}`
}

function resolvePrimitive(
  primitive: MotionPrimitive,
  phase: "from" | "to",
  reducedMotion: boolean
): React.CSSProperties {
  if (reducedMotion) {
    return {
      opacity: primitive.opacity.to,
      transition: "none",
    }
  }

  const hasTransform = primitive.transform.from !== "none" || primitive.transform.to !== "none"
  const styles: React.CSSProperties = {
    opacity: primitive.opacity[phase],
    transition: buildTransitionString(primitive),
  }

  if (hasTransform) {
    styles.transform = primitive.transform[phase]
  }

  return styles
}

export function useMotionTransition(
  contract: MotionContract,
  active: boolean
): React.CSSProperties {
  const reducedMotion = useReducedMotion()

  if (active) {
    return resolvePrimitive(contract.enter, "to", reducedMotion)
  }
  return resolvePrimitive(contract.exit, "to", reducedMotion)
}
