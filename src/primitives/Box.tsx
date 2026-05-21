import { useContext } from "react"
import { ResponsiveContext } from "../responsive/ResponsiveContext"
import { resolveResponsiveValue } from "../responsive/responsiveContract"
import type { Tokens } from "../tokens/types"
import type { ResponsiveValue } from "../responsive/types"

type SpacingKey = keyof Tokens["spacing"]

export type BoxProps = {
  padding?: SpacingKey | ResponsiveValue<SpacingKey>
  margin?: SpacingKey | ResponsiveValue<SpacingKey>
  background?: "primary" | "secondary" | "background" | "surface"
  border?: boolean
  radius?: keyof Tokens["radius"]
  children?: React.ReactNode
}

export function Box({ padding, margin, background, border, radius, children }: BoxProps) {
  const { breakpoint } = useContext(ResponsiveContext)

  const resolvedPadding =
    padding !== undefined && typeof padding === "object"
      ? resolveResponsiveValue(padding, breakpoint)
      : padding

  const resolvedMargin =
    margin !== undefined && typeof margin === "object"
      ? resolveResponsiveValue(margin, breakpoint)
      : margin

  const style: React.CSSProperties = {
    ...(resolvedPadding !== undefined && { padding: `var(--spacing-${resolvedPadding})` }),
    ...(resolvedMargin !== undefined && { margin: `var(--spacing-${resolvedMargin})` }),
    ...(background !== undefined && { background: `var(--color-${background})` }),
    ...(border === true && { border: "1px solid var(--color-border)" }),
    ...(radius !== undefined && { borderRadius: `var(--radius-${radius})` }),
  }

  return <div style={style}>{children}</div>
}
