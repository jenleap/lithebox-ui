# Task 003: JSON Editor Tab

## Feature
F025 — Token Editor Playground

## Description
Implement the JSON tab content: a textarea showing the current tokens as formatted JSON, an Apply button that parses and validates the input, an inline error message on bad JSON, and auto-sync when the visual tab changes tokens.

## Files
- `apps/playground/src/token-editor/JsonEditorTab.tsx` (create)
- `apps/playground/src/token-editor/TokenEditorPanel.tsx` (modify — replace JSON placeholder)

## Implementation Steps

1. Create `JsonEditorTab`:
   - Props: `{ tokens: Partial<Tokens>; onApply: (tokens: Partial<Tokens>) => void }`
   - Local state:
     - `draft: string` — the textarea content
     - `error: string | null` — parse error message
   - On mount and whenever `tokens` prop changes, sync `draft` to `JSON.stringify(tokens, null, 2)`. Use a `useEffect` with `[tokens]` dependency. Only sync when the textarea is not actively being edited (track with a `editing` ref that is set on focus and cleared on blur — if `editing.current` is false, update draft).
   - Textarea:
     - `value={draft}`
     - `onChange`: update `draft`, clear `error`
     - `onFocus`: set `editing.current = true`
     - `onBlur`: set `editing.current = false`
     - Style: `width: 100%, height: 320px, fontFamily: monospace, fontSize: 12px, resize: vertical, padding: var(--spacing-sm), boxSizing: border-box, border: 1px solid var(--color-border), borderRadius: var(--radius-sm), background: var(--color-background), color: var(--color-text)`
     - On error: border color `var(--color-error)`
   - Apply button below textarea:
     - `width: 100%`
     - On click: try `JSON.parse(draft)`, if it throws set error message, else call `onApply(parsed)` and clear error
   - Error message: `<p>` with `color: var(--color-error), fontSize: var(--font-size-sm), margin: var(--spacing-xs) 0 0`

2. In `TokenEditorPanel.tsx`:
   - Import `JsonEditorTab`
   - Replace JSON placeholder with `<JsonEditorTab tokens={tokens} onApply={setTokens} />`

## Constraints
- No external JSON schema validation — only `JSON.parse` try/catch
- Sync direction: `tokens` state → textarea (when not editing); textarea → `tokens` state (on Apply)
- `editing` ref prevents overwriting what the user is typing when visual editor triggers a token change

## Acceptance Criteria
- Textarea shows current tokens as formatted JSON on open
- Typing invalid JSON and clicking Apply shows error message
- Typing valid JSON and clicking Apply updates all components immediately
- If visual editor changes a token while user is not focused on textarea, textarea updates

## Test Steps
1. Open panel, confirm textarea shows `{}` initially
2. Type `{ "color": { "primary": "#FF0000" } }` and click Apply — primary color changes to red
3. Type `{ bad json` and click Apply — error appears
4. Close and reopen panel — textarea shows last applied tokens
