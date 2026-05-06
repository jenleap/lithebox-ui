export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  onClick?: () => void
}

const variantStyles: Record<"primary" | "secondary" | "ghost", React.CSSProperties> = {
  primary: {
    background: "var(--color-primary)",
    color: "var(--color-text-primary)",
    border: "none",
  },
  secondary: {
    background: "var(--color-surface)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-text-primary)",
    border: "none",
  },
}

const paddingMap: Record<"sm" | "md" | "lg", string> = {
  sm: "var(--spacing-xs) var(--spacing-sm)",
  md: "var(--spacing-sm) var(--spacing-md)",
  lg: "var(--spacing-md) var(--spacing-lg)",
}

const fontSizeMap: Record<"sm" | "md" | "lg", string> = {
  sm: "var(--font-size-sm)",
  md: "var(--font-size-md)",
  lg: "var(--font-size-lg)",
}

export function Button({ variant = "primary", size = "md", children, onClick }: ButtonProps) {
  const style: React.CSSProperties = {
    ...variantStyles[variant],
    padding: paddingMap[size],
    fontSize: fontSizeMap[size],
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-family)",
    fontWeight: "var(--font-weight-medium)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}
