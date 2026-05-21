# Task 006: Navigation and Overlay Component Metadata

## Feature
F015 - Component Metadata System

## Description
Define and register metadata for all navigation and overlay components: `AppShell`, `TopBar`, `Sidebar`, `ContentArea`, `Modal`, `Drawer`, and `Dropdown`. These components form the structural layer of any application and require precise composition rules to guide AI-driven layout generation.

## Files
- `src/metadata/components/navigationMetadata.ts` (create)

## Implementation Steps

1. Create `src/metadata/components/navigationMetadata.ts`.

2. Import `registerComponent` from `../registry` and `ComponentMetadata` from `../types`.

3. **AppShell** — category: `"navigation"`:
   - description: `"Root application layout container. Composes TopBar, Sidebar, and ContentArea into a full-page shell structure."`
   - props: `hasSidebar`, `sidebarPosition` (enum: `"left" | "right"`), `sidebarCollapsed`
   - slots: `topBar` (required, allowedComponents: `["TopBar"]`), `sidebar` (optional, allowedComponents: `["Sidebar"]`), `content` (required, allowedComponents: `["ContentArea"]`)
   - composition: `allowedParents: []`, `allowedChildren: ["TopBar", "Sidebar", "ContentArea"]`, `disallowedChildren: ["AppShell", "Modal", "Drawer"]`, `maxDepth: 1`
   - responsive: sidebar collapses to drawer at `sm`, topBar height reduces at `sm`
   - accessibility: `role: "application"`, `keyboardInteractions: ["Tab to navigate shell regions"]`
   - states: `["default", "sidebarCollapsed"]`
   - usage: recommended as the single root layout wrapper; discouraged from nesting inside other page components

4. **TopBar** — category: `"navigation"`:
   - description: `"Horizontal top-level navigation bar containing brand, nav items, and actions."`
   - props: `sticky`, `elevation`, `height`
   - slots: `brand` (required), `nav` (optional), `actions` (optional)
   - composition: `allowedParents: ["AppShell"]`, `allowedChildren: ["Row", "Button", "Icon", "Text"]`, `disallowedChildren: ["AppShell", "Modal", "Drawer", "Card"]`
   - accessibility: `role: "banner"`, `aria: { label: "Top navigation" }`, `keyboardInteractions: ["Tab to navigate items"]`
   - states: `["default", "scrolled"]`

5. **Sidebar** — category: `"navigation"`:
   - description: `"Vertical side navigation panel. Contains navigation links and optional section groupings."`
   - props: `collapsed`, `width`, `position` (enum: `"left" | "right"`)
   - slots: `header`, `nav`, `footer`
   - composition: `allowedParents: ["AppShell"]`, `allowedChildren: ["Stack", "Box", "Button", "Text", "Icon", "Divider"]`, `disallowedChildren: ["AppShell", "TopBar", "Modal"]`
   - responsive: collapses to full-width overlay at `sm`
   - accessibility: `role: "navigation"`, `aria: { label: "Sidebar navigation" }`, `keyboardInteractions: ["Tab to navigate links", "Escape to close on mobile"]`
   - states: `["default", "collapsed", "hovered"]`

6. **ContentArea** — category: `"layout"`:
   - description: `"Main content region of the AppShell. Renders page content and manages scroll context."`
   - props: `padding`, `scrollable`, `maxWidth`
   - composition: `allowedParents: ["AppShell"]`, `allowedChildren: ["Page", "Section", "Box", "Stack", "Container"]`, `disallowedChildren: ["AppShell", "TopBar", "Sidebar"]`
   - responsive: padding reduces at `sm`
   - accessibility: `role: "main"`, `aria: { label: "Main content" }`
   - states: `["default"]`

7. **Modal** — category: `"overlay"`:
   - description: `"Blocking overlay dialog for confirmations, forms, or critical messages."`
   - props: `open`, `size` (enum: `"sm" | "md" | "lg" | "fullscreen"`), `dismissible`, `title`
   - slots: `header` (optional), `body` (required), `footer` (optional)
   - composition: `allowedParents: []`, `allowedChildren: ["Stack", "Box", "Button", "Row", "Text", "Heading"]`, `disallowedChildren: ["AppShell", "Modal", "Drawer"]`
   - accessibility: `role: "dialog"`, `aria: { modal: "true", labelledby: "modal-title" }`, `keyboardInteractions: ["Escape to dismiss", "Tab cycles focus within modal"]`, `focusBehavior: "Focus is trapped inside modal when open"`
   - states: `["open", "closed", "loading"]`
   - usage: recommended for blocking user flows; discouraged for non-critical information display (use Toast instead)

8. **Drawer** — category: `"overlay"`:
   - description: `"Slide-in panel overlay from screen edge. Used for secondary actions and detail panels."`
   - props: `open`, `position` (enum: `"left" | "right" | "bottom"`), `size`, `dismissible`
   - slots: `header`, `body`, `footer`
   - composition: `allowedParents: []`, `allowedChildren: ["Stack", "Box", "Button", "Row", "Text"]`, `disallowedChildren: ["AppShell", "Modal"]`
   - accessibility: `role: "dialog"`, `aria: { modal: "false" }`, `keyboardInteractions: ["Escape to close", "Tab cycles within drawer"]`, `focusBehavior: "Focus is trapped when open"`
   - states: `["open", "closed"]`

9. **Dropdown** — category: `"overlay"`:
   - description: `"Positioned floating panel anchored to a trigger element. Used for menus and contextual options."`
   - props: `open`, `placement` (enum: `"bottom" | "top" | "left" | "right" | "bottom-start" | "bottom-end"`), `trigger`
   - slots: `trigger` (required), `content` (required)
   - composition: `allowedParents: ["Box", "Row", "Stack", "TopBar", "Card"]`, `allowedChildren: ["Box", "Stack", "Button", "Text"]`, `disallowedChildren: ["AppShell", "Modal", "Drawer"]`
   - accessibility: `role: "menu"`, `aria: { haspopup: "true", expanded: "false" }`, `keyboardInteractions: ["Escape to close", "Arrow keys to navigate items", "Enter to select"]`
   - states: `["open", "closed"]`

10. Each `registerComponent(metadata)` call is a module-level side effect. Version all at `"1.0.0"`.

## Constraints
- No `any` types
- No React imports
- All overlay components must define `focusBehavior` in `accessibility`
- `AppShell` must have `maxDepth: 1` in composition to prevent nesting
- Slot `allowedComponents` lists must use exact component names from the registry

## Acceptance Criteria
- All 7 components registered: `AppShell`, `TopBar`, `Sidebar`, `ContentArea`, `Modal`, `Drawer`, `Dropdown`
- `getComponent("AppShell")` has `slots` with `topBar`, `sidebar`, `content`
- `getComponent("Modal")` has `accessibility.focusBehavior` defined
- `getComponent("AppShell")` has `composition.maxDepth: 1`
- All overlays have `states` including `"open"` and `"closed"`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import the file, call `getComponent("AppShell")` — verify `slots` has 3 entries
3. Call `getComponent("Dropdown")` — verify `accessibility.role` is `"menu"`
4. Call `getComponent("Modal")` — verify `states` includes `"loading"`
