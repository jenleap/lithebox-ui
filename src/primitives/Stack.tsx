import type { Tokens } from "../tokens/types"

export type StackProps = {
  gap?: keyof Tokens["spacing"]
  align?: "start" | "center" | "end" | "stretch"
  children?: React.ReactNode
}

const alignMap: Record<NonNullable<StackProps["align"]>, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
}

export function Stack({ gap, align, children }: StackProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    ...(gap !== undefined && { gap: `var(--spacing-${gap})` }),
    ...(align !== undefined && { alignItems: alignMap[align] }),
  }

  return <div style={style}>{children}</div>
}
