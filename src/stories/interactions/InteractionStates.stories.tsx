import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, Card, Stack, Row } from '../../index'
import { DEFAULT_STATE_TOKEN_MAP, resolveStateStyles } from '../../interactions'
import type { InteractionState } from '../../interactions'

const meta: Meta = {
  title: 'Interactions/Interaction States',
}

export default meta

type Story = StoryObj

const ALL_STATES: InteractionState[] = ['idle', 'hover', 'active', 'focus', 'disabled', 'loading']

export const ButtonAllStates: Story = {
  render: () => (
    <Row gap="md" align="center" style={{ flexWrap: 'wrap' }}>
      {ALL_STATES.map((state) => (
        <Stack key={state} gap="xs" style={{ alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {state}
          </span>
          <div style={resolveStateStyles(state)}>
            <Button disabled={state === 'disabled'} loading={state === 'loading'}>
              {state === 'loading' ? 'Loading...' : 'Button'}
            </Button>
          </div>
        </Stack>
      ))}
    </Row>
  ),
}

export const LiveStateSimulator: Story = {
  args: {
    state: 'idle',
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ALL_STATES,
    },
  },
  render: ({ state }: { state: InteractionState }) => (
    <Stack gap="md">
      <Button
        disabled={state === 'disabled'}
        loading={state === 'loading'}
      >
        {state === 'loading' ? 'Loading...' : 'Simulate State'}
      </Button>
      <span style={{ fontSize: '12px', color: '#888' }}>
        Selected: <strong>{state}</strong>
        {(state === 'idle' || state === 'hover' || state === 'active' || state === 'focus') &&
          ' — interact with the button above to see live state'}
      </span>
    </Stack>
  ),
}

export const StateTokenOverrideTable: Story = {
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '13px', width: '100%' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>State</th>
          <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>opacity</th>
          <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>cursor</th>
          <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>transform</th>
          <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>filter</th>
        </tr>
      </thead>
      <tbody>
        {ALL_STATES.map((state) => {
          const overrides = DEFAULT_STATE_TOKEN_MAP[state] ?? {}
          return (
            <tr key={state}>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{state}</td>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd', color: overrides.opacity ? '#222' : '#bbb' }}>
                {overrides.opacity ?? '—'}
              </td>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd', color: overrides.cursor ? '#222' : '#bbb' }}>
                {overrides.cursor ?? '—'}
              </td>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd', color: overrides.transform ? '#222' : '#bbb' }}>
                {overrides.transform ?? '—'}
              </td>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd', color: overrides.filter ? '#222' : '#bbb' }}>
                {overrides.filter ?? '—'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  ),
}

export const InteractiveCard: Story = {
  render: () => (
    <Stack gap="md" style={{ maxWidth: '360px' }}>
      <Card interactive padding="md">
        <Stack gap="sm">
          <strong>Interactive Card</strong>
          <span style={{ fontSize: '13px', color: '#666' }}>
            Hover or click to see state transitions (hover → brightness up, active → scale down).
          </span>
        </Stack>
      </Card>
      <Card padding="md">
        <Stack gap="sm">
          <strong>Non-interactive Card</strong>
          <span style={{ fontSize: '13px', color: '#666' }}>
            No interaction states applied.
          </span>
        </Stack>
      </Card>
    </Stack>
  ),
}
