import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Text, Heading, Divider } from '../../index'
import { getAllPatterns } from '../../metadata/patternRegistry'
import type { UIPattern } from '../../metadata/types'
import '../../metadata/patternRegistry'

const tagStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: '4px',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  fontFamily: 'monospace',
  fontSize: '12px',
  marginRight: '4px',
  marginBottom: '4px',
}

const codeBlockStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '13px',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '6px',
  padding: '12px 16px',
  whiteSpace: 'pre',
  overflowX: 'auto',
  lineHeight: '1.6',
}

function PatternExplorer({ patternName }: { patternName: string }) {
  const registry = getAllPatterns()
  const pattern: UIPattern | undefined = registry[patternName]

  if (!pattern) {
    return (
      <Stack gap="md" style={{ padding: '24px' }}>
        <Text color="error">Pattern "{patternName}" not found in registry.</Text>
      </Stack>
    )
  }

  return (
    <Stack gap="xl" style={{ padding: '24px', maxWidth: '900px' }}>
      <Stack gap="xs">
        <Heading level={2}>{pattern.name}</Heading>
        <Text color="secondary">{pattern.description}</Text>
      </Stack>

      <Divider />

      <Stack gap="sm">
        <Text weight="semibold">Structure</Text>
        <div style={codeBlockStyle}>{pattern.structure.join('\n')}</div>
      </Stack>

      <Divider />

      <Stack gap="sm">
        <Text weight="semibold">Components Used</Text>
        <div>{pattern.components.map(c => <span key={c} style={tagStyle}>{c}</span>)}</div>
      </Stack>

      <Divider />

      <Stack gap="sm">
        <Text weight="semibold">Usage Guidelines</Text>
        <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
          {pattern.usage.map(u => <li key={u}>{u}</li>)}
        </ul>
      </Stack>

      {pattern.constraints && pattern.constraints.length > 0 && (
        <>
          <Divider />
          <Stack gap="sm">
            <Text weight="semibold">Constraints</Text>
            <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8', color: 'var(--color-error)' }}>
              {pattern.constraints.map(c => <li key={c}>{c}</li>)}
            </ul>
          </Stack>
        </>
      )}
    </Stack>
  )
}

const allPatternNames = Object.keys(getAllPatterns()).sort()

const meta: Meta<typeof PatternExplorer> = {
  title: 'Metadata System / Pattern Explorer',
  component: PatternExplorer,
  argTypes: {
    patternName: {
      control: { type: 'select' },
      options: allPatternNames,
    },
  },
}

export default meta

type Story = StoryObj<typeof PatternExplorer>

export const KPIRow: Story = {
  args: { patternName: 'AnalyticsKPIRow' },
}

export const SettingsForm: Story = {
  args: { patternName: 'SettingsFormLayout' },
}

export const DashboardHeader: Story = {
  args: { patternName: 'DashboardHeader' },
}

export const TableToolbar: Story = {
  args: { patternName: 'DataTableToolbar' },
}
