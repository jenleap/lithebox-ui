export type Tokens = {
  color: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: {
      primary: string
      secondary: string
    }
    border: string
    error: string
  }

  radius: {
    sm: string
    md: string
    lg: string
  }

  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }

  typography: {
    fontFamily: string
    size: {
      sm: string
      md: string
      lg: string
      xl: string
    }
    weight: {
      regular: number
      medium: number
      bold: number
    }
  }

  shadow: {
    sm: string
    md: string
  }
}
