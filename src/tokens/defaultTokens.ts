import type { Tokens } from "./types"

export const defaultTokens: Tokens = {
  color: {
    primary: "#4F46E5",
    secondary: "#22C55E",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: {
      primary: "#111827",
      secondary: "#6B7280"
    },
    border: "#E5E7EB",
    error: "#EF4444"
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px"
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    size: {
      sm: "12px",
      md: "14px",
      lg: "18px",
      xl: "24px"
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 700
    }
  },

  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.1)"
  }
}
