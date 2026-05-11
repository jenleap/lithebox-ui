import type { InteractionContract } from "../interactions"

export const CardInteractionContract: InteractionContract = {
  states: ["idle", "hover", "active"],
  interactions: {
    click: "allowed",
    hover: "system-managed",
  },
  transitions: {},
} as const
