import { describe, it, expect } from "vitest"
import {
  isToday,
  isSameDay,
  isDateDisabled,
  buildCalendarGrid,
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
    const grid = buildCalendarGrid(2024, 0)
    expect(grid).toHaveLength(6)
  })

  it("each week has 7 days", () => {
    const grid = buildCalendarGrid(2024, 0)
    grid.forEach(week => expect(week).toHaveLength(7))
  })

  it("first day of grid is always Sunday", () => {
    const grid = buildCalendarGrid(2024, 0) // Jan 2024 starts on Monday
    expect(grid[0][0].date.getDay()).toBe(0)
  })

  it("marks isCurrentMonth correctly for January 2024", () => {
    const grid = buildCalendarGrid(2024, 0)
    const currentMonthDays = grid.flat().filter(d => d.isCurrentMonth)
    expect(currentMonthDays).toHaveLength(31)
  })

  it("marks isSelected for the selected date", () => {
    const selected = new Date(2024, 0, 15)
    const grid = buildCalendarGrid(2024, 0, selected)
    const selectedDay = grid.flat().find(d => d.isSelected)
    expect(selectedDay).toBeDefined()
    expect(selectedDay?.date.getDate()).toBe(15)
  })

  it("marks only one day as selected", () => {
    const selected = new Date(2024, 0, 15)
    const grid = buildCalendarGrid(2024, 0, selected)
    const selectedDays = grid.flat().filter(d => d.isSelected)
    expect(selectedDays).toHaveLength(1)
  })

  it("marks days before minDate as disabled", () => {
    const minDate = new Date(2024, 0, 10)
    const grid = buildCalendarGrid(2024, 0, null, minDate)
    const jan9 = grid.flat().find(d => d.isCurrentMonth && d.date.getDate() === 9)
    expect(jan9?.isDisabled).toBe(true)
    const jan10 = grid.flat().find(d => d.isCurrentMonth && d.date.getDate() === 10)
    expect(jan10?.isDisabled).toBe(false)
  })

  it("marks days after maxDate as disabled", () => {
    const maxDate = new Date(2024, 0, 20)
    const grid = buildCalendarGrid(2024, 0, null, undefined, maxDate)
    const jan21 = grid.flat().find(d => d.isCurrentMonth && d.date.getDate() === 21)
    expect(jan21?.isDisabled).toBe(true)
    const jan20 = grid.flat().find(d => d.isCurrentMonth && d.date.getDate() === 20)
    expect(jan20?.isDisabled).toBe(false)
  })
})

describe("navigateMonth", () => {
  it("goes to December of previous year from January", () => {
    expect(navigateMonth(2024, 0, -1)).toEqual({ year: 2023, month: 11 })
  })

  it("goes to January of next year from December", () => {
    expect(navigateMonth(2024, 11, 1)).toEqual({ year: 2025, month: 0 })
  })

  it("goes to next month within the same year", () => {
    expect(navigateMonth(2024, 5, 1)).toEqual({ year: 2024, month: 6 })
  })

  it("goes to previous month within the same year", () => {
    expect(navigateMonth(2024, 5, -1)).toEqual({ year: 2024, month: 4 })
  })
})

describe("getMonthLabel", () => {
  it("returns month and year as a readable string", () => {
    const label = getMonthLabel(2024, 0)
    expect(label).toContain("January")
    expect(label).toContain("2024")
  })

  it("handles December correctly", () => {
    const label = getMonthLabel(2023, 11)
    expect(label).toContain("December")
    expect(label).toContain("2023")
  })
})
