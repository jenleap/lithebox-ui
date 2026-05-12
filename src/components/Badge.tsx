import { BadgeContract } from "../contracts/BadgeContract"
import { resolveSlot } from "../contracts/resolveContract"

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info"

export type BadgeProps = {
  variant?: BadgeVariant
  children: React.ReactNode
}

const variantFallbacks: Record<BadgeVariant, { background: string; color: string; border: string }> = {
  default: { background: "#f4f4f5", color: "#52525b", border: "#e4e4e7" },
  success: { background: "#dcfce7", color: "#16a34a", border: "#bbf7d0" },
  warning: { background: "#fef9c3", color: "#ca8a04", border: "#fef08a" },
  error:   { background: "#fee2e2", color: "#dc2626", border: "#fecaca" },
  info:    { background: "#dbeafe", color: "#2563eb", border: "#bfdbfe" },
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const fallback = variantFallbacks[variant]

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: resolveSlot(BadgeContract.spacing.paddingX),
    paddingRight: resolveSlot(BadgeContract.spacing.paddingX),
    paddingTop: resolveSlot(BadgeContract.spacing.paddingY),
    paddingBottom: resolveSlot(BadgeContract.spacing.paddingY),
    borderRadius: resolveSlot(BadgeContract.radius),
    background: fallback.background,
    color: fallback.color,
    border: `1px solid ${fallback.border}`,
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1,
  }

  return <span style={style}>{children}</span>
}
