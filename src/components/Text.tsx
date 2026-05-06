import type { Tokens } from "../tokens/types"

export type TextProps = {
  size?: keyof Tokens["typography"]["size"]
  weight?: keyof Tokens["typography"]["weight"]
  color?: keyof Tokens["color"]["text"]
  children: React.ReactNode
}

export function Text({ size, weight, color, children }: TextProps) {
  const style: React.CSSProperties = {
    fontFamily: "var(--font-family)",
    lineHeight: 1.5,
    ...(size !== undefined && { fontSize: `var(--font-size-${size})` }),
    ...(weight !== undefined && { fontWeight: `var(--font-weight-${weight})` }),
    ...(color !== undefined && { color: `var(--color-text-${color})` }),
  }

  return <span style={style}>{children}</span>
}
