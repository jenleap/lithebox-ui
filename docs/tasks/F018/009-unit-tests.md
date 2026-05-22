# Task 009: Unit Tests

## Feature
F018 - Date Picker & Time Picker

## Description
Write unit tests covering the pure utility functions in `calendarUtils.ts` and `timeUtils.ts`. Tests must not rely on any browser APIs or React rendering — they are pure function tests only. Use Vitest.

## Files
- `src/components/calendarUtils.test.ts` (create)
- `src/components/timeUtils.test.ts` (create)

## Implementation Steps

1. Create `src/components/calendarUtils.test.ts`:

   ```ts
   import { describe, it, expect, beforeEach, vi } from "vitest"
   import {
     isToday,
     isSameDay,
     isDateDisabled,
     buildCalendarGrid,
     formatDateDisplay,
     getMonthLabel,
     navigateMonth,
   } from "./calendarUtils"

   describe("isToday", () => {
     it("returns true for the current date", () => {
       expect(isToday(new Date())).toBe(true)
     })

     it("returns false for yesterday", () => {
       const d = new Date()
       d.setDate(d.getDate() - 1)
       expect(isToday(d)).toBe(false)
     })
   })

   describe("isSameDay", () => {
     it("returns true for the same calendar date regardless of time", () => {
       const a = new Date(2024, 5, 15, 8, 0, 0)
       const b = new Date(2024, 5, 15, 22, 30, 0)
       expect(isSameDay(a, b)).toBe(true)
     })

     it("returns false for different dates", () => {
       expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 5, 16))).toBe(false)
     })
   })

   describe("isDateDisabled", () => {
     it("returns false when no constraints", () => {
       expect(isDateDisabled(new Date(2024, 5, 15))).toBe(false)
     })

     it("returns true when date is before minDate", () => {
       expect(isDateDisabled(new Date(2024, 5, 14), new Date(2024, 5, 15))).toBe(true)
     })

     it("returns false when date equals minDate", () => {
       expect(isDateDisabled(new Date(2024, 5, 15), new Date(2024, 5, 15))).toBe(false)
     })

     it("returns true when date is after maxDate", () => {
       expect(isDateDisabled(new Date(2024, 5, 16), undefined, new Date(2024, 5, 15))).toBe(true)
     })

     it("returns false when date equals maxDate", () => {
       expect(isDateDisabled(new Date(2024, 5, 15), undefined, new Date(2024, 5, 15))).toBe(false)
     })
   })

   describe("buildCalendarGrid", () => {
     it("returns exactly 6 weeks", () => {
       const grid = buildCalendarGrid(2024, 0) // January 2024
       expect(grid).toHaveLength(6)
     })

     it("each week has 7 days", () => {
       const grid = buildCalendarGrid(2024, 0)
       grid.forEach(week => expect(week).toHaveLength(7))
     })

     it("first day of grid is Sunday (day 0)", () => {
       const grid = buildCalendarGrid(2024, 0) // Jan 2024 starts on Monday
       expect(grid[0][0].date.getDay()).toBe(0) // Sunday
     })

     it("marks isCurrentMonth correctly", () => {
       const grid = buildCalendarGrid(2024, 0) // January
       const currentMonthDays = grid.flat().filter(d => d.isCurrentMonth)
       expect(currentMonthDays).toHaveLength(31) // January has 31 days
     })

     it("marks isSelected for the selected date", () => {
       const selected = new Date(2024, 0, 15)
       const grid = buildCalendarGrid(2024, 0, selected)
       const selectedDay = grid.flat().find(d => d.isSelected)
       expect(selectedDay).toBeDefined()
       expect(selectedDay?.date.getDate()).toBe(15)
     })

     it("marks isDisabled for dates before minDate", () => {
       const minDate = new Date(2024, 0, 10)
       const grid = buildCalendarGrid(2024, 0, null, minDate)
       const disabledDays = grid.flat().filter(d => d.isCurrentMonth && d.isDisabled)
       expect(disabledDays.length).toBeGreaterThan(0)
       disabledDays.forEach(d => expect(d.date < minDate || isSameDay(d.date, minDate)).toBeTruthy())
     })
   })

   describe("navigateMonth", () => {
     it("goes to previous month", () => {
       expect(navigateMonth(2024, 0, -1)).toEqual({ year: 2023, month: 11 })
     })

     it("goes to next month", () => {
       expect(navigateMonth(2024, 11, 1)).toEqual({ year: 2025, month: 0 })
     })

     it("stays in same year for middle months", () => {
       expect(navigateMonth(2024, 5, 1)).toEqual({ year: 2024, month: 6 })
       expect(navigateMonth(2024, 5, -1)).toEqual({ year: 2024, month: 4 })
     })
   })

   describe("getMonthLabel", () => {
     it("returns month and year as a string", () => {
       expect(getMonthLabel(2024, 0)).toContain("January")
       expect(getMonthLabel(2024, 0)).toContain("2024")
     })
   })
   ```

