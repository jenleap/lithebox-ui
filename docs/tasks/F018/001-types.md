# Task 001: DateTimePicker Types

## Feature
F018 - Date Picker & Time Picker

## Description
Define all TypeScript types used by the DatePicker, TimePicker, calendar utility functions, and time utility functions. These types form the shared contract between all F018 modules and must be created before any implementation begins.

## Files
- `src/components/DateTimePicker.types.ts` (create)

## Implementation Steps

1. Create `src/components/DateTimePicker.types.ts` with the following content:

   ```ts
   export type TimeFormat = "12h" | "24h"

   export type TimeSegment = "hour" | "minute" | "period"

   export type CalendarDay = {
     date: Date
     isCurrentMonth: boolean
     isToday: boolean
     isSelected: boolean
     isDisabled: boolean
   }

   export type CalendarGrid = CalendarDay[][]

   export type ParsedTime = {
     hour: number    // 0–23 (internal 24h representation)
     minute: number  // 0–59
   }

   export type DatePickerProps = {
     value?: Date | null
     onChange: (date: Date | null) => void
     placeholder?: string
     minDate?: Date
     maxDate?: Date
     disabled?: boolean
     error?: boolean
     id?: string
   }

   export type TimePickerProps = {
     value?: string | null  // "HH:MM" in 24h format (e.g. "14:30")
     onChange: (time: string | null) => void
     format?: TimeFormat
     stepMinutes?: number
     disabled?: boolean
     error?: boolean
     placeholder?: string
     id?: string
   }
   ```

## Constraints
- Use only TypeScript — no runtime code in this file
- `ParsedTime.hour` is always 0–23 internally; display conversion is handled in timeUtils
- `CalendarGrid` is a 2D array: outer array = weeks (up to 6), inner = 7 days (Sun–Sat)
- `TimePickerProps.value` uses 24h "HH:MM" format as the external value contract
- No imports from other project files — this file must be leaf-level (no circular dependencies)

## Acceptance Criteria
- File exists at `src/components/DateTimePicker.types.ts`
- All 7 types are exported: `TimeFormat`, `TimeSegment`, `CalendarDay`, `CalendarGrid`, `ParsedTime`, `DatePickerProps`, `TimePickerProps`
- TypeScript compiles with `npm run build` — no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors

## Notes
`TimeFormat` and `TimeSegment` are kept as simple string unions for predictability. `ParsedTime` always stores hours as 0–23 regardless of display format — conversion to 12h display happens in `timeUtils.ts`.
