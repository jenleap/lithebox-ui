# Task 006: Storybook Contract Inspector

## Feature
F005 — Component Token Contract System

## Description
Add a Storybook story that exposes the contract definitions for Button, Text, and Card — showing the contract structure, semantic slot mappings, and resolved CSS variable values per variant/size.

## Files
- `src/stories/contracts/ContractInspector.stories.tsx` (create)

## Implementation Steps
1. Create `src/stories/contracts/ContractInspector.stories.tsx`
2. Import `ButtonContract`, `TextContract`, and `CardContract` from `../../contracts`
3. Import `resolveSlot` from `../../contracts/resolveContract`
4. Define a helper component `ContractTable({ contract, name }: { contract: object, name: string })` that:
   - Renders a `<table>` showing each contract dimension and its slots
   - For each slot value that is a string semantic path, show both the path and the resolved CSS variable via `resolveSlot()`
   - Rows: dimension | slot name | semantic path | resolved CSS variable
5. Export three stories: `ButtonContractInspector`, `TextContractInspector`, `CardContractInspector`
6. Each story renders the `ContractTable` for its component and a live preview of the component below it
7. Meta title: `"Contracts/[ComponentName]"`

## Constraints
- No `any` types
- Use only imports from within the project (no new dependencies)
- Stories must not modify contract objects
- Use inline styles or existing CSS variables for table layout — no new CSS files

## Acceptance Criteria
- Three stories are visible in Storybook under "Contracts/"
- Each story shows a table with all contract slots and their resolved CSS variables
- A live component preview is shown below the table
- `npm run build` passes (Storybook build)

## Test Steps
1. Run `npm run storybook`
2. Navigate to "Contracts/Button", "Contracts/Text", "Contracts/Card"
3. Confirm each table shows correct slot names, semantic paths, and resolved CSS variable names
4. Confirm live component preview renders correctly
