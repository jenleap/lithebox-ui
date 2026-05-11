import { ButtonContract } from "../contracts/ButtonContract"
import { ButtonInteractionContract } from "../contracts/ButtonInteractionContract"
import { resolveSlot } from "../contracts/resolveContract"
import { validateVariant } from "../contracts/validateContract"
import { useInteractionState } from "../interactions"

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  children,
  onClick,
}: ButtonProps) {
  validateVariant(ButtonContract.variant, "variant", variant, "Button")
  validateVariant(ButtonContract.size, "size", size, "Button")

  const { interactionProps, stateStyles } = useInteractionState({
    disabled,
    loading,
    contract: ButtonInteractionContract,
  })

  const v = ButtonContract.variant[variant]
  const s = ButtonContract.size[size]

  const borderColor = resolveSlot(v.border)
  const border = borderColor === "transparent" || borderColor === "none"
    ? "none"
    : `1px solid ${borderColor}`

  const baseStyle: React.CSSProperties = {
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

  const style: React.CSSProperties = { ...baseStyle, ...stateStyles }

  function handleClick() {
    if (disabled || loading) return
    onClick?.()
  }

  return (
    <button style={style} onClick={handleClick} disabled={disabled} {...interactionProps}>
      {children}
    </button>
  )
}
