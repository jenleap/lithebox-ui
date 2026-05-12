import { InputContract } from "../contracts/InputContract"
import { InputInteractionContract } from "../contracts/InputInteractionContract"
import { resolveSlot } from "../contracts/resolveContract"
import { useInteractionState } from "../interactions"

export type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  id?: string
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  id,
}: InputProps) {
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
  }

  const style: React.CSSProperties = { ...baseStyle, ...stateStyles }

  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
      {...interactionProps}
    />
  )
}
