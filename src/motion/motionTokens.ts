import type { DurationTokens, EasingTokens, MotionScaleTokens, MotionTokens } from "./types"

export const duration: DurationTokens = {
  fast: "120ms",
  normal: "200ms",
  slow: "320ms",
} as const

export const easing: EasingTokens = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  enter: "cubic-bezier(0, 0, 0.2, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const

export const motionScale: MotionScaleTokens = {
  none: 0,
  subtle: 1,
  standard: 2,
  expressive: 3,
} as const

export const motionTokens: MotionTokens = {
  duration,
  easing,
  scale: motionScale,
} as const
