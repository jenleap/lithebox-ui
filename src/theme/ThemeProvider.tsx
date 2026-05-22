import React, { createContext, useContext, useMemo, useState, useCallback } from "react"
import { defaultTokens } from "../tokens/defaultTokens"
import { tokensToCSSVariables } from "../tokens/tokensToCSSVariables"
import { resolveThemeTokens } from "./resolveTheme"
import { useSystemTheme } from "./useSystemTheme"
import { useThemePersistence } from "./useThemePersistence"
import { ThemeModeContext } from "./ThemeModeContext"
import type { Tokens } from "../tokens/types"
import type { ThemeMode } from "./types"

const ThemeContext = createContext<Tokens>(defaultTokens)

export type ThemeProviderProps = {
  mode?: ThemeMode
  tokens?: Partial<Tokens>
  children: React.ReactNode
}

export function ThemeProvider({ mode: modeProp, tokens, children }: ThemeProviderProps) {
  const systemMode = useSystemTheme()
  const [storedMode, persistMode] = useThemePersistence()

  const initialMode: ThemeMode = modeProp ?? storedMode ?? systemMode
  const [activeMode, setActiveMode] = useState<ThemeMode>(initialMode)

  const setMode = useCallback((next: ThemeMode) => {
    setActiveMode(next)
    persistMode(next)
  }, [persistMode])

  const toggleMode = useCallback(() => {
    setMode(activeMode === "light" ? "dark" : "light")
  }, [activeMode, setMode])

  const resolvedTokens = useMemo(
    () => resolveThemeTokens(activeMode, tokens),
    [activeMode, tokens]
  )

  const cssVariables = useMemo(
    () => tokensToCSSVariables(resolvedTokens),
    [resolvedTokens]
  )

  const modeContextValue = useMemo(
    () => ({ mode: activeMode, setMode, toggleMode }),
    [activeMode, setMode, toggleMode]
  )

  return (
    <ThemeModeContext.Provider value={modeContextValue}>
      <ThemeContext.Provider value={resolvedTokens}>
        <div data-theme={activeMode} style={cssVariables as React.CSSProperties}>
          {children}
        </div>
      </ThemeContext.Provider>
    </ThemeModeContext.Provider>
  )
}

export function useTheme(): Tokens {
  return useContext(ThemeContext)
}
