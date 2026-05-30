import React from 'react'
import type { Tokens } from 'lithebox-ui'
import { defaultTokens } from 'lithebox-ui'

type Props = {
  tokens: Partial<Tokens>
  onChange: (tokens: Partial<Tokens>) => void
}

// Deep-get a value from an object by path
function deepGet(obj: unknown, path: string[]): unknown {
  let cur = obj as Record<string, unknown>
  for (const key of path) {
    if (cur == null) return undefined
    cur = cur[key] as Record<string, unknown>
  }
  return cur
}

// Deep-merge a single path+value into the existing partial tokens
function deepSet(tokens: Partial<Tokens>, path: string[], value: unknown): Partial<Tokens> {
  if (path.length === 1) {
    return { ...tokens, [path[0]]: value }
  }
  const [head, ...rest] = path
  const existing = (tokens as Record<string, unknown>)[head] ?? {}
  return {
    ...tokens,
    [head]: deepSet(existing as Partial<Tokens>, rest, value),
  }
}

// Resolve display value: override if set, else default
function resolve(tokens: Partial<Tokens>, path: string[]): string {
  const override = deepGet(tokens, path)
  if (override !== undefined) return String(override)
  return String(deepGet(defaultTokens, path) ?? '')
}

// ── Sub-components ────────────────────────────────────────────────────────────

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 'var(--spacing-sm)',
  gap: 'var(--spacing-sm)',
}

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  flexShrink: 0,
}

const sectionHeadStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--color-text-secondary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  margin: 'var(--spacing-md) 0 var(--spacing-sm)',
}

const textInputStyle: React.CSSProperties = {
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-background)',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-sm)',
  padding: '3px var(--spacing-xs)',
  outline: 'none',
}

type ColorRowProps = {
  label: string
  path: string[]
  tokens: Partial<Tokens>
  onChange: (path: string[], value: string) => void
}

function ColorRow({ label, path, tokens, onChange }: ColorRowProps) {
  const value = resolve(tokens, path)
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
        <input
          type="color"
          value={value.startsWith('#') ? value : '#000000'}
          onChange={(e) => onChange(path, e.target.value)}
          style={{
            width: 28,
            height: 28,
            padding: 0,
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            background: 'none',
          }}
        />
        <input
          type="text"
          defaultValue={value}
          key={value}
          onBlur={(e) => {
            const v = e.target.value.trim()
            if (/^#[0-9a-fA-F]{3,6}$/.test(v)) onChange(path, v)
            else e.target.value = value
          }}
          style={{ ...textInputStyle, width: 80, fontFamily: 'monospace' }}
        />
      </div>
    </div>
  )
}

type TextRowProps = {
  label: string
  path: string[]
  tokens: Partial<Tokens>
  onChange: (path: string[], value: string) => void
  wide?: boolean
}

function TextRow({ label, path, tokens, onChange, wide }: TextRowProps) {
  const value = resolve(tokens, path)
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <input
        type="text"
        defaultValue={value}
        key={value}
        onBlur={(e) => onChange(path, e.target.value.trim())}
        style={{ ...textInputStyle, width: wide ? 180 : 90 }}
      />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function VisualEditorTab({ tokens, onChange }: Props) {
  function set(path: string[], value: string) {
    onChange(deepSet(tokens, path, value))
  }

  return (
    <div>
      <p style={{ margin: '0 0 var(--spacing-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        Changes apply immediately. Switch to JSON to see the result.
      </p>

      <h4 style={sectionHeadStyle}>Colors</h4>
      <ColorRow label="Primary" path={['color', 'primary']} tokens={tokens} onChange={set} />
      <ColorRow label="Secondary" path={['color', 'secondary']} tokens={tokens} onChange={set} />
      <ColorRow label="Background" path={['color', 'background']} tokens={tokens} onChange={set} />
      <ColorRow label="Surface" path={['color', 'surface']} tokens={tokens} onChange={set} />
      <ColorRow label="Text / Primary" path={['color', 'text', 'primary']} tokens={tokens} onChange={set} />
      <ColorRow label="Text / Secondary" path={['color', 'text', 'secondary']} tokens={tokens} onChange={set} />
      <ColorRow label="Border" path={['color', 'border']} tokens={tokens} onChange={set} />
      <ColorRow label="Error" path={['color', 'error']} tokens={tokens} onChange={set} />

      <h4 style={sectionHeadStyle}>Radius</h4>
      <TextRow label="sm" path={['radius', 'sm']} tokens={tokens} onChange={set} />
      <TextRow label="md" path={['radius', 'md']} tokens={tokens} onChange={set} />
      <TextRow label="lg" path={['radius', 'lg']} tokens={tokens} onChange={set} />

      <h4 style={sectionHeadStyle}>Spacing</h4>
      <TextRow label="xs" path={['spacing', 'xs']} tokens={tokens} onChange={set} />
      <TextRow label="sm" path={['spacing', 'sm']} tokens={tokens} onChange={set} />
      <TextRow label="md" path={['spacing', 'md']} tokens={tokens} onChange={set} />
      <TextRow label="lg" path={['spacing', 'lg']} tokens={tokens} onChange={set} />
      <TextRow label="xl" path={['spacing', 'xl']} tokens={tokens} onChange={set} />

      <h4 style={sectionHeadStyle}>Typography</h4>
      <TextRow label="Font family" path={['typography', 'fontFamily']} tokens={tokens} onChange={set} wide />
      <TextRow label="Size / sm" path={['typography', 'size', 'sm']} tokens={tokens} onChange={set} />
      <TextRow label="Size / md" path={['typography', 'size', 'md']} tokens={tokens} onChange={set} />
      <TextRow label="Size / lg" path={['typography', 'size', 'lg']} tokens={tokens} onChange={set} />
      <TextRow label="Size / xl" path={['typography', 'size', 'xl']} tokens={tokens} onChange={set} />
      <TextRow label="Weight / regular" path={['typography', 'weight', 'regular']} tokens={tokens} onChange={set} />
      <TextRow label="Weight / medium" path={['typography', 'weight', 'medium']} tokens={tokens} onChange={set} />
      <TextRow label="Weight / bold" path={['typography', 'weight', 'bold']} tokens={tokens} onChange={set} />

      <h4 style={sectionHeadStyle}>Shadow</h4>
      <TextRow label="sm" path={['shadow', 'sm']} tokens={tokens} onChange={set} wide />
      <TextRow label="md" path={['shadow', 'md']} tokens={tokens} onChange={set} wide />
    </div>
  )
}
