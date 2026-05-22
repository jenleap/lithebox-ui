import { createContext, useContext } from "react"
import type { LitheboxRuntimeConfig, RuntimeContextValue, RuntimeEnvironment } from "./types"

const defaultEnvironment: RuntimeEnvironment = {
  isBrowser: false,
  supportsReducedMotion: false,
  supportsHover: false,
  supportsPointer: false,
}

const defaultConfig: LitheboxRuntimeConfig = {}

export const RuntimeContext = createContext<RuntimeContextValue>({
  config: defaultConfig,
  environment: defaultEnvironment,
})

export function useRuntime(): RuntimeContextValue {
  return useContext(RuntimeContext)
}
