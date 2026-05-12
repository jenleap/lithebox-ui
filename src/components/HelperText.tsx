import { resolveSlot } from "../contracts/resolveContract"

export type HelperTextProps = {
  children: React.ReactNode
}

export function HelperText({ children }: HelperTextProps) {
  const style: React.CSSProperties = {
    color: resolveSlot("color.text.secondary"),
    fontSize: resolveSlot("typography.size.sm"),
  }

  return <p style={style}>{children}</p>
}
