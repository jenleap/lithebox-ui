import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '../../index'

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
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
