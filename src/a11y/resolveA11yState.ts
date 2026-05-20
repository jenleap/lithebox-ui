import type { A11yStateMap, ResolvedAriaProps } from "./types"

export function resolveA11yState(state: A11yStateMap): ResolvedAriaProps {
  const result: ResolvedAriaProps = {}

  if (state.disabled) {
    result["aria-disabled"] = true
    result.tabIndex = -1
  }

  if (state.loading) {
    result["aria-busy"] = true
    result.tabIndex = -1
  }

  if (state.error) {
    result["aria-invalid"] = true
  }

  if (state.readOnly) {
    result["aria-readonly"] = true
  }

  return result
}
