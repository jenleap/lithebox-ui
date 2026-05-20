import { InputContract } from "../contracts/InputContract"
import { InputInteractionContract } from "../contracts/InputInteractionContract"
import { resolveSlot } from "../contracts/resolveContract"
import { useInteractionState } from "../interactions"
import { resolveA11yState } from "../a11y/resolveA11yState"

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  id?: string
  "aria-describedby"?: string
}

export function Select({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  error = false,
  id,
  "aria-describedby": ariaDescribedBy,
}: SelectProps) {
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
    appearance: "auto",
  }

  const style: React.CSSProperties = { ...baseStyle, ...stateStyles }
  const a11yProps = resolveA11yState({ disabled, error })

  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      style={style}
      aria-describedby={ariaDescribedBy}
      {...a11yProps}
      {...interactionProps}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
