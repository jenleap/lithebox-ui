import { ContentStateContract } from "../contracts/ContentStateContract"
import { resolveSlot } from "../contracts/resolveContract"
import { Heading } from "./Heading"
import { Text } from "./Text"

export type ErrorStateProps = {
  title?: string
  description?: string
  action?: React.ReactNode
}

export function ErrorState({
  title = "Something went wrong",
  description,
  action,
}: ErrorStateProps) {
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
      <Heading level={3}>{title}</Heading>
      {description && <Text color="secondary">{description}</Text>}
      {action && <div>{action}</div>}
    </div>
  )
}
