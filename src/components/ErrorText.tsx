import { resolveSlot } from "../contracts/resolveContract"

export type ErrorTextProps = {
  children: React.ReactNode
  id?: string
}

export function ErrorText({ children, id }: ErrorTextProps) {
  const style: React.CSSProperties = {
    color: resolveSlot("color.error"),
    fontSize: resolveSlot("typography.size.sm"),
  }

  return <p id={id} style={style}>{children}</p>
}
