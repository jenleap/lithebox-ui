import { InputContract } from "../contracts/InputContract"
import { resolveSlot } from "../contracts/resolveContract"
import { resolveA11yState } from "../a11y/resolveA11yState"

export type RadioProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  value: string
  name: string
  label?: string
  disabled?: boolean
  error?: boolean
  id?: string
}

export function Radio({
  checked,
  onChange,
  value,
  name,
  label,
  disabled = false,
  error = false,
  id,
}: RadioProps) {
  const labelColor = error
    ? resolveSlot(InputContract.states.error.text)
    : disabled
      ? resolveSlot(InputContract.states.disabled.text)
      : resolveSlot(InputContract.base.text)

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: resolveSlot(InputContract.spacing.gap),
    opacity: disabled ? InputContract.states.disabled.opacity : undefined,
    cursor: disabled ? "not-allowed" : "pointer",
  }

  const labelStyle: React.CSSProperties = {
    color: labelColor,
    fontSize: resolveSlot(InputContract.typography.fontSize),
    fontFamily: resolveSlot(InputContract.typography.fontFamily),
    cursor: disabled ? "not-allowed" : "pointer",
  }

  const a11yProps = resolveA11yState({ disabled, error })

  return (
    <div style={wrapperStyle}>
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        value={value}
        name={name}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        {...a11yProps}
      />
      {label && (
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
      )}
    </div>
  )
}
