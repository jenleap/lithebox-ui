export const DatePickerContract = {
  trigger: {
    background: "color.surface",
    border: "color.border",
    text: "color.text.primary",
    placeholder: "color.text.secondary",
    icon: "color.text.secondary",
  },
  states: {
    focus: {
      border: "color.primary",
    },
    error: {
      border: "color.error",
      text: "color.error",
    },
    disabled: {
      background: "color.surface",
      text: "color.text.secondary",
    },
  },
  calendar: {
    background: "color.surface",
    border: "color.border",
    shadow: "shadow.md",
    header: {
      text: "color.text.primary",
      navButton: "color.text.secondary",
    },
    dayLabel: "color.text.secondary",
    day: {
      text: "color.text.primary",
      outsideMonthText: "color.text.secondary",
      hoverBackground: "color.border",
      todayText: "color.primary",
      selectedBackground: "color.primary",
      disabledText: "color.text.secondary",
    },
  },
  spacing: {
    triggerPadding: "spacing.sm",
    calendarPadding: "spacing.md",
    headerGap: "spacing.sm",
    dayGap: "spacing.xs",
  },
  radius: {
    trigger: "radius.md",
    calendar: "radius.lg",
    day: "radius.md",
  },
  typography: {
    triggerSize: "typography.size.md",
    headerSize: "typography.size.sm",
    daySize: "typography.size.sm",
    fontFamily: "typography.fontFamily",
  },
} as const
