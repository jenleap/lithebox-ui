import React, { useRef, useState, useCallback } from "react"
import { resolveSlot } from "../contracts/resolveContract"
import { TimePickerContract } from "../contracts/TimePickerContract"
import {
  parseTime,
  formatTimeValue,
  getDisplaySegments,
  incrementSegment,
  digitInputToSegmentValue,
} from "./timeUtils"
import type { TimePickerProps, TimeSegment, ParsedTime } from "./DateTimePicker.types"

export type { TimePickerProps }

const DEFAULT_STEP = 5

export function TimePicker({
  value,
  onChange,
  format = "24h",
  stepMinutes = DEFAULT_STEP,
  disabled = false,
  error = false,
  id,
}: TimePickerProps) {
  const [focused, setFocused] = useState(false)
  const [activeSegment, setActiveSegment] = useState<TimeSegment | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const parsed: ParsedTime | null = value ? parseTime(value) : null
  const segments = getDisplaySegments(parsed, format)
  const c = TimePickerContract

  const handleSegmentClick = (segment: TimeSegment) => {
    if (disabled) return
    setActiveSegment(segment)
    setFocused(true)
    containerRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!activeSegment || disabled) return

    if (e.key === "ArrowUp") {
      e.preventDefault()
      const base = parsed ?? { hour: 0, minute: 0 }
      const next = incrementSegment(base, activeSegment, 1, stepMinutes)
      onChange(formatTimeValue(next))
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const base = parsed ?? { hour: 0, minute: 0 }
      const next = incrementSegment(base, activeSegment, -1, stepMinutes)
      onChange(formatTimeValue(next))
    } else if (e.key === "Tab") {
      e.preventDefault()
      const order: TimeSegment[] = format === "12h"
        ? ["hour", "minute", "period"]
        : ["hour", "minute"]
      const idx = order.indexOf(activeSegment)
      setActiveSegment(order[(idx + 1) % order.length])
    } else if (/^\d$/.test(e.key)) {
      e.preventDefault()
      if (activeSegment === "period") return
      const digit = parseInt(e.key, 10)
      const base = parsed ?? { hour: 0, minute: 0 }
      const next = digitInputToSegmentValue(base, activeSegment, digit, format)
      onChange(formatTimeValue(next))
    } else if (e.key === "a" || e.key === "A") {
      if (activeSegment === "period" && parsed) {
        const next = { ...parsed, hour: parsed.hour >= 12 ? parsed.hour - 12 : parsed.hour }
        onChange(formatTimeValue(next))
      }
    } else if (e.key === "p" || e.key === "P") {
      if (activeSegment === "period" && parsed) {
        const next = { ...parsed, hour: parsed.hour < 12 ? parsed.hour + 12 : parsed.hour }
        onChange(formatTimeValue(next))
      }
    } else if (e.key === "Backspace" || e.key === "Delete") {
      onChange(null)
    }
  }

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setFocused(false)
      setActiveSegment(null)
    }
  }, [])

  const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: resolveSlot(c.spacing.separatorGap),
    padding: resolveSlot(c.spacing.containerPadding),
    background: resolveSlot(c.container.background),
    border: `1px solid ${
      error
        ? resolveSlot(c.states.error.border)
        : focused
        ? resolveSlot(c.states.focus.border)
        : resolveSlot(c.container.border)
    }`,
    borderRadius: resolveSlot(c.radius.container),
    fontFamily: resolveSlot(c.typography.fontFamily),
    fontSize: resolveSlot(c.typography.fontSize),
    cursor: disabled ? "not-allowed" : "default",
    opacity: disabled ? 0.5 : 1,
    outline: "none",
    userSelect: "none",
  }

  const getSegmentStyle = (seg: TimeSegment): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
    padding: `2px ${resolveSlot(c.spacing.segmentPadding)}`,
    borderRadius: resolveSlot(c.radius.segment),
    background: activeSegment === seg
      ? resolveSlot(c.segment.activeBackground)
      : "transparent",
    color: activeSegment === seg
      ? "#ffffff"
      : parsed
      ? resolveSlot(c.segment.text)
      : resolveSlot(c.segment.placeholder),
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: resolveSlot(c.typography.fontFamily),
    fontSize: resolveSlot(c.typography.fontSize),
    lineHeight: 1.5,
  })

  const separatorStyle: React.CSSProperties = {
    color: resolveSlot(c.separator.color),
    fontFamily: resolveSlot(c.typography.fontFamily),
    fontSize: resolveSlot(c.typography.fontSize),
    lineHeight: 1,
    userSelect: "none",
  }

  return (
    <div
      ref={containerRef}
      id={id}
      tabIndex={disabled ? -1 : 0}
      role="group"
      aria-label="Time input"
      style={containerStyle}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onFocus={() => {
        if (!activeSegment && !disabled) setActiveSegment("hour")
        setFocused(true)
      }}
    >
      <span
        role="spinbutton"
        aria-label="Hour"
        aria-valuenow={parsed?.hour}
        aria-valuemin={0}
        aria-valuemax={format === "24h" ? 23 : 12}
        style={getSegmentStyle("hour")}
        onClick={() => handleSegmentClick("hour")}
      >
        {segments.hour}
      </span>

      <span style={separatorStyle}>:</span>

      <span
        role="spinbutton"
        aria-label="Minute"
        aria-valuenow={parsed?.minute}
        aria-valuemin={0}
        aria-valuemax={59}
        style={getSegmentStyle("minute")}
        onClick={() => handleSegmentClick("minute")}
      >
        {segments.minute}
      </span>

      {format === "12h" && (
        <>
          <span style={{ ...separatorStyle, marginLeft: 2 }}> </span>
          <span
            role="spinbutton"
            aria-label="Period"
            style={getSegmentStyle("period")}
            onClick={() => handleSegmentClick("period")}
          >
            {segments.period}
          </span>
        </>
      )}
    </div>
  )
}
