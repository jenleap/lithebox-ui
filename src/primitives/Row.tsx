import { useContext } from "react"
import { ResponsiveContext } from "../responsive/ResponsiveContext"
import { resolveResponsiveValue } from "../responsive/responsiveContract"
import type { Tokens } from "../tokens/types"
import type { ResponsiveValue } from "../responsive/types"

type SpacingKey = keyof Tokens["spacing"]

export type RowProps = {
  gap?: SpacingKey | ResponsiveValue<SpacingKey>
  wrap?: boolean | ResponsiveValue<boolean>
  justify?: "start" | "center" | "end" | "between"
  align?: "start" | "center" | "end" | "stretch"
  children?: React.ReactNode
}

const justifyMap: Record<NonNullable<RowProps["justify"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
}

const alignMap: Record<NonNullable<RowProps["align"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
}

export function Row({ gap, wrap, justify, align, children }: RowProps) {
  const { breakpoint } = useContext(ResponsiveContext)

  const resolvedGap =
    gap !== undefined && typeof gap === "object"
      ? resolveResponsiveValue(gap, breakpoint)
      : gap

  const resolvedWrap =
    wrap !== undefined && typeof wrap === "object"
      ? resolveResponsiveValue(wrap, breakpoint)
      : wrap

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    ...(resolvedGap !== undefined && { gap: `var(--spacing-${resolvedGap})` }),
    ...(resolvedWrap !== undefined && { flexWrap: resolvedWrap ? "wrap" : "nowrap" }),
    ...(justify !== undefined && { justifyContent: justifyMap[justify] }),
    ...(align !== undefined && { alignItems: alignMap[align] }),
  }

  return <div style={style}>{children}</div>
}
