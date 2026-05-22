import { createContext, useContext } from "react"
import type { ThemeModeContextValue } from "./types"

const defaultContextValue: ThemeModeContextValue = {
  mode: "light",
  setMode: () => undefined,
  toggleMode: () => undefined,
}

export const ThemeModeContext = createContext<ThemeModeContextValue>(defaultContextValue)

export function useThemeMode(): ThemeModeContextValue {
  return useContext(ThemeModeContext)
}
