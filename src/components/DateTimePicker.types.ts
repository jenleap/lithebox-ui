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
