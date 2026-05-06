export type HeadingProps = {
  level?: 1 | 2 | 3 | 4
  children: React.ReactNode
}

const sizeMap: Record<1 | 2 | 3 | 4, string> = {
  1: "var(--font-size-xl)",
  2: "var(--font-size-lg)",
  3: "var(--font-size-md)",
  4: "var(--font-size-sm)",
}

export function Heading({ level = 2, children }: HeadingProps) {
  const style: React.CSSProperties = {
    fontSize: sizeMap[level],
    fontWeight: "var(--font-weight-bold)",
    fontFamily: "var(--font-family)",
    lineHeight: 1.25,
    color: "var(--color-text-primary)",
    margin: 0,
  }

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4"

  return <Tag style={style}>{children}</Tag>
}
