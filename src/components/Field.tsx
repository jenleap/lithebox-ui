import React from "react"
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

  const errorId = htmlFor && error ? `${htmlFor}-error` : undefined

  const childWithA11y =
    error && errorId
      ? React.cloneElement(children as React.ReactElement<{ "aria-describedby"?: string }>, {
          "aria-describedby": errorId,
        })
      : children

  return (
    <div style={style}>
      {label && (
        <Label htmlFor={htmlFor} required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      {childWithA11y}
      {error ? (
        <ErrorText id={errorId}>{error}</ErrorText>
      ) : helperText ? (
        <HelperText>{helperText}</HelperText>
      ) : null}
    </div>
  )
}
