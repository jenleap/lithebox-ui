import { ContentStateContract } from "../contracts/ContentStateContract"
import { resolveSlot } from "../contracts/resolveContract"
import { Heading } from "./Heading"
import { Text } from "./Text"

export type EmptyStateProps = {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: resolveSlot(ContentStateContract.container.padding),
    gap: resolveSlot(ContentStateContract.container.gap),
  }

  return (
    <div style={style}>
      {icon && <div>{icon}</div>}
      <Heading level={3}>{title}</Heading>
      {description && <Text color="secondary">{description}</Text>}
      {action && <div>{action}</div>}
    </div>
  )
}
