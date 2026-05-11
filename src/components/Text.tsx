import { TextContract } from "../contracts/TextContract"
import { resolveSlot } from "../contracts/resolveContract"
import { validateVariant } from "../contracts/validateContract"

export type TextProps = {
  size?: keyof typeof TextContract.size
  weight?: keyof typeof TextContract.weight
  color?: keyof typeof TextContract.color
  children: React.ReactNode
}

export function Text({ size, weight, color, children }: TextProps) {
  validateVariant(TextContract.size, "size", size, "Text")
  validateVariant(TextContract.weight, "weight", weight, "Text")
  validateVariant(TextContract.color, "color", color, "Text")

  const style: React.CSSProperties = {
    fontFamily: resolveSlot(TextContract.base.fontFamily),
    lineHeight: TextContract.base.lineHeight,
    ...(size !== undefined && { fontSize: resolveSlot(TextContract.size[size]) }),
    ...(weight !== undefined && { fontWeight: resolveSlot(TextContract.weight[weight]) }),
    ...(color !== undefined && { color: resolveSlot(TextContract.color[color]) }),
  }

  return <span style={style}>{children}</span>
}
