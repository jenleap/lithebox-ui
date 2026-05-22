import React, { useRef, useState, useCallback, useEffect } from "react"
import { resolveSlot } from "../contracts/resolveContract"
import { DatePickerContract } from "../contracts/DatePickerContract"
import { Popover } from "./Popover"
import {
  buildCalendarGrid,
  formatDateDisplay,
  getMonthLabel,
  navigateMonth,
  DAY_LABELS,
} from "./calendarUtils"
import type { DatePickerProps } from "./DateTimePicker.types"

export type { DatePickerProps }

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  minDate,
  maxDate,
  disabled = false,
  error = false,
  id,
}: DatePickerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth())
  const anchorRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  const grid = buildCalendarGrid(viewYear, viewMonth, value, minDate, maxDate)

  const openCalendar = () => {
    if (disabled) return
    const base = value ?? today
    setViewYear(base.getFullYear())
    setViewMonth(base.getMonth())
    setOpen(true)
  }

  const closeCalendar = useCallback(() => setOpen(false), [])

  const selectDate = (date: Date) => {
    onChange(date)
    closeCalendar()
  }

  const handlePrevMonth = () => {
    const { year, month } = navigateMonth(viewYear, viewMonth, -1)
    setViewYear(year)
    setViewMonth(month)
  }

  const handleNextMonth = () => {
    const { year, month } = navigateMonth(viewYear, viewMonth, 1)
    setViewYear(year)
    setViewMonth(month)
  }

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      const cell = calendarRef.current?.querySelector<HTMLElement>('[data-day]:not([disabled])')
      cell?.focus()
    }, 50)
    return () => clearTimeout(timer)
  }, [open])

  const handleCalendarKeyDown = (e: React.KeyboardEvent) => {
    const cells = Array.from(
      calendarRef.current?.querySelectorAll<HTMLElement>('[data-day]') ?? []
    )
    const current = document.activeElement as HTMLElement
    const idx = cells.indexOf(current)
    if (idx === -1) return

    if (e.key === "ArrowRight") { e.preventDefault(); cells[idx + 1]?.focus() }
    else if (e.key === "ArrowLeft") { e.preventDefault(); cells[idx - 1]?.focus() }
    else if (e.key === "ArrowDown") { e.preventDefault(); cells[idx + 7]?.focus() }
    else if (e.key === "ArrowUp") { e.preventDefault(); cells[idx - 7]?.focus() }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      current.click()
    }
  }

  const c = DatePickerContract

  const triggerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: resolveSlot(c.spacing.triggerPadding),
    background: resolveSlot(c.trigger.background),
    border: `1px solid ${error ? resolveSlot(c.states.error.border) : resolveSlot(c.trigger.border)}`,
    borderRadius: resolveSlot(c.radius.trigger),
    fontFamily: resolveSlot(c.typography.fontFamily),
    fontSize: resolveSlot(c.typography.triggerSize),
    color: value ? resolveSlot(c.trigger.text) : resolveSlot(c.trigger.placeholder),
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    minWidth: 180,
    outline: "none",
    boxSizing: "border-box",
  }

  const calendarStyle: React.CSSProperties = {
    padding: resolveSlot(c.spacing.calendarPadding),
    minWidth: 280,
  }

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: resolveSlot(c.spacing.headerGap),
    fontFamily: resolveSlot(c.typography.fontFamily),
    fontSize: resolveSlot(c.typography.headerSize),
    fontWeight: 600,
    color: resolveSlot(c.calendar.header.text),
  }

  const navBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: resolveSlot(c.calendar.header.navButton),
    fontSize: 18,
    lineHeight: 1,
    padding: "2px 8px",
    borderRadius: resolveSlot(c.radius.day),
  }

  const dayLabelRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: resolveSlot(c.spacing.dayGap),
  }

  const dayLabelCellStyle: React.CSSProperties = {
    textAlign: "center",
    fontFamily: resolveSlot(c.typography.fontFamily),
    fontSize: resolveSlot(c.typography.daySize),
    color: resolveSlot(c.calendar.dayLabel),
    padding: "4px 0",
  }

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: resolveSlot(c.spacing.dayGap),
  }

  const getDayStyle = (day: ReturnType<typeof buildCalendarGrid>[0][0]): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      borderRadius: resolveSlot(c.radius.day),
      fontFamily: resolveSlot(c.typography.fontFamily),
      fontSize: resolveSlot(c.typography.daySize),
      cursor: day.isDisabled ? "not-allowed" : "pointer",
      border: "none",
      background: "none",
      outline: "none",
      padding: 0,
    }
    if (day.isSelected) {
      return { ...base, background: resolveSlot(c.calendar.day.selectedBackground), color: "#ffffff" }
    }
    if (day.isDisabled) {
      return { ...base, color: resolveSlot(c.calendar.day.disabledText), opacity: 0.4 }
    }
    if (!day.isCurrentMonth) {
      return { ...base, color: resolveSlot(c.calendar.day.outsideMonthText), opacity: 0.35 }
    }
    if (day.isToday) {
      return { ...base, color: resolveSlot(c.calendar.day.todayText), fontWeight: 700 }
    }
    return { ...base, color: resolveSlot(c.calendar.day.text) }
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        ref={anchorRef}
        id={id}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={triggerStyle}
        onClick={openCalendar}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCalendar() }
        }}
      >
        <span>{value ? formatDateDisplay(value) : placeholder}</span>
        <span style={{ color: resolveSlot(c.trigger.icon), fontSize: 14 }}>&#128197;</span>
      </div>

      <Popover open={open} onClose={closeCalendar} anchorRef={anchorRef as React.RefObject<HTMLElement>}>
        <div style={calendarStyle} ref={calendarRef} onKeyDown={handleCalendarKeyDown}>
          <div style={headerStyle}>
            <button style={navBtnStyle} onClick={handlePrevMonth} aria-label="Previous month">&#8249;</button>
            <span>{getMonthLabel(viewYear, viewMonth)}</span>
            <button style={navBtnStyle} onClick={handleNextMonth} aria-label="Next month">&#8250;</button>
          </div>

          <div style={dayLabelRowStyle} aria-hidden="true">
            {DAY_LABELS.map((label) => (
              <div key={label} style={dayLabelCellStyle}>{label}</div>
            ))}
          </div>

          <div style={gridStyle} role="grid" aria-label="Calendar">
            {grid.flat().map((day, i) => (
              <button
                key={i}
                data-day
                role="gridcell"
                aria-label={day.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                aria-selected={day.isSelected}
                aria-disabled={day.isDisabled}
                tabIndex={day.isSelected ? 0 : -1}
                disabled={day.isDisabled}
                style={getDayStyle(day)}
                onClick={() => !day.isDisabled && selectDate(day.date)}
                onMouseEnter={(e) => {
                  if (!day.isDisabled && !day.isSelected) {
                    (e.currentTarget as HTMLElement).style.background = resolveSlot(c.calendar.day.hoverBackground)
                  }
                }}
                onMouseLeave={(e) => {
                  if (!day.isDisabled && !day.isSelected) {
                    (e.currentTarget as HTMLElement).style.background = "none"
                  }
                }}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  )
}
