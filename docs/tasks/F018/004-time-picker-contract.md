# Task 004: TimePickerContract

## Feature
F018 - Date Picker & Time Picker

## Description
Create the token contract for the TimePicker component. The contract maps all visual slots to semantic token paths, covering the outer container, individual time segments (hour, minute, period), separators, and interaction states.

## Files
- `src/contracts/TimePickerContract.ts` (create)

## Implementation Steps

1. Create `src/contracts/TimePickerContract.ts`:

   ```ts
   export const TimePickerContract = {
     container: {
       background: "color.surface",
       border: "color.border",
       text: "color.text.primary",
     },
     states: {
       focus: {
         border: "color.primary",
       },
       error: {
         border: "color.error",
       },
       disabled: {
         background: "color.surface",
         text: "color.text.secondary",
       },
     },
     segment: {
       text: "color.text.primary",
       placeholder: "color.text.secondary",
       activeBackground: "color.primary",
       hoverBackground: "color.border",
     },
     separator: {
       color: "color.text.secondary",
     },
     spacing: {
       containerPadding: "spacing.sm",
       segmentPadding: "spacing.xs",
       separatorGap: "spacing.xs",
     },
     radius: {
       container: "radius.md",
       segment: "radius.sm",
     },
     typography: {
       fontSize: "typography.size.md",
       fontFamily: "typography.fontFamily",
       weight: "typography.weight.medium",
     },
   } as const
   ```

## Constraints
- Only reference token paths that exist in `defaultTokens.ts`
- `segment.activeBackground` uses `color.primary` — the active segment text is rendered as `#ffffff` literal in the component (same pattern as DatePicker selected day)
- Use `as const` for type inference
- No imports

## Acceptance Criteria
- File exists at `src/contracts/TimePickerContract.ts`
- All token path strings reference valid paths from `defaultTokens.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors

## Notes
The `segment.activeBackground` highlights the focused segment using the primary color. Active segment text color is `#ffffff` literal in the component — consistent with the DatePicker selected-day approach.
