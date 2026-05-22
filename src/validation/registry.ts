import type { Validator } from "./types"

const _registry: Validator[] = []

export function registerValidator(validator: Validator): void {
  _registry.push(validator)
}

export function getRegisteredValidators(): readonly Validator[] {
  return _registry
}

export function clearValidatorRegistry(): void {
  _registry.length = 0
}
