import type { RuntimeEnvironment } from "./types"

export function detectEnvironment(): RuntimeEnvironment {
  const isBrowser = typeof window !== "undefined"

  return {
    isBrowser,
    supportsReducedMotion: isBrowser
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
    supportsHover: isBrowser
      ? window.matchMedia("(hover: hover)").matches
      : false,
    supportsPointer: isBrowser
      ? window.matchMedia("(pointer: fine)").matches
      : false,
  }
}
