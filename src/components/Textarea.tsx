import { InputContract } from "../contracts/InputContract"
import { InputInteractionContract } from "../contracts/InputInteractionContract"
import { resolveSlot } from "../contracts/resolveContract"
import { useInteractionState } from "../interactions"

export type TextareaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  rows?: number
  id?: string
}

export function Textarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  rows = 4,
  id,
}: TextareaProps) {
  const { state, interactionProps, stateStyles } = useInteractionState({
    disabled,
    loading: false,
    contract: InputInteractionContract,
  })

  const borderColor = error
    ? resolveSlot(InputContract.states.error.border)
    : state === "focus"
      ? resolveSlot(InputContract.states.focus.border)
      : resolveSlot(InputContract.base.border)

  const textColor = error
    ? resolveSlot(InputContract.states.error.text)
    : resolveSlot(InputContract.base.text)

  const baseStyle: React.CSSProperties = {
    background: resolveSlot(InputContract.base.background),
    color: textColor,
    border: `1px solid ${borderColor}`,
    padding: resolveSlot(InputContract.spacing.padding),
    borderRadius: resolveSlot(InputContract.radius.default),
    fontSize: resolveSlot(InputContract.typography.fontSize),
    fontFamily: resolveSlot(InputContract.typography.fontFamily),
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    resize: disabled ? "none" : "vertical",
  }

  const style: React.CSSProperties = { ...baseStyle, ...stateStyles }

  return (
    <textarea
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      style={style}
      {...interactionProps}
    />
  )
}
