import type { Tokens } from "../tokens/types"

export type ContainerProps = {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: keyof Tokens["spacing"]
  background?: "primary" | "secondary" | "background" | "surface"
  children?: React.ReactNode
}

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  full: "100%",
}

export function Container({ maxWidth, padding, background, children }: ContainerProps) {
  const style: React.CSSProperties = {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    ...(maxWidth !== undefined && { maxWidth: maxWidthMap[maxWidth] }),
    ...(padding !== undefined && { padding: `var(--spacing-${padding})` }),
    ...(background !== undefined && { background: `var(--color-${background})` }),
  }

  return <div style={style}>{children}</div>
}
