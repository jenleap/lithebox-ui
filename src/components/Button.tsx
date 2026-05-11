import { ButtonContract } from "../contracts/ButtonContract"
import { resolveSlot } from "../contracts/resolveContract"
import { validateVariant } from "../contracts/validateContract"

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = "primary", size = "md", children, onClick }: ButtonProps) {
  validateVariant(ButtonContract.variant, "variant", variant, "Button")
  validateVariant(ButtonContract.size, "size", size, "Button")

  const v = ButtonContract.variant[variant]
  const s = ButtonContract.size[size]

  const borderColor = resolveSlot(v.border)
  const border = borderColor === "transparent" || borderColor === "none"
    ? "none"
    : `1px solid ${borderColor}`

  const style: React.CSSProperties = {
    background: resolveSlot(v.background),
    color: resolveSlot(v.color),
    border,
    padding: resolveSlot(s.padding),
    fontSize: resolveSlot(s.fontSize),
    borderRadius: resolveSlot(ButtonContract.radius.default),
    fontFamily: resolveSlot(ButtonContract.base.fontFamily),
    fontWeight: resolveSlot(ButtonContract.base.fontWeight),
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}
