import type { Tokens } from "./types"

export function mergeTokens(base: Tokens, overrides?: Partial<Tokens>): Tokens {
  if (!overrides) return base

  return {
    ...base,
    ...overrides,

    color: {
      ...base.color,
      ...overrides.color,
      text: {
        ...base.color.text,
        ...overrides.color?.text
      }
    },

    radius: {
      ...base.radius,
      ...overrides.radius
    },

    spacing: {
      ...base.spacing,
      ...overrides.spacing
    },

    typography: {
      ...base.typography,
      ...overrides.typography,
      size: {
        ...base.typography.size,
        ...overrides.typography?.size
      },
      weight: {
        ...base.typography.weight,
        ...overrides.typography?.weight
      }
    },

    shadow: {
      ...base.shadow,
      ...overrides.shadow
    }
  }
}
