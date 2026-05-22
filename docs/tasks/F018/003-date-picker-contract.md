# Task 003: DatePickerContract

## Feature
F018 - Date Picker & Time Picker

## Description
Create the token contract for the DatePicker component. The contract maps all visual slots to semantic token paths, covering the trigger input, calendar overlay, day grid states, navigation, and typography. All values must reference valid token paths from the project's token system.

## Files
- `src/contracts/DatePickerContract.ts` (create)

## Implementation Steps

1. Create `src/contracts/DatePickerContract.ts`:

   ```ts
   export const DatePickerContract = {
     trigger: {
       background: "color.surface",
       border: "color.border",
       text: "color.text.primary",
       placeholder: "color.text.secondary",
       icon: "color.text.secondary",
     },
     states: {
       focus: {
         border: "color.primary",
       },
       error: {
         border: "color.error",
         text: "color.error",
       },
       disabled: {
         background: "color.surface",
         text: "color.text.secondary",
       },
     },
     calendar: {
       background: "color.surface",
       border: "color.border",
       shadow: "shadow.md",
       header: {
         text: "color.text.primary",
         navButton: "color.text.secondary",
       },
       dayLabel: "color.text.secondary",
       day: {
         text: "color.text.primary",
         outsideMonthText: "color.text.secondary",
         hoverBackground: "color.border",
         todayText: "color.primary",
         selectedBackground: "color.primary",
         disabledText: "color.text.secondary",
       },
     },
     spacing: {
       triggerPadding: "spacing.sm",
       calendarPadding: "spacing.md",
       headerGap: "spacing.sm",
       dayGap: "spacing.xs",
     },
     radius: {
       trigger: "radius.md",
       calendar: "radius.lg",
       day: "radius.md",
     },
     typography: {
       triggerSize: "typography.size.md",
       headerSize: "typography.size.sm",
       daySize: "typography.size.sm",
       fontFamily: "typography.fontFamily",
     },
   } as const
   ```

## Constraints
- Only reference token paths that exist in `defaultTokens.ts`: `color.primary`, `color.secondary`, `color.background`, `color.surface`, `color.text.primary`, `color.text.secondary`, `color.border`, `color.error`, `radius.sm/md/lg`, `spacing.xs/sm/md/lg/xl`, `typography.fontFamily`, `typography.size.sm/md/lg/xl`, `shadow.sm/md`
- Do not reference `color.text.onPrimary` — it does not exist. Selected day text color (`#ffffff`) will be handled as an inline literal in the component
- Use `as const` for full type inference
- No imports — this file is a pure constant declaration

## Acceptance Criteria
- File exists at `src/contracts/DatePickerContract.ts`
- All token path strings reference valid paths from `defaultTokens.ts`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors

## Notes
The `day.selectedBackground` uses `color.primary` and the component renders selected day text as `#ffffff` (literal). This is intentional — the token system has no `onPrimary` surface token in MVP.
