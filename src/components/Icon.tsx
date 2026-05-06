import type { Tokens } from "../tokens/types"

export type IconProps = {
  size?: keyof Tokens["spacing"]
  children: React.ReactNode
}

export function Icon({ size = "md", children }: IconProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: `var(--spacing-${size})`,
    height: `var(--spacing-${size})`,
    flexShrink: 0,
  }

  return <span style={style}>{children}</span>
}
