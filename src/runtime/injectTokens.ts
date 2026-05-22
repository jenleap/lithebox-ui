import { tokensToCSSVariables } from "../tokens/tokensToCSSVariables"
import type { Tokens } from "../tokens/types"

export function injectTokens(tokens: Tokens): () => void {
  if (typeof document === "undefined") return () => {}

  const cssVars = tokensToCSSVariables(tokens)
  const root = document.documentElement

  for (const [key, value] of Object.entries(cssVars)) {
    root.style.setProperty(key, value)
  }

  return () => {
    for (const key of Object.keys(cssVars)) {
      root.style.removeProperty(key)
    }
  }
}
