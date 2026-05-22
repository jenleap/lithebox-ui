# Task 002: Calendar & Time Utility Functions

## Feature
F018 - Date Picker & Time Picker

## Description
Create two utility modules: `calendarUtils.ts` for calendar grid computation and date helpers, and `timeUtils.ts` for time parsing, formatting, and segment manipulation. These are pure functions with no React dependencies and will be tested directly in Task 009.

## Files
- `src/components/calendarUtils.ts` (create)
- `src/components/timeUtils.ts` (create)

## Implementation Steps

1. Create `src/components/calendarUtils.ts`:

   ```ts
   import type { CalendarDay, CalendarGrid } from "./DateTimePicker.types"

   export const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const

   export function isToday(date: Date): boolean {
     const now = new Date()
     return (
       date.getFullYear() === now.getFullYear() &&
       date.getMonth() === now.getMonth() &&
       date.getDate() === now.getDate()
     )
   }

   export function isSameDay(a: Date, b: Date): boolean {
     return (
       a.getFullYear() === b.getFullYear() &&
       a.getMonth() === b.getMonth() &&
       a.getDate() === b.getDate()
     )
   }

   export function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date): boolean {
     if (minDate) {
       const min = new Date(minDate)
       min.setHours(0, 0, 0, 0)
       if (date < min) return true
     }
     if (maxDate) {
       const max = new Date(maxDate)
       max.setHours(23, 59, 59, 999)
       if (date > max) return true
     }
     return false
   }

   export function buildCalendarGrid(
     year: number,
     month: number,
     selectedDate?: Date | null,
     minDate?: Date,
     maxDate?: Date
   ): CalendarGrid {
     const firstDay = new Date(year, month, 1)

     // Start from Sunday of the week containing the 1st
     const startDate = new Date(firstDay)
     startDate.setDate(firstDay.getDate() - firstDay.getDay())
     startDate.setHours(0, 0, 0, 0)

     const weeks: CalendarGrid = []
     const current = new Date(startDate)

     for (let w = 0; w < 6; w++) {
       const week: CalendarDay[] = []
       for (let d = 0; d < 7; d++) {
         const date = new Date(current)
         week.push({
           date,
           isCurrentMonth: date.getMonth() === month,
           isToday: isToday(date),
           isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
           isDisabled: isDateDisabled(date, minDate, maxDate),
         })
         current.setDate(current.getDate() + 1)
       }
       weeks.push(week)
     }

     return weeks
   }

   export function formatDateDisplay(date: Date): string {
     return date.toLocaleDateString("en-US", {
       month: "short",
       day: "numeric",
       year: "numeric",
     })
   }

   export function getMonthLabel(year: number, month: number): string {
     return new Date(year, month, 1).toLocaleDateString("en-US", {
       month: "long",
       year: "numeric",
     })
   }

   export function navigateMonth(
     year: number,
     month: number,
     direction: -1 | 1
   ): { year: number; month: number } {
     let newMonth = month + direction
     let newYear = year
     if (newMonth < 0) { newMonth = 11; newYear -= 1 }
     if (newMonth > 11) { newMonth = 0; newYear += 1 }
     return { year: newYear, month: newMonth }
   }
   ```

