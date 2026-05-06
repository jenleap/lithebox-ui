# Task T006: Theme Provider

## Feature
F001-theme-token-system

## Description
Create the `ThemeProvider` React component and `useTheme` hook. The provider merges tokens, generates CSS variables, injects them into the DOM via an inline style block, and exposes resolved tokens via React Context.

## Files
- `src/theme/ThemeProvider.tsx` (create)

## Implementation Steps
1. Create `src/theme/ThemeProvider.tsx`
2. Import dependencies:
   - `React, { createContext, useContext, useMemo }` from `"react"`
   - `defaultTokens` from `"../tokens/defaultTokens"`
   - `mergeTokens` from `"../tokens/mergeTokens"`
   - `tokensToCSSVariables` from `"../tokens/tokensToCSSVariables"`
   - `Tokens` from `"../tokens/types"`
3. Create the context with `defaultTokens` as the default value:
   ```ts
   const ThemeContext = createContext<Tokens>(defaultTokens)
   ```
4. Implement `ThemeProvider` component:
   - Props: `tokens?: Partial<Tokens>`, `children: React.ReactNode`
   - Use `useMemo` to compute `resolvedTokens = mergeTokens(defaultTokens, tokens)` (dep: `[tokens]`)
   - Use `useMemo` to compute `cssVariables = tokensToCSSVariables(resolvedTokens)` (dep: `[resolvedTokens]`)
   - Return:
     ```tsx
     <ThemeContext.Provider value={resolvedTokens}>
       <div style={cssVariables as React.CSSProperties}>
         {children}
       </div>
     </ThemeContext.Provider>
     ```
5. Implement `useTheme` hook:
   ```ts
   export function useTheme(): Tokens {
     return useContext(ThemeContext)
   }
   ```
6. Export both `ThemeProvider` and `useTheme` as named exports

## Constraints
- No class components
- Use `useMemo` for both derived values to avoid unnecessary recomputation
- CSS variables injected via inline `style` prop on a wrapper `div`
- `ThemeContext` must not be exported (internal implementation detail)
- `useTheme` must return a fully typed `Tokens` object, never `undefined`

## Acceptance Criteria
- `src/theme/ThemeProvider.tsx` exists
- `ThemeProvider` accepts optional `tokens` and `children` props
- Renders children inside a `div` with CSS variables applied as inline styles
- CSS variables reflect any overrides provided via `tokens` prop
- `useTheme()` called inside the provider returns the resolved token set
- `useTheme()` called outside any provider returns `defaultTokens`
- `npm run lint` passes

## Test Steps
1. Run `npm run lint` — should pass
2. In a test: render `<ThemeProvider><div /></ThemeProvider>` and verify the wrapper div has `--color-primary` in its style attribute
3. In a test: render `<ThemeProvider tokens={{ color: { primary: "#FF0000" } }}><Consumer /></ThemeProvider>` where Consumer calls `useTheme()` — verify `color.primary === "#FF0000"`
4. In a test: call `useTheme()` outside a provider — verify it returns `defaultTokens`

## Notes
The wrapper `div` is intentional — it is the DOM injection point for CSS variables. All children inherit these variables via CSS cascade.
