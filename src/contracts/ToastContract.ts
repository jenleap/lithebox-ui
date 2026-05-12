export const ToastContract = {
  success: {
    background: "color.success",
    text: "color.text.inverse",
  },
  error: {
    background: "color.error",
    text: "color.text.inverse",
  },
  info: {
    background: "color.primary",
    text: "color.text.inverse",
  },
  warning: {
    background: "color.warning",
    text: "color.text.primary",
  },
  spacing: {
    padding: "spacing.md",
  },
  radius: {
    default: "radius.md",
  },
} as const
