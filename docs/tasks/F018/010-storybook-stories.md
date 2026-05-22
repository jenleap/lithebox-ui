# Task 010: Storybook Stories

## Feature
F018 - Date Picker & Time Picker

## Description
Create Storybook stories for the `DatePicker` and `TimePicker` components. Stories must cover all key states and interaction modes: default (empty), with a selected value, with min/max constraints, error state, disabled state, and 12h vs 24h mode for TimePicker.

## Files
- `src/stories/forms/DatePicker.stories.tsx` (create)
- `src/stories/forms/TimePicker.stories.tsx` (create)

## Implementation Steps

1. Create `src/stories/forms/DatePicker.stories.tsx`:

   ```tsx
   import React, { useState } from "react"
   import type { Meta, StoryObj } from "@storybook/react"
   import { DatePicker } from "../../index"

   const meta: Meta<typeof DatePicker> = {
     title: "Forms/DatePicker",
     component: DatePicker,
   }

   export default meta

   type Story = StoryObj<typeof DatePicker>

   export const Default: Story = {
     render: () => {
       const [value, setValue] = useState<Date | null>(null)
       return (
         <DatePicker
           value={value}
           onChange={setValue}
           placeholder="Select date"
         />
       )
     },
   }

   export const WithValue: Story = {
     render: () => {
       const [value, setValue] = useState<Date | null>(new Date(2024, 5, 15))
       return (
         <DatePicker
           value={value}
           onChange={setValue}
         />
       )
     },
   }

   export const WithMinMaxDate: Story = {
     render: () => {
       const [value, setValue] = useState<Date | null>(null)
       const today = new Date()
       const minDate = new Date(today)
       minDate.setDate(today.getDate() - 7)
       const maxDate = new Date(today)
       maxDate.setDate(today.getDate() + 14)
       return (
         <DatePicker
           value={value}
           onChange={setValue}
           minDate={minDate}
           maxDate={maxDate}
           placeholder="Select within ±2 weeks"
         />
       )
     },
   }

   export const WithError: Story = {
     render: () => {
       const [value, setValue] = useState<Date | null>(null)
       return (
         <DatePicker
           value={value}
           onChange={setValue}
           placeholder="Select date"
           error
         />
       )
     },
   }

   export const Disabled: Story = {
     render: () => (
       <DatePicker
         value={new Date(2024, 5, 15)}
         onChange={() => {}}
         disabled
       />
     ),
   }
   ```

2. Create `src/stories/forms/TimePicker.stories.tsx`:

   ```tsx
   import React, { useState } from "react"
   import type { Meta, StoryObj } from "@storybook/react"
   import { TimePicker } from "../../index"

   const meta: Meta<typeof TimePicker> = {
     title: "Forms/TimePicker",
     component: TimePicker,
   }

   export default meta

   type Story = StoryObj<typeof TimePicker>

   export const Default24h: Story = {
     render: () => {
       const [value, setValue] = useState<string | null>(null)
       return (
         <TimePicker
           value={value}
           onChange={setValue}
           format="24h"
         />
       )
     },
   }

   export const Default12h: Story = {
     render: () => {
       const [value, setValue] = useState<string | null>(null)
       return (
         <TimePicker
           value={value}
           onChange={setValue}
           format="12h"
         />
       )
     },
   }

   export const WithValue24h: Story = {
     render: () => {
       const [value, setValue] = useState<string | null>("14:30")
       return (
         <TimePicker
           value={value}
           onChange={setValue}
           format="24h"
         />
       )
     },
   }

   export const WithValue12h: Story = {
     render: () => {
       const [value, setValue] = useState<string | null>("09:15")
       return (
         <TimePicker
           value={value}
           onChange={setValue}
           format="12h"
         />
       )
     },
   }

   export const WithStep15Minutes: Story = {
     render: () => {
       const [value, setValue] = useState<string | null>("09:00")
       return (
         <TimePicker
           value={value}
           onChange={setValue}
           format="24h"
           stepMinutes={15}
         />
       )
     },
   }

   export const WithError: Story = {
     render: () => {
       const [value, setValue] = useState<string | null>(null)
       return (
         <TimePicker
           value={value}
           onChange={setValue}
           format="24h"
           error
         />
       )
     },
   }

   export const Disabled: Story = {
     render: () => (
       <TimePicker
         value="09:30"
         onChange={() => {}}
         format="24h"
         disabled
       />
     ),
   }
   ```

## Constraints
- Import from `"../../index"` (not from the component file directly) — validates the public export surface
- Use `useState` in render functions for controlled state (same pattern as existing form stories)
- Do not use `args` table format — use explicit `render` functions like the existing form stories (`Select.stories.tsx`, `Input.stories.tsx`)
- Stories go in `src/stories/forms/` (not a new directory)

## Acceptance Criteria
- Both story files exist at the specified paths
- Storybook loads without errors (`npm run storybook`)
- DatePicker stories: Default, WithValue, WithMinMaxDate, WithError, Disabled all render correctly
- TimePicker stories: Default24h, Default12h, WithValue24h, WithValue12h, WithStep15Minutes, WithError, Disabled all render correctly
- TypeScript compiles with no errors (`npm run build`)

## Test Steps
1. Run `npm run build` — no TypeScript errors
2. Run `npm run storybook`
3. Navigate to Forms/DatePicker — verify all 5 stories render
4. Navigate to Forms/TimePicker — verify all 7 stories render
5. In Default story: click trigger → calendar opens; click a date → calendar closes, trigger shows date
6. In WithMinMaxDate story: verify out-of-range days appear disabled in calendar
7. In TimePicker Default24h: click hour segment → highlight appears; ArrowUp/Down changes hour
8. In TimePicker Default12h: verify period segment shows and toggles AM/PM

## Notes
The `WithMinMaxDate` story uses `new Date()` to compute relative min/max dates. This means the disabled days change daily — that's intentional (demonstrates the constraint feature, not a static fixture). The `WithValue` stories use fixed dates (e.g., `new Date(2024, 5, 15)`) so they're stable across runs.
