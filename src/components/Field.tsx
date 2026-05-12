import { InputContract } from "../contracts/InputContract"
import { resolveSlot } from "../contracts/resolveContract"
import { ErrorText } from "./ErrorText"
import { HelperText } from "./HelperText"
import { Label } from "./Label"

export type FieldProps = {
  label?: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  htmlFor?: string
  children: React.ReactNode
}

export function Field({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  htmlFor,
  children,
}: FieldProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot(InputContract.spacing.gap),
  }

  return (
    <div style={style}>
      {label && (
        <Label htmlFor={htmlFor} required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      {children}
      {error ? <ErrorText>{error}</ErrorText> : helperText ? <HelperText>{helperText}</HelperText> : null}
    </div>
  )
}
