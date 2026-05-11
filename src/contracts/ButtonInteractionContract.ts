import type { InteractionContract } from "../interactions"

export const ButtonInteractionContract: InteractionContract = {
  states: ["idle", "hover", "active", "focus", "disabled", "loading"],
  interactions: {
    click: "allowed",
    hover: "system-managed",
    focus: "system-managed",
  },
  transitions: {
    disabled: "terminal",
    loading: "interruptible",
  },
} as const
