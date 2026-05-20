# Task 007: Feedback Motion Integration

## Feature
F013 - Motion & Animation Layer

## Description
Replace hardcoded animation values in `Toast.tsx` and `Banner.tsx` with motion-contract-driven styles from `useMotionTransition`. Both components currently use inline `transition: "opacity 300ms ease"` strings — these must be removed and replaced with the token-based system.

## Files
- `src/components/Toast.tsx` (modify)
- `src/components/Banner.tsx` (modify)

## Implementation Steps

### Toast.tsx

1. Import `useMotionTransition` from `"../motion/useMotionTransition"` and `ToastMotionContract` from `"../motion/contracts"`.

2. The component currently reads `toast.lifecycleState === "exiting"` to set `opacity` and `transform`. Replace this logic:
   - Call `useMotionTransition(ToastMotionContract, toast.lifecycleState !== "exiting")`
   - The second argument is `true` when NOT exiting (active/visible), `false` when exiting
   - Spread the returned styles into the root `<div>`'s `style` prop

3. Remove the following hardcoded values from the style object:
   - `opacity: isExiting ? 0 : 1`
   - `transform: isExiting ? "translateY(-8px)" : "translateY(0)"`
   - `transition: "opacity 300ms ease, transform 300ms ease"`

4. Keep all other styles (background, color, padding, borderRadius, minWidth, maxWidth, boxShadow, display, alignItems, justifyContent, gap) unchanged.

### Banner.tsx

1. Import `useMotionTransition` from `"../motion/useMotionTransition"` and `BannerMotionContract` from `"../motion/contracts"`.

2. The component currently reads `banner.lifecycleState === "dismissed"` to set `opacity`. Replace this logic:
   - Call `useMotionTransition(BannerMotionContract, banner.lifecycleState !== "dismissed")`
   - Spread the returned styles into the root `<div>`'s `style` prop

3. Remove the following hardcoded values:
   - `opacity: isDismissed ? 0 : 1`
   - `transition: "opacity 300ms ease"`

4. Keep all other styles unchanged.

## Constraints
- No hardcoded `"300ms"`, `"ease"`, `"opacity"`, or `"transform"` strings may remain in either file
- Do not modify the `lifecycleState` logic in `feedback/notificationManager.ts` or `feedback/types.ts`
- Do not alter component prop interfaces
- Preserve all ARIA attributes (`role="status"`, `aria-live`, etc.)

## Acceptance Criteria
- `Toast.tsx` contains no hardcoded animation strings
- `Banner.tsx` contains no hardcoded animation strings
- Toast enters with slide-up + fade per `ToastMotionContract`
- Toast exits with fade + slight upward offset per `ToastMotionContract`
- Banner fades in/out per `BannerMotionContract`
- When reduced motion is active, transitions are disabled (verified via `useMotionTransition`)
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Open Storybook Toast story — trigger enter and exit, verify animations
3. Open Storybook Banner story — trigger dismiss, verify fade
4. Grep for `"300ms"` in `Toast.tsx` and `Banner.tsx` — expect zero matches

## Notes
The Toast component already had `lifecycleState === "exiting"` as its animation gate — this maps cleanly to `active: false` in `useMotionTransition`. No architectural changes to the feedback system are needed.
