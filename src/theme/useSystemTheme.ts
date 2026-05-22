import { useState, useEffect } from "react"
import type { ThemeMode } from "./types"

function getSystemMode(): ThemeMode {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function useSystemTheme(): ThemeMode {
  const [systemMode, setSystemMode] = useState<ThemeMode>(getSystemMode)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    function handleChange(e: MediaQueryListEvent) {
      setSystemMode(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return systemMode
}
