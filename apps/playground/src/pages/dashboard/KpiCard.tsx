import React from 'react'
import { Card, Text, Heading, Stack } from 'lithebox-ui'

type KpiCardProps = {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
}

const TREND_SYMBOLS = { up: '↑', down: '↓', neutral: '—' }
const TREND_COLORS: Record<string, string> = {
  up: 'var(--color-success, #16a34a)',
  down: 'var(--color-error, #dc2626)',
  neutral: 'var(--color-text-secondary)',
}

export function KpiCard({ label, value, trend = 'neutral' }: KpiCardProps) {
  return (
    <Card padding="md">
      <Stack gap="xs">
        <Text color="secondary" size="sm">{label}</Text>
        <Heading level={3}>{String(value)}</Heading>
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            color: TREND_COLORS[trend],
            fontWeight: 500,
          }}
          aria-label={`Trend: ${trend}`}
        >
          {TREND_SYMBOLS[trend]}
        </span>
      </Stack>
    </Card>
  )
}
