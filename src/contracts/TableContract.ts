export const TableContract = {
  header: {
    background: "color.surface",
    text: "color.text.secondary",
    border: "color.border",
  },
  row: {
    border: "color.border",
    hover: {
      background: "color.surface",
    },
  },
  cell: {
    text: "color.text.primary",
  },
  density: {
    comfortable: {
      padding: "spacing.md",
    },
    compact: {
      padding: "spacing.sm",
    },
  },
} as const
