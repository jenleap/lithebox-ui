import { useState, useCallback } from "react"
import type { InteractionState, InteractionContract } from "./types"
import { resolveStateStyles } from "./stateTokenMap"

type UseInteractionStateOptions = {
  disabled?: boolean
  loading?: boolean
  contract?: InteractionContract
}

type UseInteractionStateResult = {
  state: InteractionState
  interactionProps: Pick<
    React.HTMLAttributes<HTMLElement>,
    "onMouseEnter" | "onMouseLeave" | "onMouseDown" | "onMouseUp" | "onFocus" | "onBlur"
  >
  stateStyles: React.CSSProperties
}

export function useInteractionState(
  options?: UseInteractionStateOptions,
): UseInteractionStateResult {
  const { disabled = false, loading = false, contract } = options ?? {}
  const [internalState, setInternalState] = useState<InteractionState>("idle")

  const currentState: InteractionState = disabled ? "disabled" : loading ? "loading" : internalState

  if (
    process.env.NODE_ENV === "development" &&
    contract &&
    !contract.states.includes(currentState)
  ) {
    console.warn(
      `[useInteractionState] State "${currentState}" is not listed in the interaction contract.`,
    )
  }

  const onMouseEnter = useCallback(() => {
    if (!disabled && !loading) setInternalState("hover")
  }, [disabled, loading])

  const onMouseLeave = useCallback(() => {
    if (!disabled && !loading) setInternalState("idle")
  }, [disabled, loading])

  const onMouseDown = useCallback(() => {
    if (!disabled && !loading) setInternalState("active")
  }, [disabled, loading])

  const onMouseUp = useCallback(() => {
    if (!disabled && !loading) setInternalState("hover")
  }, [disabled, loading])

  const onFocus = useCallback(() => {
    if (!disabled && !loading) setInternalState("focus")
  }, [disabled, loading])

  const onBlur = useCallback(() => {
    if (!disabled && !loading) setInternalState("idle")
  }, [disabled, loading])

  return {
    state: currentState,
    interactionProps: { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onFocus, onBlur },
    stateStyles: resolveStateStyles(currentState),
  }
}
