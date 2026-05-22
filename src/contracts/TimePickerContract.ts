export const TimePickerContract = {
  container: {
    background: "color.surface",
    border: "color.border",
    text: "color.text.primary",
  },
  states: {
    focus: {
      border: "color.primary",
    },
    error: {
      border: "color.error",
    },
    disabled: {
      background: "color.surface",
      text: "color.text.secondary",
    },
  },
  segment: {
    text: "color.text.primary",
    placeholder: "color.text.secondary",
    activeBackground: "color.primary",
    hoverBackground: "color.border",
  },
  separator: {
    color: "color.text.secondary",
  },
  spacing: {
    containerPadding: "spacing.sm",
    segmentPadding: "spacing.xs",
    separatorGap: "spacing.xs",
  },
  radius: {
    container: "radius.md",
    segment: "radius.sm",
  },
  typography: {
    fontSize: "typography.size.md",
    fontFamily: "typography.fontFamily",
    weight: "typography.weight.medium",
  },
} as const
