import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stack, Text, Heading, Divider } from '../../index'
import { getAllComponents } from '../../metadata/registry'
import type { ComponentMetadata, PropSchema } from '../../metadata/types'
import '../../metadata/components/layoutMetadata'
import '../../metadata/components/primitiveMetadata'
import '../../metadata/components/formMetadata'
import '../../metadata/components/navigationMetadata'
import '../../metadata/components/dataDisplayMetadata'
import '../../metadata/components/feedbackMetadata'

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

function PropsTable({ props }: { props: Record<string, PropSchema> }) {
  const entries = Object.entries(props)
  if (entries.length === 0) return <Text size="sm" color="secondary">No props defined</Text>
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Prop</th>
          <th style={thStyle}>Type</th>
          <th style={thStyle}>Required</th>
          <th style={thStyle}>Default</th>
          <th style={thStyle}>Description</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([name, schema]) => (
          <tr key={name}>
            <td style={tdStyle}><code>{name}</code></td>
            <td style={tdStyle}>{schema.enumValues ? schema.enumValues.join(' | ') : schema.type}</td>
            <td style={tdStyle}>{schema.required ? 'Yes' : '—'}</td>
            <td style={tdStyle}>{schema.default !== undefined ? String(schema.default) : '—'}</td>
            <td style={tdStyle}>{schema.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SlotsTable({ slots }: { slots: NonNullable<ComponentMetadata['slots']> }) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Slot</th>
          <th style={thStyle}>Required</th>
          <th style={thStyle}>Allowed Components</th>
          <th style={thStyle}>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(slots).map(([name, schema]) => (
          <tr key={name}>
            <td style={tdStyle}><code>{name}</code></td>
            <td style={tdStyle}>{schema.required ? 'Yes' : '—'}</td>
            <td style={tdStyle}>{schema.allowedComponents?.join(', ') ?? 'Any'}</td>
            <td style={tdStyle}>{schema.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function MetadataExplorer({ componentName }: { componentName: string }) {
  const registry = getAllComponents()
  const meta = registry[componentName]

  if (!meta) {
    return (
      <Stack gap="md" style={{ padding: '24px' }}>
        <Text color="error">Component "{componentName}" not found in registry.</Text>
      </Stack>
    )
  }

  return (
    <Stack gap="xl" style={{ padding: '24px', maxWidth: '900px' }}>
      <Stack gap="xs">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Heading level={2}>{meta.name}</Heading>
          <span style={{ ...tagStyle, background: 'var(--color-primary-subtle)', borderColor: 'var(--color-primary)' }}>
            {meta.category}
          </span>
          <span style={{ ...tagStyle }}>v{meta.version}</span>
        </div>
        <Text color="secondary">{meta.description}</Text>
      </Stack>

      <Divider />

      <Stack gap="sm">
        <Text weight="semibold">Props</Text>
        <PropsTable props={meta.props} />
      </Stack>

      {meta.variants && Object.keys(meta.variants).length > 0 && (
        <>
          <Divider />
          <Stack gap="sm">
            <Text weight="semibold">Variants</Text>
            <div>
              {Object.entries(meta.variants).map(([name, v]) => (
                <div key={name} style={{ marginBottom: '8px' }}>
                  <span style={tagStyle}>{name}</span>
                  <Text size="sm" color="secondary" style={{ display: 'inline' }}>{v.description}</Text>
                </div>
              ))}
            </div>
          </Stack>
        </>
      )}

      {meta.slots && Object.keys(meta.slots).length > 0 && (
        <>
          <Divider />
          <Stack gap="sm">
            <Text weight="semibold">Slots</Text>
            <SlotsTable slots={meta.slots} />
          </Stack>
        </>
      )}

      {meta.states && meta.states.length > 0 && (
        <>
          <Divider />
          <Stack gap="sm">
            <Text weight="semibold">States</Text>
            <div>{meta.states.map(s => <span key={s} style={tagStyle}>{s}</span>)}</div>
          </Stack>
        </>
      )}

      <Divider />
      <Stack gap="sm">
        <Text weight="semibold">Composition Rules</Text>
        <table style={tableStyle}>
          <tbody>
            {meta.composition.allowedParents && (
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600, width: '180px' }}>Allowed Parents</td>
                <td style={tdStyle}>{meta.composition.allowedParents.length ? meta.composition.allowedParents.join(', ') : 'Any'}</td>
              </tr>
            )}
            {meta.composition.allowedChildren && (
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Allowed Children</td>
                <td style={tdStyle}>{meta.composition.allowedChildren.length ? meta.composition.allowedChildren.join(', ') : 'Any'}</td>
              </tr>
            )}
            {meta.composition.disallowedChildren && meta.composition.disallowedChildren.length > 0 && (
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Disallowed Children</td>
                <td style={{ ...tdStyle, color: 'var(--color-error)' }}>{meta.composition.disallowedChildren.join(', ')}</td>
              </tr>
            )}
            {meta.composition.maxDepth !== undefined && (
              <tr>
                <td style={{ ...tdStyle, fontWeight: 600 }}>Max Depth</td>
                <td style={tdStyle}>{meta.composition.maxDepth}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Stack>

      {meta.accessibility && (
        <>
          <Divider />
          <Stack gap="sm">
            <Text weight="semibold">Accessibility</Text>
            <table style={tableStyle}>
              <tbody>
                {meta.accessibility.role && (
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600, width: '180px' }}>ARIA Role</td>
                    <td style={tdStyle}><code>{meta.accessibility.role}</code></td>
                  </tr>
                )}
                {meta.accessibility.focusBehavior && (
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>Focus Behavior</td>
                    <td style={tdStyle}>{meta.accessibility.focusBehavior}</td>
                  </tr>
                )}
                {meta.accessibility.keyboardInteractions && meta.accessibility.keyboardInteractions.length > 0 && (
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>Keyboard</td>
                    <td style={tdStyle}>
                      <ul style={{ margin: 0, paddingLeft: '16px' }}>
                        {meta.accessibility.keyboardInteractions.map(k => <li key={k}>{k}</li>)}
                      </ul>
                    </td>
                  </tr>
                )}
                {meta.accessibility.screenReaderDescription && (
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>Screen Reader</td>
                    <td style={tdStyle}>{meta.accessibility.screenReaderDescription}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Stack>
        </>
      )}

      {meta.usage && (
        <>
          <Divider />
          <Stack gap="sm">
            <Text weight="semibold">Usage Guidelines</Text>
            <Stack gap="xs">
              <Text size="sm" weight="medium" color="success">Recommended</Text>
              <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'monospace', fontSize: '13px' }}>
                {meta.usage.recommended.map(r => <li key={r}>{r}</li>)}
              </ul>
              <Text size="sm" weight="medium" color="error">Discouraged</Text>
              <ul style={{ margin: 0, paddingLeft: '16px', fontFamily: 'monospace', fontSize: '13px' }}>
                {meta.usage.discouraged.map(d => <li key={d}>{d}</li>)}
              </ul>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}

const allComponentNames = Object.keys(getAllComponents()).sort()

const meta: Meta<typeof MetadataExplorer> = {
  title: 'Metadata System / Component Explorer',
  component: MetadataExplorer,
  argTypes: {
    componentName: {
      control: { type: 'select' },
      options: allComponentNames,
    },
  },
}

export default meta

type Story = StoryObj<typeof MetadataExplorer>

export const Default: Story = {
  args: { componentName: 'Box' },
}

export const ButtonMetadata: Story = {
  args: { componentName: 'Button' },
}

export const CardMetadata: Story = {
  args: { componentName: 'Card' },
}

export const FieldMetadata: Story = {
  args: { componentName: 'Field' },
}

export const ModalMetadata: Story = {
  args: { componentName: 'Modal' },
}
