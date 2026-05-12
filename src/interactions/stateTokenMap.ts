import type { InteractionState, StateTokenMap } from "./types"

export const DEFAULT_STATE_TOKEN_MAP: StateTokenMap = {
  idle: {},
  hover: { filter: "brightness(1.08)" },
  active: { transform: "scale(0.98)", filter: "brightness(0.95)" },
  focus: {},
  disabled: { opacity: "0.5", cursor: "not-allowed", filter: "none" },
  loading: { opacity: "0.7", cursor: "progress" },
  error: { cursor: "default" },
}

export function resolveStateStyles(
  state: InteractionState,
  overrides?: StateTokenMap,
): React.CSSProperties {
  const base = DEFAULT_STATE_TOKEN_MAP[state] ?? {}
  const componentOverride = overrides?.[state] ?? {}
  return { ...base, ...componentOverride }
}
