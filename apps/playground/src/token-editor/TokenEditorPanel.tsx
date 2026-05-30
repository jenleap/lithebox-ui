import React, { useState } from 'react'
import { useTokenEditor } from './TokenEditorContext'
import { JsonEditorTab } from './JsonEditorTab'
import { VisualEditorTab } from './VisualEditorTab'

type Tab = 'json' | 'visual'

const panelStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: 360,
  background: 'var(--color-surface)',
  borderLeft: '1px solid var(--color-border)',
  boxShadow: 'var(--shadow-md)',
  zIndex: 500,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  fontFamily: 'var(--font-family-base)',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'var(--spacing-md)',
  borderBottom: '1px solid var(--color-border)',
  flexShrink: 0,
}

const titleStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 'var(--font-size-md)',
  color: 'var(--color-text)',
}

const iconBtnStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding: '2px var(--spacing-sm)',
  cursor: 'pointer',
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-family-base)',
}

const tabBarStyle: React.CSSProperties = {
  display: 'flex',
  borderBottom: '1px solid var(--color-border)',
  flexShrink: 0,
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: 'var(--spacing-sm) var(--spacing-md)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
  }
}

const contentStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: 'var(--spacing-md)',
}

export function TokenEditorPanel() {
  const { tokens, isOpen, setIsOpen, setTokens } = useTokenEditor()
  const [activeTab, setActiveTab] = useState<Tab>('json')

  if (!isOpen) return null

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <span style={titleStyle}>Token Editor</span>
        <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
          <button style={iconBtnStyle} onClick={() => setTokens({})}>Reset</button>
          <button style={iconBtnStyle} onClick={() => setIsOpen(false)} aria-label="Close token editor">✕</button>
        </div>
      </div>

      <div style={tabBarStyle}>
        <button style={tabStyle(activeTab === 'json')} onClick={() => setActiveTab('json')}>JSON</button>
        <button style={tabStyle(activeTab === 'visual')} onClick={() => setActiveTab('visual')}>Visual</button>
      </div>

      <div style={contentStyle}>
        {activeTab === 'json'
          ? <JsonEditorTab tokens={tokens} onApply={setTokens} />
          : <VisualEditorTab tokens={tokens} onChange={setTokens} />
        }
      </div>
    </div>
  )
}
