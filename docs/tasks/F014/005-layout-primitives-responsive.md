# Task 005: Layout Primitives Responsive Integration

## Feature
F014 - Responsive System

## Description
Update the Box, Stack, and Row layout primitives to accept responsive prop values via the `ResponsiveValue<T>` type. Components read the current breakpoint from `useBreakpoint` and resolve responsive props to their concrete values at render time.

## Files
- `src/primitives/Box.tsx` (modify)
- `src/primitives/Stack.tsx` (modify)
- `src/primitives/Row.tsx` (modify)

## Implementation Steps

### Box.tsx

1. Import `ResponsiveValue` from `src/responsive/types.ts` and `useBreakpoint` from `src/responsive/useBreakpoint.ts`.
2. Import `resolveResponsiveValue` from `src/responsive/responsiveContract.ts`.
3. Update `BoxProps` to accept responsive `padding` and `gap` props:
   ```ts
   padding?: string | ResponsiveValue<string>
   gap?: string | ResponsiveValue<string>
   ```
4. In the component body, call `useBreakpoint()` to get the current `breakpoint`.
5. Before applying styles, resolve any `ResponsiveValue` props:
   - If the prop is a plain string, use it as-is
   - If it is an object with breakpoint keys, call `resolveResponsiveValue(prop, breakpoint)`
6. Pass the resolved values to the existing style logic.

### Stack.tsx

1. Apply the same responsive prop pattern for `gap`:
   ```ts
   gap?: string | ResponsiveValue<string>
   ```
2. Also accept a responsive `direction` prop:
   ```ts
   direction?: "row" | "column" | ResponsiveValue<"row" | "column">
   ```
3. Resolve both using `resolveResponsiveValue` at render time.

### Row.tsx

1. Apply the same responsive `gap` prop pattern as Stack.
2. Accept a responsive `wrap` prop:
   ```ts
   wrap?: boolean | ResponsiveValue<boolean>
   ```
3. Resolve using `resolveResponsiveValue` at render time.

## Constraints
- Do not break any existing prop types or behavior
- Responsive resolution must only run when `useBreakpoint` is available (the component must be inside `ResponsiveProvider`)
- If `useBreakpoint` returns an undefined breakpoint, fall back to the plain string/boolean value
- No ad hoc media queries — all responsive logic must go through `resolveResponsiveValue`

## Acceptance Criteria
- `Box` accepts `padding={{ sm: "4px", lg: "16px" }}` and renders the correct value per breakpoint
- `Stack` switches `direction` from `"column"` at `sm` to `"row"` at `lg`
- `Row` accepts `gap` as a `ResponsiveValue<string>`
- All three components compile without TypeScript errors
- Existing non-responsive usage is unchanged

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render `<Box padding={{ sm: "4px", lg: "16px" }} />` inside a `ResponsiveProvider` — verify style changes per breakpoint

## Notes
Keep the change surgical — only add the responsive-capable props. Do not refactor the full component.
