# Task 012: Storybook Stories — Metadata Explorer

## Feature
F015 - Component Metadata System

## Description
Add Storybook documentation stories that expose the metadata system as an interactive reference. The stories serve as a human-readable and developer-facing explorer for component metadata and UI patterns, making the system inspectable without writing code.

## Files
- `src/stories/metadata/MetadataExplorer.stories.tsx` (create)
- `src/stories/metadata/PatternExplorer.stories.tsx` (create)

## Implementation Steps

### 1. `src/stories/metadata/MetadataExplorer.stories.tsx`

This story renders an explorer for `getAllComponents()`.

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { getAllComponents } from "../../metadata"
import "../../metadata/components/layoutMetadata"
import "../../metadata/components/primitiveMetadata"
import "../../metadata/components/formMetadata"
import "../../metadata/components/navigationMetadata"
import "../../metadata/components/dataDisplayMetadata"
import "../../metadata/components/feedbackMetadata"
```

**Implement a `MetadataExplorer` component** that:
- Accepts a `componentName: string` prop
- Calls `getAllComponents()` to retrieve registry
- Renders the selected component's metadata as a structured display:
  - Component name + category as a heading
  - Description as a paragraph
  - Props table: name | type | required | default | description
  - States list (if present)
  - Variants list (if present)
  - Slots table (if present)
  - Composition rules section
  - Accessibility section (if present)
  - Usage guidelines (if present)

Stories:
- `Default` — shows `Box` metadata
- `ButtonMetadata` — shows `Button` metadata
- `CardMetadata` — shows `Card` metadata (demonstrates slots)
- `FieldMetadata` — shows `Field` metadata (demonstrates form composition)
- `ModalMetadata` — shows `Modal` metadata (demonstrates accessibility/focus)

Storybook controls: `componentName` should be a `select` control populated with all registered component names from `Object.keys(getAllComponents())`.

### 2. `src/stories/metadata/PatternExplorer.stories.tsx`

This story renders an explorer for `getAllPatterns()`.

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { getAllPatterns } from "../../metadata"
import "../../metadata/patternRegistry"
```

**Implement a `PatternExplorer` component** that:
- Accepts a `patternName: string` prop
- Calls `getAllPatterns()` to retrieve the pattern registry
- Renders the selected pattern as a structured display:
  - Pattern name as a heading
  - Description paragraph
  - Structure section: renders each line of `structure[]` as a code block (monospace, indentation preserved)
  - Components list: renders each component name as a tag/badge
  - Usage guidelines: bulleted list
  - Constraints: bulleted list (if present)

Stories:
- `KPIRow` — shows `AnalyticsKPIRow` pattern
- `SettingsForm` — shows `SettingsFormLayout` pattern
- `DashboardHeader` — shows `DashboardHeader` pattern
- `TableToolbar` — shows `DataTableToolbar` pattern

Storybook controls: `patternName` should be a `select` control populated with `Object.keys(getAllPatterns())`.

### Storybook Metadata

Both story files must set:
```tsx
const meta: Meta = {
  title: "Metadata System / ...",
  // ...
}
```

Use `"Metadata System / Component Explorer"` and `"Metadata System / Pattern Explorer"` as titles.

## Constraints
- No `any` types
- Stories must not make network requests
- The explorer components are render-only — no interactive state mutation
- Use only existing Lithebox UI components (`Box`, `Stack`, `Text`, `Heading`, `Divider`) for layout within the explorer — do not use raw HTML elements for structure
- Side-effect imports for all metadata modules must be at the top of each story file

## Acceptance Criteria
- Both story files exist and load in Storybook without errors
- `MetadataExplorer` renders a props table for `Button` with at least 5 rows
- `PatternExplorer` renders the `structure` field for `AnalyticsKPIRow` with preserved indentation
- All 5 `MetadataExplorer` stories render without console errors
- All 4 `PatternExplorer` stories render without console errors
- Storybook `select` controls populate dynamically from the registry

## Test Steps
1. Run `npm run storybook` — Storybook loads without errors
2. Navigate to `Metadata System / Component Explorer` — verify stories render
3. Navigate to `Metadata System / Pattern Explorer` — verify stories render
4. Use the `componentName` control to switch between components — verify re-render
5. Verify no TypeScript errors with `npm run build`

## Notes
These stories are developer-facing documentation, not end-user UI. Prioritize information density and readability over visual polish. The explorer does not need to match the Lithebox design tokens precisely — it should use them, but presentation simplicity takes precedence.
