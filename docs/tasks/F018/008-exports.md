# Task 008: Exports

## Feature
F018 - Date Picker & Time Picker

## Description
Update `src/index.ts` to export the new DatePicker, TimePicker, and Popover components along with their prop types and the new shared types. Also export the two new contracts.

## Files
- `src/index.ts` (modify)

## Implementation Steps

1. Open `src/index.ts` and add the following exports at the end of the file, after the existing Runtime Integration Layer exports:

   ```ts
   // Date & Time Picker (F018)
   export { DatePicker } from "./components/DatePicker"
   export type { DatePickerProps } from "./components/DatePicker"

   export { TimePicker } from "./components/TimePicker"
   export type { TimePickerProps } from "./components/TimePicker"

   export { Popover } from "./components/Popover"
   export type { PopoverProps } from "./components/Popover"

   export type {
     TimeFormat,
     TimeSegment,
     CalendarDay,
     CalendarGrid,
     ParsedTime,
   } from "./components/DateTimePicker.types"

   export { DatePickerContract } from "./contracts/DatePickerContract"
   export { TimePickerContract } from "./contracts/TimePickerContract"
   ```

## Constraints
- Append only — do not modify any existing exports
- Add the exports at the very end of `src/index.ts`
- Follow the existing export style: named exports, then type exports per component
- The `DatePickerProps` and `TimePickerProps` types are re-exported from their component files (which re-export from `DateTimePicker.types.ts`), not directly from the types file
- Do not export `calendarUtils` or `timeUtils` — these are internal implementation modules

## Acceptance Criteria
- `DatePicker`, `TimePicker`, and `Popover` are importable from the package root
- `DatePickerProps`, `TimePickerProps`, `PopoverProps` are importable as types
- `DatePickerContract` and `TimePickerContract` are importable from the package root
- Shared types (`TimeFormat`, `TimeSegment`, `CalendarDay`, `CalendarGrid`, `ParsedTime`) are importable
- `npm run build` produces no TypeScript errors

## Test Steps
1. Run `npm run build` — no TypeScript errors, no missing exports
2. Verify the build output includes the new exports

## Notes
`calendarUtils` and `timeUtils` are kept internal — they are implementation details of the components, not part of the public API. Only the types defined in `DateTimePicker.types.ts` that are useful to consumers are exported.
