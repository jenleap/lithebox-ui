# Task 005: Status Components

## Feature
F009 — Data Display System

## Description
Implement `Badge` and `StatusIndicator` — two small semantic status components. `Badge` is a labeled pill for categorical status. `StatusIndicator` is a minimal dot for online/offline/active/inactive-style states.

## Files
- `src/components/Badge.tsx` (create)
- `src/components/StatusIndicator.tsx` (create)
- `src/index.ts` (modify — add exports)

## Implementation Steps

1. Create `src/components/Badge.tsx`:

   **Types:**
   ```ts
   export type BadgeVariant = "default" | "success" | "warning" | "error" | "info"

   export type BadgeProps = {
     variant?: BadgeVariant
     children: React.ReactNode
   }
   ```

   **Implementation:**
   - Import `BadgeContract` from `"../contracts/BadgeContract"`
   - The five variant fallback color sets (used when semantic tokens are unresolved):
     ```ts
     const variantFallbacks: Record<BadgeVariant, { background: string; color: string; border: string }> = {
       default: { background: "#f4f4f5", color: "#52525b", border: "#e4e4e7" },
       success: { background: "#dcfce7", color: "#16a34a", border: "#bbf7d0" },
       warning: { background: "#fef9c3", color: "#ca8a04", border: "#fef08a" },
       error:   { background: "#fee2e2", color: "#dc2626", border: "#fecaca" },
       info:    { background: "#dbeafe", color: "#2563eb", border: "#bfdbfe" },
     }
     ```
   - Resolve `variant` (default `"default"`)
   - Apply inline styles:
     - `display: "inline-flex"`, `alignItems: "center"`
     - `paddingLeft`/`paddingRight` from `BadgeContract.spacing.paddingX` via `resolveSlot` (fallback `"6px"`)
     - `paddingTop`/`paddingBottom` from `BadgeContract.spacing.paddingY` via `resolveSlot` (fallback `"2px"`)
     - `borderRadius` from `BadgeContract.radius` via `resolveSlot` (fallback `"9999px"`)
     - `background`, `color`, `border` from `variantFallbacks[variant]`
     - `fontSize: "0.75rem"`, `fontWeight: 500`, `lineHeight: 1`, `border: "1px solid ..."`
   - Render `children` inside a `<span>`

2. Create `src/components/StatusIndicator.tsx`:

   **Types:**
   ```ts
   export type StatusIndicatorVariant = "default" | "success" | "warning" | "error" | "info"

   export type StatusIndicatorProps = {
     variant?: StatusIndicatorVariant
     label?: string
   }
   ```

   **Implementation:**
   - Import `StatusIndicatorContract` from `"../contracts/StatusIndicatorContract"`
   - The five variant dot colors (fallbacks):
     ```ts
     const dotFallbacks: Record<StatusIndicatorVariant, string> = {
       default: "#a1a1aa",
       success: "#22c55e",
       warning: "#eab308",
       error:   "#ef4444",
       info:    "#3b82f6",
     }
     ```
   - Render as `<span>` with `display: "inline-flex"`, `alignItems: "center"`, `gap: "6px"`
   - Render a dot `<span>` with:
     - `width` and `height` from `StatusIndicatorContract.size` resolved via `resolveSlot` (fallback `"8px"`)
     - `borderRadius: "50%"`
     - `background` from `dotFallbacks[variant ?? "default"]`
     - `display: "inline-block"`, `flexShrink: 0`
   - If `label` provided, render it as `<span>` with `fontSize: "0.875rem"`

3. Update `src/index.ts` — add:
   ```ts
   export { Badge } from "./components/Badge"
   export type { BadgeProps, BadgeVariant } from "./components/Badge"
   export { StatusIndicator } from "./components/StatusIndicator"
   export type { StatusIndicatorProps, StatusIndicatorVariant } from "./components/StatusIndicator"
   ```

## Constraints
- Variant color fallbacks are acceptable for MVP — semantic color tokens for `success/warning/error/info` do not yet exist in `defaultTokens`
- `Badge` must never use arbitrary color props — only the five semantic variants
- `StatusIndicator` is display-only — no click handler or interaction state
- Both components are `inline-flex` elements suitable for use inside table cells and list items

## Acceptance Criteria
- `Badge` renders with correct background, text, and border color for all five variants
- `StatusIndicator` renders a colored dot with optional label for all five variants
- Both components are `inline-flex` and compose correctly inside table cells
- All exported from `src/index.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no type errors
2. Verify in Storybook (task 008): all five variants render with distinct colors for both `Badge` and `StatusIndicator`

## Notes
The hardcoded fallback colors follow Tailwind's default palette — they are predictable and match common design system conventions. They can be replaced with resolved semantic tokens once those are added to `defaultTokens` in a future feature.
