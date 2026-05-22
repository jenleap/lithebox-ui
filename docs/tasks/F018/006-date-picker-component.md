# Task 006: DatePicker Component

## Feature
F018 - Date Picker & Time Picker

## Description
Implement the `DatePicker` React component. It renders a styled trigger input (showing the formatted selected date or placeholder), and a `Popover` containing a calendar UI. The calendar supports month navigation, day selection, keyboard navigation, and min/max date constraints. All styling is token-driven via `DatePickerContract`.

## Files
- `src/components/DatePicker.tsx` (create)

## Implementation Steps

1. Create `src/components/DatePicker.tsx`:

   ```tsx
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
     isSameDay,
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
     const [focusedDate, setFocusedDate] = useState<Date | null>(value ?? null)
     const anchorRef = useRef<HTMLDivElement>(null)
     const calendarRef = useRef<HTMLDivElement>(null)

     const grid = buildCalendarGrid(viewYear, viewMonth, value, minDate, maxDate)

     const openCalendar = () => {
       if (disabled) return
       const base = value ?? today
       setViewYear(base.getFullYear())
       setViewMonth(base.getMonth())
       setFocusedDate(value ?? null)
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

     // Focus the first day cell when calendar opens
     useEffect(() => {
       if (!open) return
       const timer = setTimeout(() => {
         const cell = calendarRef.current?.querySelector<HTMLElement>('[data-day]:not([aria-disabled="true"])')
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
       gap: resolveSlot(c.spacing.triggerPadding),
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
       fontSize: 16,
       lineHeight: 1,
       padding: "2px 6px",
       borderRadius: resolveSlot(c.radius.day),
     }

     const dayLabelStyle: React.CSSProperties = {
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

     const getDayStyle = (day: typeof grid[0][0]): React.CSSProperties => {
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
           <span style={{ color: resolveSlot(c.trigger.icon), fontSize: 14 }}>📅</span>
         </div>

         <Popover open={open} onClose={closeCalendar} anchorRef={anchorRef as React.RefObject<HTMLElement>}>
           <div style={calendarStyle} ref={calendarRef} onKeyDown={handleCalendarKeyDown}>
             <div style={headerStyle}>
               <button style={navBtnStyle} onClick={handlePrevMonth} aria-label="Previous month">‹</button>
               <span>{getMonthLabel(viewYear, viewMonth)}</span>
               <button style={navBtnStyle} onClick={handleNextMonth} aria-label="Next month">›</button>
             </div>

             <div style={dayLabelStyle} aria-hidden="true">
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
                   tabIndex={day.isSelected || (i === 0 && !value) ? 0 : -1}
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
   ```

## Constraints
- All colors must come from `DatePickerContract` via `resolveSlot()` — except `#ffffff` for selected day text (no onPrimary token exists)
- The calendar grid uses CSS Grid with 7 columns for the day layout
- Keyboard navigation: ArrowRight/Left/Up/Down move focus between day cells; Enter/Space selects
- Do not import date-fns or any external date library — use vanilla JS Date
- The `Popover` component must be imported from `./Popover`
- The trigger uses `role="button"` (not `<button>`) to allow flexible width styling
- emoji calendar icon (`📅`) is used as a lightweight icon for MVP — not from the Icon component

## Acceptance Criteria
- Clicking the trigger opens the calendar popover
- The correct month and year are shown in the header
- All 6 weeks × 7 days render in the grid
- Clicking a day calls `onChange` with the selected `Date` and closes the popover
- `minDate` and `maxDate` correctly disable out-of-range days
- Today's date is visually distinct (primary color, bold)
- Selected date is visually distinct (primary background, white text)
- Escape closes the calendar without selection
- Keyboard navigation (arrow keys) works within the calendar grid
- Error state shows error border on trigger
- Disabled state prevents opening and shows reduced opacity
- Works in both light and dark theme modes

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Open Storybook (`npm run storybook`) — verify in `src/stories/forms/DatePicker.stories.tsx` (Task 010)
3. Click trigger → calendar opens below trigger
4. Navigate months with ‹ › buttons
5. Click a day → trigger shows formatted date, calendar closes
6. Press Escape → calendar closes without selection
7. Press arrow keys inside calendar → focus moves between days
8. Set `minDate` / `maxDate` → out-of-range days appear disabled and are unclickable
9. Toggle theme mode → calendar and trigger render correctly in dark mode

## Notes
The `focusedDate` state is declared but primarily used to set initial `tabIndex` on days. The `setTimeout(50)` on open is needed to let the portal mount before focusing the first cell. The hover state is applied via inline `onMouseEnter/Leave` to avoid creating a per-cell styled component.
