import type { MotionPrimitive } from "./types"

export const EnterPrimitive: MotionPrimitive = {
  opacity: { from: 0, to: 1 },
  transform: { from: "scale(0.97) translateY(4px)", to: "scale(1) translateY(0)" },
  duration: "normal",
  easing: "enter",
} as const

export const ExitPrimitive: MotionPrimitive = {
  opacity: { from: 1, to: 0 },
  transform: { from: "scale(1) translateY(0)", to: "scale(0.97) translateY(4px)" },
  duration: "fast",
  easing: "exit",
} as const

export const SlideInLeftPrimitive: MotionPrimitive = {
  opacity: { from: 0, to: 1 },
  transform: { from: "translateX(-100%)", to: "translateX(0)" },
  duration: "normal",
  easing: "enter",
} as const

export const SlideOutLeftPrimitive: MotionPrimitive = {
  opacity: { from: 1, to: 0 },
  transform: { from: "translateX(0)", to: "translateX(-100%)" },
  duration: "fast",
  easing: "exit",
} as const

export const SlideInRightPrimitive: MotionPrimitive = {
  opacity: { from: 0, to: 1 },
  transform: { from: "translateX(100%)", to: "translateX(0)" },
  duration: "normal",
  easing: "enter",
} as const

export const SlideOutRightPrimitive: MotionPrimitive = {
  opacity: { from: 1, to: 0 },
  transform: { from: "translateX(0)", to: "translateX(100%)" },
  duration: "fast",
  easing: "exit",
} as const

export const FadeInPrimitive: MotionPrimitive = {
  opacity: { from: 0, to: 1 },
  transform: { from: "none", to: "none" },
  duration: "fast",
  easing: "enter",
} as const

export const FadeOutPrimitive: MotionPrimitive = {
  opacity: { from: 1, to: 0 },
  transform: { from: "none", to: "none" },
  duration: "fast",
  easing: "exit",
} as const

export const LayoutPrimitive: MotionPrimitive = {
  opacity: { from: 1, to: 1 },
  transform: { from: "none", to: "none" },
  duration: "normal",
  easing: "standard",
} as const
