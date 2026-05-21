import { BREAKPOINT_ORDER } from "./ResponsiveProvider"
import type { Breakpoint, ResponsiveDensity } from "./types"

export interface ComponentResponsiveContract<T> {
  sm?: T
  md?: T
  lg?: T
  xl?: T
  xxl?: T
}

export interface CardResponsiveContract {
  density: ResponsiveDensity
  padding: "sm" | "md" | "lg"
}

export function resolveResponsiveValue<T>(
  contract: ComponentResponsiveContract<T>,
  breakpoint: Breakpoint
): T | undefined {
  const currentIndex = BREAKPOINT_ORDER.indexOf(breakpoint)
  for (let i = currentIndex; i >= 0; i--) {
    const bp = BREAKPOINT_ORDER[i]
    const value = contract[bp]
    if (value !== undefined) return value
  }
  return undefined
}

export const CardResponsiveContractDefault: ComponentResponsiveContract<CardResponsiveContract> = {
  sm: { density: "compact", padding: "sm" },
  md: { density: "comfortable", padding: "md" },
  lg: { density: "comfortable", padding: "lg" },
} as const
