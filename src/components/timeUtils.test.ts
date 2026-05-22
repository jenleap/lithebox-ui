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

  it("parses end-of-day", () => {
    expect(parseTime("23:59")).toEqual({ hour: 23, minute: 59 })
  })

  it("returns null for invalid format", () => {
    expect(parseTime("invalid")).toBeNull()
    expect(parseTime("")).toBeNull()
    expect(parseTime("14:60")).toBeNull()
    expect(parseTime("25:00")).toBeNull()
  })
})

describe("formatTimeValue", () => {
  it("formats single-digit hour and minute with zero padding", () => {
    expect(formatTimeValue({ hour: 9, minute: 5 })).toBe("09:05")
  })

  it("formats two-digit values", () => {
    expect(formatTimeValue({ hour: 14, minute: 30 })).toBe("14:30")
  })

  it("formats midnight", () => {
    expect(formatTimeValue({ hour: 0, minute: 0 })).toBe("00:00")
  })
})

describe("getDisplaySegments", () => {
  it("returns placeholder segments when parsed is null in 24h mode", () => {
    expect(getDisplaySegments(null, "24h")).toEqual({ hour: "--", minute: "--" })
  })

  it("returns placeholder segments with period when null in 12h mode", () => {
    expect(getDisplaySegments(null, "12h")).toEqual({ hour: "--", minute: "--", period: "--" })
  })

  it("returns 24h display correctly", () => {
    expect(getDisplaySegments({ hour: 14, minute: 5 }, "24h")).toEqual({
      hour: "14",
      minute: "05",
    })
  })

  it("converts PM hour correctly in 12h mode", () => {
    expect(getDisplaySegments({ hour: 13, minute: 5 }, "12h")).toEqual({
      hour: "01",
      minute: "05",
      period: "PM",
    })
  })

  it("handles midnight (00:00) in 12h mode", () => {
    const result = getDisplaySegments({ hour: 0, minute: 0 }, "12h")
    expect(result.hour).toBe("12")
    expect(result.period).toBe("AM")
  })

  it("handles noon (12:00) in 12h mode", () => {
    const result = getDisplaySegments({ hour: 12, minute: 0 }, "12h")
    expect(result.hour).toBe("12")
    expect(result.period).toBe("PM")
  })

  it("handles AM hours in 12h mode", () => {
    const result = getDisplaySegments({ hour: 9, minute: 15 }, "12h")
    expect(result.hour).toBe("09")
    expect(result.period).toBe("AM")
  })
})

describe("incrementSegment", () => {
  it("increments hour by 1", () => {
    expect(incrementSegment({ hour: 10, minute: 0 }, "hour", 1, 5)).toEqual({ hour: 11, minute: 0 })
  })

  it("wraps hour from 23 to 0 on increment", () => {
    expect(incrementSegment({ hour: 23, minute: 0 }, "hour", 1, 5)).toEqual({ hour: 0, minute: 0 })
  })

  it("wraps hour from 0 to 23 on decrement", () => {
    expect(incrementSegment({ hour: 0, minute: 0 }, "hour", -1, 5)).toEqual({ hour: 23, minute: 0 })
  })

  it("increments minute by step", () => {
    expect(incrementSegment({ hour: 10, minute: 0 }, "minute", 1, 15)).toEqual({ hour: 10, minute: 15 })
  })

  it("wraps minute when exceeding 59", () => {
    expect(incrementSegment({ hour: 10, minute: 45 }, "minute", 1, 15)).toEqual({ hour: 10, minute: 0 })
  })

  it("decrements minute wraps to last step", () => {
    expect(incrementSegment({ hour: 10, minute: 0 }, "minute", -1, 15)).toEqual({ hour: 10, minute: 45 })
  })

  it("toggles period from AM to PM", () => {
    expect(incrementSegment({ hour: 9, minute: 0 }, "period", 1, 5)).toEqual({ hour: 21, minute: 0 })
  })

  it("toggles period from PM to AM", () => {
    expect(incrementSegment({ hour: 21, minute: 0 }, "period", 1, 5)).toEqual({ hour: 9, minute: 0 })
  })
})

describe("digitInputToSegmentValue", () => {
  it("sets hour digit in 24h mode", () => {
    const result = digitInputToSegmentValue({ hour: 0, minute: 0 }, "hour", 9, "24h")
    expect(result.hour).toBe(9)
  })

  it("sets minute digit", () => {
    const result = digitInputToSegmentValue({ hour: 10, minute: 0 }, "minute", 3, "24h")
    expect(result.minute).toBe(3)
  })

  it("shifts and appends second digit for minute", () => {
    const result = digitInputToSegmentValue({ hour: 10, minute: 3 }, "minute", 0, "24h")
    expect(result.minute).toBe(30)
  })

  it("clamps minute to max 59", () => {
    const result = digitInputToSegmentValue({ hour: 10, minute: 59 }, "minute", 9, "24h")
    expect(result.minute).toBe(9)
  })
})
