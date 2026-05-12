import { InputContract } from "../contracts/InputContract"
import { resolveSlot } from "../contracts/resolveContract"

export type LabelProps = {
  children: React.ReactNode
  required?: boolean
  disabled?: boolean
  htmlFor?: string
}

export function Label({ children, required = false, disabled = false, htmlFor }: LabelProps) {
  const style: React.CSSProperties = {
    color: disabled
      ? resolveSlot(InputContract.states.disabled.text)
      : resolveSlot(InputContract.base.text),
    fontSize: resolveSlot("typography.size.sm"),
    fontFamily: resolveSlot(InputContract.typography.fontFamily),
    fontWeight: resolveSlot("typography.weight.medium"),
    opacity: disabled ? InputContract.states.disabled.opacity : undefined,
  }

  const requiredStyle: React.CSSProperties = {
    color: resolveSlot("color.error"),
    marginLeft: "2px",
  }

  return (
    <label htmlFor={htmlFor} style={style}>
      {children}
      {required && <span style={requiredStyle}>*</span>}
    </label>
  )
}
