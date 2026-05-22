import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TimePicker } from '../../index'

const meta: Meta<typeof TimePicker> = {
  title: 'Forms/TimePicker',
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
    const [value, setValue] = useState<string | null>('14:30')
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
    const [value, setValue] = useState<string | null>('09:15')
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
    const [value, setValue] = useState<string | null>('09:00')
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
