import type { Tokens } from "../tokens/types"

export type RowProps = {
  gap?: keyof Tokens["spacing"]
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

export function Row({ gap, justify, align, children }: RowProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    ...(gap !== undefined && { gap: `var(--spacing-${gap})` }),
    ...(justify !== undefined && { justifyContent: justifyMap[justify] }),
    ...(align !== undefined && { alignItems: alignMap[align] }),
  }

  return <div style={style}>{children}</div>
}
