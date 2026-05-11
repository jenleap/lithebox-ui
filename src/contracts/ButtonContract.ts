export const ButtonContract = {
  variant: {
    primary: {
      background: "color.primary",
      color: "color.text.primary",
      border: "transparent",
    },
    secondary: {
      background: "color.surface",
      color: "color.text.primary",
      border: "color.border",
    },
    ghost: {
      background: "transparent",
      color: "color.text.primary",
      border: "transparent",
    },
  },
  size: {
    sm: {
      padding: "spacing.xs spacing.sm",
      fontSize: "typography.size.sm",
    },
    md: {
      padding: "spacing.sm spacing.md",
      fontSize: "typography.size.md",
    },
    lg: {
      padding: "spacing.md spacing.lg",
      fontSize: "typography.size.lg",
    },
  },
  radius: {
    default: "radius.md",
  },
  base: {
    fontFamily: "typography.fontFamily",
    fontWeight: "typography.weight.medium",
  },
} as const
