export type DurationTokens = {
  fast: string
  normal: string
  slow: string
}

export type EasingTokens = {
  standard: string
  enter: string
  exit: string
}

export type MotionScaleTokens = {
  none: 0
  subtle: 1
  standard: 2
  expressive: 3
}

export type MotionTokens = {
  duration: DurationTokens
  easing: EasingTokens
  scale: MotionScaleTokens
}

export type MotionPhase = "enter" | "exit" | "layout"

export type TransformOrigin = "center" | "top" | "bottom" | "left" | "right"

export type MotionPrimitive = {
  opacity: { from: number; to: number }
  transform: { from: string; to: string }
  duration: keyof DurationTokens
  easing: keyof EasingTokens
}

export type MotionContract = {
  enter: MotionPrimitive
  exit: MotionPrimitive
}
