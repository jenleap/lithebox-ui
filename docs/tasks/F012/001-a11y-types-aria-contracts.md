# Task 001: A11y Types and ARIA Contract System

## Feature
F012 - Accessibility Architecture

## Description
Define the foundational TypeScript types for the accessibility layer and create the ARIA contract system. ARIA contracts define the role, attributes, and semantic mapping for each component type — they are the source of truth for how components expose themselves to assistive technologies.

## Files
- `src/a11y/types.ts` (create)
- `src/a11y/ariaContracts.ts` (create)

## Implementation Steps

1. Create `src/a11y/types.ts` with the following types:
   - `AriaRole` — union of valid WAI-ARIA roles used in this system: `"button" | "dialog" | "navigation" | "list" | "listitem" | "grid" | "row" | "gridcell" | "combobox" | "textbox" | "checkbox" | "radio" | "menuitem" | "menu" | "banner" | "main" | "contentinfo" | "complementary" | "region" | "alert" | "status"`
   - `AriaAttributeMap` — record of string aria-* attribute names to string values or boolean
   - `AriaContract` — shape: `{ role: AriaRole; attributes: Partial<Record<string, string | boolean>> }`
   - `A11yStateMap` — shape: `{ disabled?: boolean; loading?: boolean; error?: boolean; readOnly?: boolean }`
   - `ResolvedAriaProps` — shape: `{ role: AriaRole; "aria-disabled"?: boolean; "aria-busy"?: boolean; "aria-invalid"?: boolean; "aria-readonly"?: boolean; tabIndex?: number }`

2. Create `src/a11y/ariaContracts.ts` with one exported const per component type. Each contract uses the `AriaContract` type. Include contracts for:
   - `ButtonA11yContract` — role: `"button"`, attributes: `{ "aria-disabled": "disabled", "aria-pressed": "toggleState" }`
   - `ModalA11yContract` — role: `"dialog"`, attributes: `{ "aria-modal": "true" }`
   - `DrawerA11yContract` — role: `"dialog"`, attributes: `{ "aria-modal": "true" }`
   - `DropdownA11yContract` — role: `"menu"`, attributes: `{ "aria-expanded": "open" }`
   - `InputA11yContract` — role: `"textbox"`, attributes: `{ "aria-invalid": "error", "aria-required": "required", "aria-readonly": "readOnly" }`
   - `CheckboxA11yContract` — role: `"checkbox"`, attributes: `{ "aria-checked": "checked", "aria-disabled": "disabled" }`
   - `RadioA11yContract` — role: `"radio"`, attributes: `{ "aria-checked": "checked", "aria-disabled": "disabled" }`
   - `SelectA11yContract` — role: `"combobox"`, attributes: `{ "aria-expanded": "open", "aria-required": "required" }`
   - `SidebarA11yContract` — role: `"navigation"`, attributes: `{}`
   - `ListA11yContract` — role: `"list"`, attributes: `{}`
   - `TableA11yContract` — role: `"grid"`, attributes: `{}`
   - `BannerA11yContract` — role: `"alert"`, attributes: `{}`
   - `ToastA11yContract` — role: `"status"`, attributes: `{ "aria-live": "polite", "aria-atomic": "true" }`
   - `PageA11yContract` — role: `"main"`, attributes: `{}`

## Constraints
- No `any` types
- Use `as const` on all contracts
- Attribute values in contracts are string descriptors (e.g. `"disabled"`, `"open"`) — they describe what prop drives the value, not the literal value itself
- Do not import from component files

## Acceptance Criteria
- `src/a11y/types.ts` exports all required types
- `src/a11y/ariaContracts.ts` exports all required contracts
- All contracts satisfy the `AriaContract` type
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Import `ButtonA11yContract` and verify shape matches `AriaContract`

## Notes
The attribute values in contracts are semantic descriptors, not runtime values. A separate resolver (implemented later) will map these to actual prop values at runtime.
