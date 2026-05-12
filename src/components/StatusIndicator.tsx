import { StatusIndicatorContract } from "../contracts/StatusIndicatorContract"
import { resolveSlot } from "../contracts/resolveContract"

export type StatusIndicatorVariant = "default" | "success" | "warning" | "error" | "info"

export type StatusIndicatorProps = {
  variant?: StatusIndicatorVariant
  label?: string
}

const dotFallbacks: Record<StatusIndicatorVariant, string> = {
  default: "#a1a1aa",
  success: "#22c55e",
  warning: "#eab308",
  error:   "#ef4444",
  info:    "#3b82f6",
}

export function StatusIndicator({ variant = "default", label }: StatusIndicatorProps) {
  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  }

  const dotStyle: React.CSSProperties = {
    display: "inline-block",
    flexShrink: 0,
    width: resolveSlot(StatusIndicatorContract.size),
    height: resolveSlot(StatusIndicatorContract.size),
    borderRadius: "50%",
    background: dotFallbacks[variant],
  }

  return (
    <span style={containerStyle}>
      <span style={dotStyle} />
      {label && <span style={{ fontSize: "0.875rem" }}>{label}</span>}
    </span>
  )
}
