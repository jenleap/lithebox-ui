export const StatusIndicatorContract = {
  variants: {
    default: { color: "color.text.secondary" },
    success: { color: "color.success.text" },
    warning: { color: "color.warning.text" },
    error: { color: "color.error.text" },
    info: { color: "color.info.text" },
  },
  size: "spacing.sm",
} as const
