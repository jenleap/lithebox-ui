# Task 001: Tooltip Component

## Feature
P001 — Tooltip & ContextMenu Components

## Description
Build the Tooltip component: a positioned overlay that appears on hover/focus over a trigger element. Add the aria contract, motion contract, and component implementation.

## Files
- `src/a11y/ariaContracts.ts` (modify — add TooltipA11yContract)
- `src/motion/contracts.ts` (modify — add TooltipMotionContract)
- `src/components/Tooltip.tsx` (create)

## Implementation Steps

### 1. Add `TooltipA11yContract` to `src/a11y/ariaContracts.ts`
```ts
export const TooltipA11yContract: AriaContract = {
  role: "tooltip",
  attributes: {},
} as const
```

### 2. Add `TooltipMotionContract` to `src/motion/contracts.ts`
```ts
export const TooltipMotionContract: MotionContract = {
  enter: FadeInPrimitive,
  exit: FadeOutPrimitive,
}
```

### 3. Create `src/components/Tooltip.tsx`

Props:
```ts
export type TooltipPlacement = "top" | "right" | "bottom" | "left"

export type TooltipProps = {
  content: React.ReactNode
  placement?: TooltipPlacement
  children: React.ReactElement
}
```

Behavior:
- Generate a stable unique id with `useId()` for the tooltip element
- Clone the child element, adding `aria-describedby={id}` and `onMouseEnter`, `onMouseLeave`, `onFocus`, `onBlur` handlers that set `open` state
- Render the tooltip surface via `ReactDOM.createPortal` into `portalRoot` from `useOverlay({ id: "tooltip", layer: "dropdown" })`
- Use `useLayoutEffect` to position the tooltip surface relative to the trigger's bounding rect
- Placement logic:
  - `top`: `bottom = window.innerHeight - rect.top + scrollY + gap`, `left = rect.left + rect.width/2 + scrollX` (centered)
  - `bottom`: `top = rect.bottom + scrollY + gap`, `left = rect.left + rect.width/2 + scrollX`
  - `right`: `top = rect.top + rect.height/2 + scrollY`, `left = rect.right + scrollX + gap`
  - `left`: `top = rect.top + rect.height/2 + scrollY`, `right = window.innerWidth - rect.left + scrollX + gap`
  - Use `translateX(-50%)` / `translateY(-50%)` on the surface to center against the anchor for top/bottom/left/right
- Surface style:
  - `position: "absolute"`, `zIndex: LAYER_Z_INDEX.dropdown`
  - `background: "var(--color-text)"` (dark), `color: "var(--color-background)"` (light on dark)
  - `borderRadius: "var(--radius-sm)"`, `padding: "var(--spacing-xs) var(--spacing-sm)"`
  - `fontSize: "var(--font-size-sm)"`, `fontFamily: "var(--font-family-base)"`
  - `pointerEvents: "none"`, `whiteSpace: "nowrap"`
- Apply `useMotionTransition(TooltipMotionContract, open)` to the surface
- Unmount when closed (same delay pattern as Dropdown)

## Constraints
- Must use `useId` (React 18) for stable tooltip id
- No focus trapping
- `pointerEvents: none` on the tooltip surface (never interactive)
- Use `dropdown` layer — same z-index as dropdown

## Acceptance Criteria
- Tooltip appears on hover and keyboard focus
- Tooltip disappears on mouse-out and blur
- Trigger element has `aria-describedby` pointing to the tooltip id
- Tooltip has `role="tooltip"`
- All four placements position correctly relative to the trigger
- Motion transitions work (fade in/out)

## Test Steps
1. Hover a Tooltip-wrapped button — tooltip appears
2. Move mouse away — tooltip disappears
3. Focus the trigger with keyboard — tooltip appears
4. Blur — tooltip disappears
5. Check DOM: trigger has `aria-describedby`, tooltip has `role="tooltip"` with matching id
6. Test all 4 placement values render without errors