2. Create `src/components/timeUtils.test.ts`:

   ```ts
   import { describe, it, expect } from "vitest"
   import {
     parseTime,
     formatTimeValue,
     getDisplaySegments,
     incrementSegment,
     digitInputToSegmentValue,
   } from "./timeUtils"

   describe("parseTime", () => {
     it("parses valid 24h time", () => {
       expect(parseTime("14:30")).toEqual({ hour: 14, minute: 30 })
     })

     it("parses midnight", () => {
       expect(parseTime("00:00")).toEqual({ hour: 0, minute: 0 })
     })

     it("returns null for invalid format", () => {
       expect(parseTime("invalid")).toBeNull()
       expect(parseTime("25:00")).toBeNull()
       expect(parseTime("14:60")).toBeNull()
       expect(parseTime("")).toBeNull()
     })
   })

   describe("formatTimeValue", () => {
     it("formats to HH:MM with zero padding", () => {
       expect(formatTimeValue({ hour: 9, minute: 5 })).toBe("09:05")
       expect(formatTimeValue({ hour: 14, minute: 30 })).toBe("14:30")
     })
   })

   describe("getDisplaySegments", () => {
     it("returns placeholder segments when no time", () => {
       expect(getDisplaySegments(null, "24h")).toEqual({ hour: "--", minute: "--" })
       expect(getDisplaySegments(null, "12h")).toEqual({ hour: "--", minute: "--", period: "--" })
     })

     it("returns 24h display correctly", () => {
       expect(getDisplaySegments({ hour: 14, minute: 5 }, "24h")).toEqual({
         hour: "14",
         minute: "05",
       })
     })

     it("converts to 12h format correctly", () => {
       expect(getDisplaySegments({ hour: 13, minute: 5 }, "12h")).toEqual({
         hour: "01",
         minute: "05",
         period: "PM",
       })
     })

     it("handles midnight in 12h format", () => {
       const result = getDisplaySegments({ hour: 0, minute: 0 }, "12h")
       expect(result.hour).toBe("12")
       expect(result.period).toBe("AM")
     })

     it("handles noon in 12h format", () => {
       const result = getDisplaySegments({ hour: 12, minute: 0 }, "12h")
       expect(result.hour).toBe("12")
       expect(result.period).toBe("PM")
     })
   })

   describe("incrementSegment", () => {
     it("increments hour by 1", () => {
       expect(incrementSegment({ hour: 10, minute: 0 }, "hour", 1, 5)).toEqual({ hour: 11, minute: 0 })
     })

     it("wraps hour from 23 to 0", () => {
       expect(incrementSegment({ hour: 23, minute: 0 }, "hour", 1, 5)).toEqual({ hour: 0, minute: 0 })
     })

     it("wraps hour from 0 to 23 on decrement", () => {
       expect(incrementSegment({ hour: 0, minute: 0 }, "hour", -1, 5)).toEqual({ hour: 23, minute: 0 })
     })

     it("increments minute by step", () => {
       expect(incrementSegment({ hour: 10, minute: 0 }, "minute", 1, 15)).toEqual({ hour: 10, minute: 15 })
     })

     it("wraps minute at 60", () => {
       expect(incrementSegment({ hour: 10, minute: 45 }, "minute", 1, 15)).toEqual({ hour: 10, minute: 0 })
     })

     it("toggles period from AM to PM", () => {
       expect(incrementSegment({ hour: 9, minute: 0 }, "period", 1, 5)).toEqual({ hour: 21, minute: 0 })
     })

     it("toggles period from PM to AM", () => {
       expect(incrementSegment({ hour: 21, minute: 0 }, "period", 1, 5)).toEqual({ hour: 9, minute: 0 })
     })
   })
   ```

## Constraints
- Use Vitest (`describe`, `it`, `expect`) — not Jest
- Pure function tests only — no React rendering, no `renderHook`
- Do not mock any APIs — the utility functions have no external dependencies
- `buildCalendarGrid` always returns 6 weeks — test that exactly
- Each test covers one specific behavior

## Acceptance Criteria
- All tests pass with `npm run test`
- `calendarUtils.test.ts` covers: `isToday`, `isSameDay`, `isDateDisabled`, `buildCalendarGrid`, `navigateMonth`, `getMonthLabel`
- `timeUtils.test.ts` covers: `parseTime`, `formatTimeValue`, `getDisplaySegments`, `incrementSegment`
- No test failures

## Test Steps
1. Run `npm run test` — all tests pass

## Notes
`isToday` relies on `new Date()` — tests use the real current date (not mocked), so the `isToday(new Date())` test will always pass. Mocking the system clock is not required for these utility functions.
