import type { Tokens } from "../tokens/types"

export type BoxProps = {
  padding?: keyof Tokens["spacing"]
  margin?: keyof Tokens["spacing"]
  background?: "primary" | "secondary" | "background" | "surface"
  border?: boolean
  radius?: keyof Tokens["radius"]
  children?: React.ReactNode
}

export function Box({ padding, margin, background, border, radius, children }: BoxProps) {
  const style: React.CSSProperties = {
    ...(padding !== undefined && { padding: `var(--spacing-${padding})` }),
    ...(margin !== undefined && { margin: `var(--spacing-${margin})` }),
    ...(background !== undefined && { background: `var(--color-${background})` }),
    ...(border === true && { border: "1px solid var(--color-border)" }),
    ...(radius !== undefined && { borderRadius: `var(--radius-${radius})` }),
  }

  return <div style={style}>{children}</div>
}
