import type { Tokens } from "./types"

export function tokensToCSSVariables(tokens: Tokens): Record<string, string> {
  return {
    "--color-primary": tokens.color.primary,
    "--color-secondary": tokens.color.secondary,
    "--color-background": tokens.color.background,
    "--color-surface": tokens.color.surface,
    "--color-text-primary": tokens.color.text.primary,
    "--color-text-secondary": tokens.color.text.secondary,
    "--color-border": tokens.color.border,
    "--color-error": tokens.color.error,

    "--radius-sm": tokens.radius.sm,
    "--radius-md": tokens.radius.md,
    "--radius-lg": tokens.radius.lg,

    "--spacing-xs": tokens.spacing.xs,
    "--spacing-sm": tokens.spacing.sm,
    "--spacing-md": tokens.spacing.md,
    "--spacing-lg": tokens.spacing.lg,
    "--spacing-xl": tokens.spacing.xl,

    "--font-family": tokens.typography.fontFamily,
    "--font-size-sm": tokens.typography.size.sm,
    "--font-size-md": tokens.typography.size.md,
    "--font-size-lg": tokens.typography.size.lg,
    "--font-size-xl": tokens.typography.size.xl,
    "--font-weight-regular": String(tokens.typography.weight.regular),
    "--font-weight-medium": String(tokens.typography.weight.medium),
    "--font-weight-bold": String(tokens.typography.weight.bold),

    "--shadow-sm": tokens.shadow.sm,
    "--shadow-md": tokens.shadow.md
  }
}
