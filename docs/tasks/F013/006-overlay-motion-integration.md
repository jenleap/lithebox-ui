# Task 006: Overlay Motion Integration

## Feature
F013 - Motion & Animation Layer

## Description
Integrate motion contracts into the Modal, Drawer, and Dropdown components. Each component must animate on enter and exit using `useMotionTransition`. Because Modal and Drawer currently unmount immediately on close (`if (!open) return null`), this task also adds a `mounted` lifecycle state so the exit animation can complete before unmounting.

## Files
- `src/components/Modal.tsx` (modify)
- `src/components/Drawer.tsx` (modify)
- `src/components/Dropdown.tsx` (modify — if Dropdown uses a similar pattern; check existing file)

## Implementation Steps

### Modal.tsx

1. Import `useMotionTransition` from `"../motion/useMotionTransition"` and `ModalMotionContract` from `"../motion/contracts"`.

2. Add a `mounted` state: `const [mounted, setMounted] = useState(false)`.

3. Add a `useEffect` that:
   - When `open` becomes `true`: set `mounted` to `true`
   - When `open` becomes `false`: wait for the exit animation duration, then set `mounted` to `false`
   - Use `motionTokens.duration.fast` (`"120ms"`) for the unmount delay. Parse the ms value: `parseInt("120ms", 10)`.

4. Change the early-return guard from `if (!open || !portalRoot) return null` to `if (!mounted || !portalRoot) return null`.

5. Call `useMotionTransition(ModalMotionContract, open)` and spread the result onto `backdropStyle` and `surfaceStyle`:
   - `backdropStyle` gets `...backdropMotion` (use `FadeInPrimitive` / `FadeOutPrimitive` — use a backdrop-specific inline contract with just opacity)
   - `surfaceStyle` gets `...surfaceMotion`

6. The backdrop should use a simpler fade contract. Create an inline `BackdropMotionContract` local to the file using `FadeInPrimitive` and `FadeOutPrimitive`.

### Drawer.tsx

1. Same `mounted` state + unmount delay pattern as Modal.

2. Import `DrawerLeftMotionContract`, `DrawerRightMotionContract` from `"../motion/contracts"`.

3. Select the correct contract based on the `side` prop:
   ```ts
   const contract = side === "right" ? DrawerRightMotionContract : DrawerLeftMotionContract
   ```

4. Apply `useMotionTransition(contract, open)` to `panelStyle`.

5. Apply `useMotionTransition(BackdropMotionContract, open)` to `backdropStyle` (same fade-only backdrop contract as Modal).

### Dropdown.tsx

1. Read the existing `Dropdown.tsx` to understand its open/close pattern before modifying.

2. Apply `useMotionTransition(DropdownMotionContract, open)` to the dropdown panel's style.

3. If Dropdown already conditionally renders, add the same `mounted` + unmount delay pattern.

## Constraints
- Do not remove or break existing accessibility (ARIA, focus trap, keyboard handling)
- Do not hardcode transition values — all values come from `useMotionTransition`
- Unmount delay must use `motionTokens.duration.fast` (parsed to ms integer), not a hardcoded number
- The `mounted` state must be separate from `open` — `open` drives animation direction, `mounted` drives DOM presence

## Acceptance Criteria
- Modal animates in (scale + fade) when `open` changes to `true`
- Modal animates out and then unmounts when `open` changes to `false`
- Drawer slides in/out from the correct side
- Dropdown fades in/out
- All existing ARIA and focus behavior is preserved
- No hardcoded `"300ms"` or `"ease"` strings remain in these files

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Open Storybook Modal story — verify visible enter/exit animation
3. Open Storybook Drawer story — verify slide-in from left and right
4. Verify keyboard (Escape) and backdrop click still close overlays

## Notes
The `mounted` state pattern is essential for exit animations. Without it, the component unmounts before the CSS transition has time to play. The delay must equal the exit animation duration.
