export const BadgeContract = {
  variants: {
    default: {
      background: "color.surface",
      text: "color.text.secondary",
      border: "color.border",
    },
    success: {
      background: "color.success.surface",
      text: "color.success.text",
      border: "color.success.border",
    },
    warning: {
      background: "color.warning.surface",
      text: "color.warning.text",
      border: "color.warning.border",
    },
    error: {
      background: "color.error.surface",
      text: "color.error.text",
      border: "color.error.border",
    },
    info: {
      background: "color.info.surface",
      text: "color.info.text",
      border: "color.info.border",
    },
  },
  spacing: {
    paddingX: "spacing.sm",
    paddingY: "spacing.xs",
  },
  radius: "radius.full",
} as const
