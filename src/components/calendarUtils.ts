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
