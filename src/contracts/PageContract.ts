export const PageContract = {
  root: {
    background: "color.background",
    minHeight: "100vh",
  },
  header: {
    background: "color.surface",
    border: "color.border",
    padding: "spacing.md",
  },
  sidebar: {
    background: "color.surface",
    border: "color.border",
    width: "spacing.3xl",
  },
  content: {
    padding: "spacing.lg",
    gap: "spacing.lg",
  },
  footer: {
    background: "color.surface",
    border: "color.border",
    padding: "spacing.md",
  },
} as const
