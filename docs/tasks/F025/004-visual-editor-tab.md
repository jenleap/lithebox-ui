# Task 004: Visual Editor Tab

## Feature
F025 — Token Editor Playground

## Description
Implement the Visual tab: grouped controls for every token value. Colors use a color swatch + hex text input pair. Dimensions (radius, spacing, typography sizes) use a text input. Font family and shadow use text inputs. All changes apply live with no Apply button.

## Files
- `apps/playground/src/token-editor/VisualEditorTab.tsx` (create)
- `apps/playground/src/token-editor/TokenEditorPanel.tsx` (modify — replace Visual placeholder)

## Implementation Steps

1. Create `VisualEditorTab`:
   - Props: `{ tokens: Partial<Tokens>; defaultTokens: Partial<Tokens>; onChange: (tokens: Partial<Tokens>) => void }`
   - Import `defaultTokens` from `lithebox-ui`
   - Resolve displayed value: for each token field, show `tokens.color?.primary ?? defaultTokens.color.primary` (the override if set, else the default)
   - Helper `set(path: string[], value: unknown)` — deep-merges the change into current `tokens` and calls `onChange`. Example: `set(['color', 'primary'], '#FF0000')` merges `{ color: { primary: '#FF0000' } }` into `tokens`.

2. Color row component (inline, not exported):
   ```
   [Label]  [color swatch input]  [hex text input]
   ```
   - `<input type="color">` — 28×28px, cursor pointer, border-radius var(--radius-sm), no extra border
   - Text input beside it showing hex value — 90px wide, monospace font
   - On color input change: call `set([...path], e.target.value)`
   - On text input change: if value matches `/^#[0-9a-fA-F]{3,6}$/`, call `set([...path], value)`

3. Text row component (inline, not exported):
   ```
   [Label]  [text input]
   ```
   - Input: `width: 120px`, right-aligned in the row
   - On blur (not on every keystroke): call `set([...path], e.target.value)`

4. Section header: `<h4>` styled with `fontSize: var(--font-size-sm), fontWeight: bold, color: var(--color-text), margin: var(--spacing-md) 0 var(--spacing-sm), textTransform: uppercase, letterSpacing: 0.05em`

5. Sections and fields:

   **Colors**
   - primary → `['color', 'primary']`
   - secondary → `['color', 'secondary']`
   - background → `['color', 'background']`
   - surface → `['color', 'surface']`
   - text / primary → `['color', 'text', 'primary']`
   - text / secondary → `['color', 'text', 'secondary']`
   - border → `['color', 'border']`
   - error → `['color', 'error']`

   **Radius**
   - sm, md, lg → `['radius', 'sm']` etc — text row

   **Spacing**
   - xs, sm, md, lg, xl → `['spacing', 'xs']` etc — text row

   **Typography**
   - fontFamily → `['typography', 'fontFamily']` — text row (full width input)
   - size: sm, md, lg, xl — text rows
   - weight: regular, medium, bold — text rows

   **Shadow**
   - sm, md → `['shadow', 'sm']` etc — text row (full width input)

6. Each row: `display: flex, alignItems: center, justifyContent: space-between, marginBottom: var(--spacing-sm)`
   Label: `fontSize: var(--font-size-sm), color: var(--color-text)`

7. In `TokenEditorPanel.tsx`:
   - Import `VisualEditorTab`
   - Replace Visual placeholder with `<VisualEditorTab tokens={tokens} onChange={setTokens} />`

## Constraints
- Color text input only applies on valid 3 or 6-digit hex values (with #)
- Dimension text inputs apply on blur (avoids partial values like "8" mid-edit)
- Deep merge must not mutate existing state — spread to produce new objects at each level

## Acceptance Criteria
- Changing primary color swatch immediately updates all primary-colored elements
- Changing a spacing value on blur updates component spacing
- All default token values are visible in the inputs before any override

## Test Steps
1. Open panel, go to Visual tab — all inputs show default values
2. Change primary color swatch — buttons change color immediately
3. Change radius/md to 0px — card corners become square
4. Switch to JSON tab — changes appear in the JSON textarea
