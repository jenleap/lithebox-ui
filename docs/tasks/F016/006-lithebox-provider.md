# Task 006: LitheboxProvider

## Feature
F016 - Application Runtime Integration Layer

## Description
Implement the `LitheboxProvider` component — the single root provider through which applications initialize the entire Lithebox runtime. It composes all existing subsystem providers in the correct order and wires them to the centralized `LitheboxRuntimeConfig`. Uses `injectTokens` for document-level CSS variable hydration and exposes runtime state via `RuntimeContext`.

## Files
- `src/runtime/LitheboxProvider.tsx` (create)

## Implementation Steps

1. Create `src/runtime/LitheboxProvider.tsx`.

2. Import the following:
   - `React`, `useMemo` from `"react"`
   - `defaultTokens` from `"../tokens/defaultTokens"`
   - `mergeTokens` from `"../tokens/mergeTokens"`
   - `ThemeProvider` from `"../theme/ThemeProvider"`
   - `ResponsiveProvider` from `"../responsive/ResponsiveProvider"`
   - `OverlayManagerProvider` from `"../layers/OverlayManager"`
   - `NotificationManagerProvider` from `"../feedback/NotificationManagerProvider"`
   - `RuntimeContext` from `"./RuntimeContext"`
   - `detectEnvironment` from `"./detectEnvironment"`
   - `injectTokens` from `"./injectTokens"`
   - `useIsomorphicLayoutEffect` from `"./useIsomorphicLayoutEffect"`
   - `LitheboxRuntimeConfig`, `RuntimeContextValue` from `"./types"`
   - `Tokens` type from `"../tokens/types"`

3. Define props type:

   ```ts
   export type LitheboxProviderProps = {
     tokens?: Partial<Tokens>
     config?: LitheboxRuntimeConfig
     children: React.ReactNode
   }
   ```

4. Implement `LitheboxProvider`:

   ```tsx
   export function LitheboxProvider({
     tokens,
     config = {},
     children,
   }: LitheboxProviderProps) {
     const resolvedTokens = useMemo(
       () => mergeTokens(defaultTokens, tokens),
       [tokens]
     )

     const environment = useMemo(() => detectEnvironment(), [])

     const contextValue = useMemo<RuntimeContextValue>(
       () => ({ config, environment }),
       [config, environment]
     )

     useIsomorphicLayoutEffect(() => {
       return injectTokens(resolvedTokens)
     }, [resolvedTokens])

     return (
       <RuntimeContext.Provider value={contextValue}>
         <ThemeProvider tokens={tokens}>
           <ResponsiveProvider>
             <OverlayManagerProvider portalRootId={config.overlays?.portalRootId}>
               <NotificationManagerProvider>
                 {children}
               </NotificationManagerProvider>
             </OverlayManagerProvider>
           </ResponsiveProvider>
         </ThemeProvider>
       </RuntimeContext.Provider>
     )
   }
   ```

5. The provider hierarchy order is fixed:
   - `RuntimeContext.Provider` (outermost — exposes runtime config/env to all children)
   - `ThemeProvider` (provides resolved tokens via React context + scoped CSS vars on the wrapper div)
   - `ResponsiveProvider` (breakpoint tracking)
   - `OverlayManagerProvider` (overlay portal root)
   - `NotificationManagerProvider` (toast + banner containers)

## Constraints
- Do not add any logic beyond what is specified
- Do not re-implement what existing providers already do
- `detectEnvironment()` must be called inside `useMemo` (not at the top level of the component body) to avoid repeated calls on re-renders — or use `useMemo` with `[]` dependency to call it once
- `config` prop defaults to `{}` when not provided
- Do not add motion or a11y provider wrappers — those systems initialize on demand via their own hooks

## Acceptance Criteria
- `src/runtime/LitheboxProvider.tsx` exports `LitheboxProvider` and `LitheboxProviderProps`
- Rendering `<LitheboxProvider><App /></LitheboxProvider>` works without props
- Rendering with `tokens` applies them globally via document CSS variables
- Rendering with `config.overlays.portalRootId` passes the ID to `OverlayManagerProvider`
- `useRuntime()` inside a child component returns the provided `config` and detected `environment`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Render `<LitheboxProvider><div /></LitheboxProvider>` in a test — no errors
3. Call `useRuntime()` inside a child — confirm it returns the provided config
4. Confirm `document.documentElement.style` has CSS variables set after render
