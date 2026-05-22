import type { Tokens } from "../tokens/types"

export type ThemeMode = "light" | "dark"

export type ThemeModeContextValue = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

export type ThemeWithMode = {
  mode: ThemeMode
  tokens: Tokens
}
