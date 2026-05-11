import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, Text, Card, Stack } from '../../index'
import { ButtonContract } from '../../contracts/ButtonContract'
import { TextContract } from '../../contracts/TextContract'
import { CardContract } from '../../contracts/CardContract'
import { resolveSlot } from '../../contracts/resolveContract'

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  fontFamily: 'monospace',
  fontSize: '13px',
}

const thStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  padding: '6px 10px',
  textAlign: 'left',
  border: '1px solid var(--color-border)',
  fontWeight: 600,
}

const tdStyle: React.CSSProperties = {
  padding: '5px 10px',
  border: '1px solid var(--color-border)',
  verticalAlign: 'top',
}

const resolvedStyle: React.CSSProperties = {
  ...tdStyle,
  color: 'var(--color-text-secondary)',
}

type SlotRow = { dimension: string; slot: string; path: string; resolved: string }

function flattenContract(contract: Record<string, unknown>, prefix = ''): SlotRow[] {
  const rows: SlotRow[] = []
  for (const [dim, slots] of Object.entries(contract)) {
    if (typeof slots === 'object' && slots !== null && !Array.isArray(slots)) {
      for (const [slot, value] of Object.entries(slots as Record<string, unknown>)) {
        if (typeof value === 'string') {
          rows.push({
            dimension: prefix ? `${prefix}.${dim}` : dim,
            slot,
            path: value,
            resolved: resolveSlot(value),
          })
        }
      }
    }
  }
  return rows
}

function ContractTable({ contract, name }: { contract: Record<string, unknown>; name: string }) {
  const rows = flattenContract(contract)
  return (
    <Stack gap="md">
      <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 700 }}>{name} Contract</div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Dimension</th>
            <th style={thStyle}>Slot</th>
            <th style={thStyle}>Semantic Path</th>
            <th style={thStyle}>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.dimension}-${row.slot}`}>
              <td style={tdStyle}>{row.dimension}</td>
              <td style={tdStyle}>{row.slot}</td>
              <td style={tdStyle}>{row.path}</td>
              <td style={resolvedStyle}>{row.resolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stack>
  )
}

const meta: Meta = {
  title: 'Contracts/Inspector',
}

export default meta

type Story = StoryObj

export const ButtonContractInspector: Story = {
  render: () => (
    <Stack gap="xl">
      <ContractTable contract={ButtonContract as unknown as Record<string, unknown>} name="Button" />
      <Stack gap="sm">
        <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600 }}>Live Preview</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">Primary sm</Button>
          <Button variant="primary" size="md">Primary md</Button>
          <Button variant="secondary" size="md">Secondary md</Button>
          <Button variant="ghost" size="md">Ghost md</Button>
        </div>
      </Stack>
    </Stack>
  ),
}

export const TextContractInspector: Story = {
  render: () => (
    <Stack gap="xl">
      <ContractTable contract={TextContract as unknown as Record<string, unknown>} name="Text" />
      <Stack gap="sm">
        <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600 }}>Live Preview</div>
        <Stack gap="xs">
          <Text size="sm">Size: sm</Text>
          <Text size="md">Size: md</Text>
          <Text size="lg">Size: lg</Text>
          <Text size="xl">Size: xl</Text>
          <Text weight="regular">Weight: regular</Text>
          <Text weight="medium">Weight: medium</Text>
          <Text weight="bold">Weight: bold</Text>
          <Text color="primary">Color: primary</Text>
          <Text color="secondary">Color: secondary</Text>
        </Stack>
      </Stack>
    </Stack>
  ),
}

export const CardContractInspector: Story = {
  render: () => (
    <Stack gap="xl">
      <ContractTable contract={CardContract as unknown as Record<string, unknown>} name="Card" />
      <Stack gap="sm">
        <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 600 }}>Live Preview</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Card padding="sm"><Text size="sm">padding: sm</Text></Card>
          <Card padding="md"><Text size="sm">padding: md</Text></Card>
          <Card padding="lg"><Text size="sm">padding: lg</Text></Card>
        </div>
      </Stack>
    </Stack>
  ),
}
