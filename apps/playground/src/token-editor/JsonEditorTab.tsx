import React, { useEffect, useRef, useState } from 'react'
import type { Tokens } from 'lithebox-ui'

type Props = {
  tokens: Partial<Tokens>
  onApply: (tokens: Partial<Tokens>) => void
}

export function JsonEditorTab({ tokens, onApply }: Props) {
  const [draft, setDraft] = useState(() => JSON.stringify(tokens, null, 2))
  const [error, setError] = useState<string | null>(null)
  const editing = useRef(false)

  useEffect(() => {
    if (!editing.current) {
      setDraft(JSON.stringify(tokens, null, 2))
    }
  }, [tokens])

  function handleApply() {
    try {
      const parsed = JSON.parse(draft)
      onApply(parsed)
      setError(null)
    } catch {
      setError('Invalid JSON — check syntax and try again')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
        Paste a <code>Partial&lt;Tokens&gt;</code> object and click Apply.
      </p>
      <textarea
        value={draft}
        onChange={(e) => { setDraft(e.target.value); setError(null) }}
        onFocus={() => { editing.current = true }}
        onBlur={() => { editing.current = false }}
        spellCheck={false}
        style={{
          width: '100%',
          height: 340,
          fontFamily: 'monospace',
          fontSize: 12,
          lineHeight: 1.5,
          resize: 'vertical',
          padding: 'var(--spacing-sm)',
          boxSizing: 'border-box',
          border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--color-background)',
          color: 'var(--color-text)',
          outline: 'none',
        }}
      />
      {error && (
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-error)' }}>
          {error}
        </p>
      )}
      <button
        onClick={handleApply}
        style={{
          width: '100%',
          padding: 'var(--spacing-sm)',
          background: 'var(--color-primary)',
          color: 'var(--color-background)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
        }}
      >
        Apply
      </button>
    </div>
  )
}
