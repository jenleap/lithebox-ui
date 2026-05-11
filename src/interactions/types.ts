export type InteractionState = "idle" | "hover" | "active" | "focus" | "disabled" | "loading"

export type InteractionTransition = {
  from: InteractionState
  to: InteractionState
}

export interface InteractionContract {
  states: InteractionState[]
  interactions: Record<string, "allowed" | "system-managed" | "blocked">
  transitions: Partial<Record<InteractionState, "terminal" | "interruptible">>
}

export interface StateTokenOverride {
  opacity?: string
  cursor?: string
  transform?: string
  filter?: string
}

export type StateTokenMap = Partial<Record<InteractionState, StateTokenOverride>>
