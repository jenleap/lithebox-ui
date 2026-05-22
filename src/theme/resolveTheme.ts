import { mergeTokens } from "../tokens/mergeTokens"
import { lightTokens } from "./lightTokens"
import { darkTokens } from "./darkTokens"
import type { Tokens } from "../tokens/types"
import type { ThemeMode } from "./types"

export function resolveThemeTokens(
  mode: ThemeMode,
  customTokens?: Partial<Tokens>
): Tokens {
  const base = mode === "dark" ? darkTokens : lightTokens
  return mergeTokens(base, customTokens)
}
