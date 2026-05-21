# Task 009: Storybook Stories

## Feature
F016 - Application Runtime Integration Layer

## Description
Write Storybook stories that demonstrate `LitheboxProvider` integration patterns. Stories should show: minimal setup, custom token overrides, runtime config options, and how the runtime layer composes with existing components.

## Files
- `src/stories/runtime/LitheboxProvider.stories.tsx` (create)

## Implementation Steps

1. Create the directory `src/stories/runtime/` if it does not exist.

2. Create `src/stories/runtime/LitheboxProvider.stories.tsx`.

3. Import the following:
   - `React` from `"react"`
   - `Meta`, `StoryObj` from `"@storybook/react"`
   - `LitheboxProvider` from `"../../runtime/LitheboxProvider"`
   - `useRuntime` from `"../../runtime/RuntimeContext"`
   - `Button` from `"../../components/Button"`
   - `Text` from `"../../components/Text"`
   - `Stack` from `"../../primitives/Stack"`

4. Create a `RuntimeInspector` component for use in stories that reads and displays the runtime context:

   ```tsx
   function RuntimeInspector() {
     const { config, environment } = useRuntime()
     return (
       <Stack gap="sm">
         <Text size="sm">isBrowser: {String(environment.isBrowser)}</Text>
         <Text size="sm">supportsReducedMotion: {String(environment.supportsReducedMotion)}</Text>
         <Text size="sm">config: {JSON.stringify(config, null, 2)}</Text>
       </Stack>
     )
   }
   ```

5. Define the meta:

   ```ts
   const meta: Meta<typeof LitheboxProvider> = {
     title: "Runtime/LitheboxProvider",
     component: LitheboxProvider,
   }
   export default meta

   type Story = StoryObj<typeof LitheboxProvider>
   ```

6. Write the following stories:

   **MinimalSetup** — no props, just renders children:

   ```tsx
   export const MinimalSetup: Story = {
     render: () => (
       <LitheboxProvider>
         <Stack gap="md">
           <Text>Lithebox runtime initialized with defaults.</Text>
           <Button>Default Button</Button>
         </Stack>
       </LitheboxProvider>
     ),
   }
   ```

   **WithRuntimeInspector** — shows runtime context values:

   ```tsx
   export const WithRuntimeInspector: Story = {
     render: () => (
       <LitheboxProvider>
         <Stack gap="md">
           <Text>Runtime context values:</Text>
           <RuntimeInspector />
         </Stack>
       </LitheboxProvider>
     ),
   }
   ```

   **WithReducedMotionConfig** — config with `reducedMotion: true`:

   ```tsx
   export const WithReducedMotionConfig: Story = {
     render: () => (
       <LitheboxProvider config={{ motion: { reducedMotion: true } }}>
         <Stack gap="md">
           <Text>Reduced motion mode enabled via runtime config.</Text>
           <RuntimeInspector />
         </Stack>
       </LitheboxProvider>
     ),
   }
   ```

   **WithCustomTokens** — overrides the primary color token:

   ```tsx
   export const WithCustomTokens: Story = {
     render: () => (
       <LitheboxProvider tokens={{ color: { primary: "#7c3aed" } } as any}>
         <Stack gap="md">
           <Text>Custom primary color token applied at runtime.</Text>
           <Button>Custom Color Button</Button>
         </Stack>
       </LitheboxProvider>
     ),
   }
   ```

   **WithCustomPortalRootId** — sets a custom overlay portal root:

   ```tsx
   export const WithCustomPortalRootId: Story = {
     render: () => (
       <LitheboxProvider config={{ overlays: { portalRootId: "my-app-portal" } }}>
         <Stack gap="md">
           <Text>Custom portal root ID: my-app-portal</Text>
           <RuntimeInspector />
         </Stack>
       </LitheboxProvider>
     ),
   }
   ```

## Constraints
- Do not use `as any` in the `WithCustomTokens` story unless a partial token type forces it — check if `Partial<Tokens>` handles nested partials; if not, a cast is acceptable
- Each story must be independently renderable in Storybook
- Do not wrap stories in an outer `LitheboxProvider` in the meta `decorators` — each story manages its own provider

## Acceptance Criteria
- `src/stories/runtime/LitheboxProvider.stories.tsx` exists with 5 stories
- All stories render in Storybook without errors
- `WithRuntimeInspector` correctly displays `isBrowser: true` in browser context

## Test Steps
1. Run `npm run storybook` and open the `Runtime/LitheboxProvider` section
2. Verify all 5 stories render without errors
3. Verify `WithRuntimeInspector` shows `isBrowser: true`
4. Verify `WithCustomTokens` shows a purple button
