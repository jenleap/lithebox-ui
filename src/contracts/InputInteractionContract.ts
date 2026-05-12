import type { InteractionContract } from "../interactions"

export const InputInteractionContract: InteractionContract = {
  states: ["idle", "focus", "disabled", "error"],
  interactions: {
    focus: "system-managed",
    blur: "system-managed",
    change: "allowed",
  },
  transitions: {
    disabled: "terminal",
    error: "interruptible",
  },
} as const
