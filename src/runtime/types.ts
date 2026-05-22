export type LitheboxRuntimeConfig = {
  motion?: {
    reducedMotion?: boolean
  }
  responsive?: {
    defaultBreakpoint?: string
  }
  accessibility?: {
    focusVisibleMode?: "auto" | "always"
  }
  overlays?: {
    portalRootId?: string
  }
}

export type RuntimeEnvironment = {
  isBrowser: boolean
  supportsReducedMotion: boolean
  supportsHover: boolean
  supportsPointer: boolean
}

export type RuntimeContextValue = {
  config: LitheboxRuntimeConfig
  environment: RuntimeEnvironment
}
