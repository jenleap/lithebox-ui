import { ListContract } from "../contracts/ListContract"
import { resolveSlot } from "../contracts/resolveContract"

export type ListProps = {
  children: React.ReactNode
  spacing?: "sm" | "md" | "lg"
}

export type ListItemProps = {
  children: React.ReactNode
}

export function List({ children, spacing = "md" }: ListProps) {
  const style: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot(ListContract.spacing[spacing]),
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
