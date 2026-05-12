import { resolveSlot } from "../contracts/resolveContract"

export type ErrorTextProps = {
  children: React.ReactNode
}

export function ErrorText({ children }: ErrorTextProps) {
  const style: React.CSSProperties = {
    color: resolveSlot("color.error"),
    fontSize: resolveSlot("typography.size.sm"),
  }

  return <p style={style}>{children}</p>
}
