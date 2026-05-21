import { ListContract } from "../contracts/ListContract"
import { resolveSlot } from "../contracts/resolveContract"
import { useBreakpoint } from "../responsive/useBreakpoint"
import type { ResponsiveValue } from "../responsive/types"
import { resolveResponsiveValue } from "../responsive/responsiveContract"

export type ListSpacing = "sm" | "md" | "lg"

export type ListProps = {
  children: React.ReactNode
  spacing?: ListSpacing | ResponsiveValue<ListSpacing>
}

export type ListItemProps = {
  children: React.ReactNode
}

const densityToSpacing: Record<string, ListSpacing> = {
  compact: "sm",
  comfortable: "md",
}

export function List({ children, spacing }: ListProps) {
  const { breakpoint, isMobile } = useBreakpoint()

  let resolvedSpacing: ListSpacing
  if (spacing === undefined) {
    resolvedSpacing = densityToSpacing[isMobile ? "compact" : "comfortable"] as ListSpacing
  } else if (typeof spacing === "object") {
    resolvedSpacing = resolveResponsiveValue(spacing, breakpoint) ?? "md"
  } else {
    resolvedSpacing = spacing
  }

  const style: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot(ListContract.spacing[resolvedSpacing]),
  }

  return <ul style={style}>{children}</ul>
}

export function ListItem({ children }: ListItemProps) {
  const style: React.CSSProperties = {
    padding: `${resolveSlot("spacing.sm")} 0`,
    borderBottom: `1px solid ${resolveSlot(ListContract.item.border)}`,
    color: resolveSlot(ListContract.item.text),
  }

  return <li style={style}>{children}</li>
}
