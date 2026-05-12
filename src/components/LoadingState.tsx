import { ContentStateContract } from "../contracts/ContentStateContract"
import { resolveSlot } from "../contracts/resolveContract"
import { Text } from "./Text"

export type LoadingStateProps = {
  label?: string
}

export function LoadingState({ label }: LoadingStateProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: resolveSlot(ContentStateContract.container.padding),
    gap: resolveSlot(ContentStateContract.container.gap),
  }

  const spinnerStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "3px solid var(--color-border)",
    borderTopColor: "var(--color-primary, #6366f1)",
    animation: "lb-spin 0.8s linear infinite",
  }

  return (
    <div style={containerStyle}>
      <style>{`@keyframes lb-spin { to { transform: rotate(360deg) } }`}</style>
      <div style={spinnerStyle} />
      {label && <Text color="secondary">{label}</Text>}
    </div>
  )
}
