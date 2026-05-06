import React, { createContext, useContext, useMemo } from "react"
import { defaultTokens } from "../tokens/defaultTokens"
import { mergeTokens } from "../tokens/mergeTokens"
import { tokensToCSSVariables } from "../tokens/tokensToCSSVariables"
import type { Tokens } from "../tokens/types"

const ThemeContext = createContext<Tokens>(defaultTokens)

export function ThemeProvider({
  tokens,
  children
}: {
  tokens?: Partial<Tokens>
  children: React.ReactNode
}) {
  const resolvedTokens = useMemo(
    () => mergeTokens(defaultTokens, tokens),
    [tokens]
  )

  const cssVariables = useMemo(
    () => tokensToCSSVariables(resolvedTokens),
    [resolvedTokens]
  )

  return (
    <ThemeContext.Provider value={resolvedTokens}>
      <div style={cssVariables as React.CSSProperties}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme(): Tokens {
  return useContext(ThemeContext)
}
