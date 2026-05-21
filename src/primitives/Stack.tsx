import { useContext } from "react"
import { ResponsiveContext } from "../responsive/ResponsiveContext"
import { resolveResponsiveValue } from "../responsive/responsiveContract"
import type { Tokens } from "../tokens/types"
import type { ResponsiveValue } from "../responsive/types"

type SpacingKey = keyof Tokens["spacing"]
type Direction = "row" | "column"

export type StackProps = {
  gap?: SpacingKey | ResponsiveValue<SpacingKey>
  direction?: Direction | ResponsiveValue<Direction>
  align?: "start" | "center" | "end" | "stretch"
  children?: React.ReactNode
}

const alignMap: Record<NonNullable<StackProps["align"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
}

export function Stack({ gap, direction, align, children }: StackProps) {
  const { breakpoint } = useContext(ResponsiveContext)

  const resolvedGap =
    gap !== undefined && typeof gap === "object"
      ? resolveResponsiveValue(gap, breakpoint)
      : gap

  const resolvedDirection =
    direction !== undefined && typeof direction === "object"
      ? resolveResponsiveValue(direction, breakpoint) ?? "column"
      : (direction ?? "column")

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: resolvedDirection,
    ...(resolvedGap !== undefined && { gap: `var(--spacing-${resolvedGap})` }),
    ...(align !== undefined && { alignItems: alignMap[align] }),
  }

  return <div style={style}>{children}</div>
}
