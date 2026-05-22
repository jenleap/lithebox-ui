import { useState, useCallback } from "react"
import type { ThemeMode } from "./types"

const STORAGE_KEY = "lithebox_theme_mode"

function readStoredMode(): ThemeMode | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark") return stored
    return null
  } catch {
    return null
  }
}

export function useThemePersistence(): [ThemeMode | null, (mode: ThemeMode) => void] {
  const [storedMode, setStoredMode] = useState<ThemeMode | null>(readStoredMode)

  const persist = useCallback((mode: ThemeMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // localStorage unavailable — silently skip
    }
    setStoredMode(mode)
  }, [])

  return [storedMode, persist]
}
