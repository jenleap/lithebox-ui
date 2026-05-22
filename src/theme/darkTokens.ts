import type { Tokens } from "../tokens/types"

export const darkTokens: Tokens = {
  color: {
    primary: "#818CF8",
    secondary: "#34D399",
    background: "#0B0F19",
    surface: "#111827",
    text: {
      primary: "#F9FAFB",
      secondary: "#9CA3AF"
    },
    border: "#374151",
    error: "#F87171"
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
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 6px rgba(0,0,0,0.4)"
  }
}
