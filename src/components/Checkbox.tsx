import { InputContract } from "../contracts/InputContract"
import { resolveSlot } from "../contracts/resolveContract"

export type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  error?: boolean
  id?: string
}

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  error = false,
  id,
}: CheckboxProps) {
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

  return (
    <div style={wrapperStyle}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      {label && (
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
      )}
    </div>
  )
}
