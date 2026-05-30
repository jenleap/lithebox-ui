import type { MotionContract } from "./types"
import {
  EnterPrimitive,
  ExitPrimitive,
  SlideInLeftPrimitive,
  SlideOutLeftPrimitive,
  SlideInRightPrimitive,
  SlideOutRightPrimitive,
  FadeInPrimitive,
  FadeOutPrimitive,
} from "./primitives"

export const ModalMotionContract: MotionContract = {
  enter: EnterPrimitive,
  exit: ExitPrimitive,
}

export const DrawerLeftMotionContract: MotionContract = {
  enter: SlideInLeftPrimitive,
  exit: SlideOutLeftPrimitive,
}

export const DrawerRightMotionContract: MotionContract = {
  enter: SlideInRightPrimitive,
  exit: SlideOutRightPrimitive,
}

export const DropdownMotionContract: MotionContract = {
  enter: FadeInPrimitive,
  exit: FadeOutPrimitive,
}

export const ToastMotionContract: MotionContract = {
  enter: {
    opacity: { from: 0, to: 1 },
    transform: { from: "translateY(8px)", to: "translateY(0)" },
    duration: "normal",
    easing: "enter",
  },
  exit: {
    opacity: { from: 1, to: 0 },
    transform: { from: "translateY(0)", to: "translateY(-8px)" },
    duration: "fast",
    easing: "exit",
  },
}

export const BannerMotionContract: MotionContract = {
  enter: FadeInPrimitive,
  exit: FadeOutPrimitive,
}

export const PageMotionContract: MotionContract = {
  enter: FadeInPrimitive,
  exit: FadeOutPrimitive,
}

export const TooltipMotionContract: MotionContract = {
  enter: FadeInPrimitive,
  exit: FadeOutPrimitive,
}
