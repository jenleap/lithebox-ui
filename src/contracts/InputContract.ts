export const InputContract = {
  base: {
    background: "color.surface",
    border: "color.border",
    text: "color.text.primary",
    placeholderText: "color.text.secondary",
  },
  states: {
    focus: {
      border: "color.primary",
      shadow: "none",
    },
    error: {
      border: "color.error",
      text: "color.error",
    },
    disabled: {
      background: "color.surface",
      text: "color.text.secondary",
      opacity: "0.5",
    },
  },
  spacing: {
    padding: "spacing.sm",
    gap: "spacing.xs",
  },
  radius: {
    default: "radius.md",
  },
  typography: {
    fontSize: "typography.size.md",
    fontFamily: "typography.fontFamily",
  },
} as const
