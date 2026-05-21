# Task 008: Feedback Component Metadata

## Feature
F015 - Component Metadata System

## Description
Define and register metadata for all feedback system components: `Toast`, `ToastContainer`, and `Banner`. These components communicate status to the user and require accurate semantic metadata so AI systems can distinguish between ephemeral (Toast) and persistent (Banner) feedback patterns.

## Files
- `src/metadata/components/feedbackMetadata.ts` (create)

## Implementation Steps

1. Create `src/metadata/components/feedbackMetadata.ts`.

2. Import `registerComponent` from `../registry` and `ComponentMetadata` from `../types`.

3. **Toast** — category: `"feedback"`:
   - description: `"Ephemeral notification message that auto-dismisses after a timeout. Used for transient feedback that does not require user action."`
   - props:
     - `variant` (enum: `"default" | "success" | "warning" | "error" | "info"`, required)
     - `message` (string, required)
     - `duration` (number, default: `4000`, description: `"Auto-dismiss duration in milliseconds"`)
     - `dismissible` (boolean, default: `true`)
     - `action` (object, description: `"Optional action button rendered inside the toast"`)
   - composition:
     - `allowedParents: ["ToastContainer"]`
     - `allowedChildren: []`
     - `maxDepth: 0`
   - accessibility:
     - `role: "alert"`
     - `aria: { live: "polite", atomic: "true" }`
     - `screenReaderDescription: "Live region announcement on mount"`
   - states: `["default", "success", "warning", "error", "info", "dismissing"]`
   - usage:
     - recommended for non-blocking status feedback (save success, copy confirmation)
     - discouraged for critical errors requiring user action (use Modal or Banner instead)

4. **ToastContainer** — category: `"feedback"`:
   - description: `"Viewport-anchored container that stacks and manages Toast positioning. Rendered once at the application root."`
   - props:
     - `position` (enum: `"top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"`, default: `"bottom-right"`)
     - `maxToasts` (number, default: `5`)
   - composition:
     - `allowedParents: ["AppShell", "Box"]`
     - `allowedChildren: ["Toast"]`
     - `disallowedChildren: ["Modal", "Drawer", "Banner", "Card"]`
   - accessibility:
     - `role: "region"`
     - `aria: { live: "polite", label: "Notifications" }`
   - states: `["default", "hasToasts"]`
   - usage:
     - recommended to mount once at application root inside `AppShell`
     - discouraged from rendering multiple `ToastContainer` instances simultaneously

5. **Banner** — category: `"feedback"`:
   - description: `"Persistent inline feedback message anchored to a page region. Used for warnings, alerts, or informational messages that require user awareness and optional action."`
   - props:
     - `variant` (enum: `"info" | "success" | "warning" | "error"`, required)
     - `title` (string)
     - `message` (string, required)
     - `dismissible` (boolean, default: `false`)
     - `action` (object, description: `"Optional call-to-action rendered inside banner"`)
     - `icon` (boolean, default: `true`)
   - slots:
     - `icon` (optional)
     - `action` (optional)
   - composition:
     - `allowedParents: ["Box", "Stack", "ContentArea", "Page", "Section"]`
     - `allowedChildren: ["Text", "Button", "Icon"]`
     - `disallowedChildren: ["Card", "Modal", "Toast", "ToastContainer", "Heading"]`
   - accessibility:
     - `role: "alert"` (for `error`/`warning`), `role: "status"` (for `info`/`success`)
     - `aria: { live: "assertive" }` (for error), `aria: { live: "polite" }` (for others)
     - `keyboardInteractions: ["Escape to dismiss if dismissible"]`
   - states: `["info", "success", "warning", "error", "dismissed"]`
   - usage:
     - recommended for page-level warnings or persistent system status
     - discouraged for transient notifications (use Toast instead)
     - discouraged for rendering inside Table cells or ListItems

6. Each `registerComponent(metadata)` call is a module-level side effect. Version all at `"1.0.0"`.

## Constraints
- No `any` types
- No React imports
- `Toast` must have `composition.maxDepth: 0` — it is a leaf component
- `ToastContainer` must have `allowedChildren: ["Toast"]` only
- `Banner` role varies by variant — document this in the `accessibility.screenReaderDescription` field

## Acceptance Criteria
- All 3 components registered: `Toast`, `ToastContainer`, `Banner`
- `getComponent("Toast")` has `composition.allowedParents: ["ToastContainer"]`
- `getComponent("ToastContainer")` has `composition.allowedChildren: ["Toast"]`
- `getComponent("Banner")` has `slots` with `icon` and `action`
- `getComponent("Toast")` has `accessibility.role: "alert"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import the file, call `getComponent("Toast")` — verify `states` includes `"dismissing"`
3. Call `getComponent("Banner")` — verify `usage.discouraged` mentions Toast
4. Call `getComponent("ToastContainer")` — verify `allowedChildren` is `["Toast"]`