2. Create `src/components/timeUtils.ts`:

   ```ts
   import type { ParsedTime, TimeFormat, TimeSegment } from "./DateTimePicker.types"

   export function parseTime(value: string): ParsedTime | null {
     const match = value.match(/^(\d{1,2}):(\d{2})$/)
     if (!match) return null
     const hour = parseInt(match[1], 10)
     const minute = parseInt(match[2], 10)
     if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null
     return { hour, minute }
   }

   export function formatTimeValue(parsed: ParsedTime): string {
     return `${String(parsed.hour).padStart(2, "0")}:${String(parsed.minute).padStart(2, "0")}`
   }

   export function getDisplaySegments(
     parsed: ParsedTime | null,
     format: TimeFormat
   ): { hour: string; minute: string; period?: string } {
     if (!parsed) {
       return format === "12h"
         ? { hour: "--", minute: "--", period: "--" }
         : { hour: "--", minute: "--" }
     }
     if (format === "24h") {
       return {
         hour: String(parsed.hour).padStart(2, "0"),
         minute: String(parsed.minute).padStart(2, "0"),
       }
     }
     const period = parsed.hour < 12 ? "AM" : "PM"
     const displayHour = parsed.hour % 12 === 0 ? 12 : parsed.hour % 12
     return {
       hour: String(displayHour).padStart(2, "0"),
       minute: String(parsed.minute).padStart(2, "0"),
       period,
     }
   }

   export function incrementSegment(
     current: ParsedTime,
     segment: TimeSegment,
     delta: number,
     stepMinutes: number
   ): ParsedTime {
     if (segment === "hour") {
       const newHour = ((current.hour + delta) % 24 + 24) % 24
       return { ...current, hour: newHour }
     }
     if (segment === "minute") {
       const steps = Math.round(60 / stepMinutes)
       const currentStep = Math.round(current.minute / stepMinutes)
       const newStep = ((currentStep + delta) % steps + steps) % steps
       return { ...current, minute: newStep * stepMinutes }
     }
     if (segment === "period") {
       const newHour = current.hour < 12 ? current.hour + 12 : current.hour - 12
       return { ...current, hour: newHour }
     }
     return current
   }

   export function digitInputToSegmentValue(
     current: ParsedTime | null,
     segment: TimeSegment,
     digit: number,
     format: TimeFormat
   ): ParsedTime {
     const base = current ?? { hour: 0, minute: 0 }
     if (segment === "hour") {
       const maxHour = format === "24h" ? 23 : 12
       const displayHour = format === "12h"
         ? (base.hour % 12 === 0 ? 12 : base.hour % 12)
         : base.hour
       // Shift left and add new digit
       const newDisplay = (displayHour % 10) * 10 + digit
       const clamped = newDisplay > maxHour ? digit : newDisplay
       if (format === "12h") {
         const isPM = base.hour >= 12
         const hour24 = clamped === 12
           ? (isPM ? 12 : 0)
           : isPM ? clamped + 12 : clamped
         return { ...base, hour: Math.min(hour24, 23) }
       }
       return { ...base, hour: Math.min(clamped, 23) }
     }
     if (segment === "minute") {
       const newMinute = (base.minute % 10) * 10 + digit
       return { ...base, minute: Math.min(newMinute > 59 ? digit : newMinute, 59) }
     }
     return base
   }
   ```

## Constraints
- Pure functions only — no React imports, no side effects
- `buildCalendarGrid` always returns exactly 6 weeks (42 days) for layout consistency
- `parseTime` only accepts "HH:MM" format (24h internal representation)
- `incrementSegment` wraps around (24h → 0h, minute wraps per stepMinutes)
- `isDateDisabled` compares dates at day boundaries (min at midnight, max at end-of-day)

## Acceptance Criteria
- Both files exist at the specified paths
- `buildCalendarGrid` returns 6 arrays of 7 `CalendarDay` objects
- `parseTime("14:30")` returns `{ hour: 14, minute: 30 }`
- `parseTime("invalid")` returns `null`
- `incrementSegment({ hour: 23, minute: 0 }, "hour", 1, 5)` returns `{ hour: 0, minute: 0 }`
- `getDisplaySegments({ hour: 13, minute: 5 }, "12h")` returns `{ hour: "01", minute: "05", period: "PM" }`
- TypeScript compiles with no errors

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Verify in unit tests (Task 009): all utility functions behave as specified

## Notes
`buildCalendarGrid` always renders 6 weeks regardless of month length. This prevents layout shifts when navigating between months. The grid always starts on Sunday.
