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
