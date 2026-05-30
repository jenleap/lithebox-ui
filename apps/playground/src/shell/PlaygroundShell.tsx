import React, { useState } from 'react'
import {
  AppShell,
  TopBar,
  ContentArea,
  Drawer,
  Text,
} from 'lithebox-ui'
import { useBreakpoint } from 'lithebox-ui'
import { NavItems } from './NavItems'
import { useTokenEditor } from '../token-editor/TokenEditorContext'

type PlaygroundShellProps = {
  children: React.ReactNode
}

function DesktopSidebar() {
  return (
    <div
      style={{
        height: '100%',
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        padding: 'var(--spacing-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}>
        <Text weight="bold" color="primary">Lithebox</Text>
      </div>
      <NavItems />
    </div>
  )
}

export function PlaygroundShell({ children }: PlaygroundShellProps) {
  const { isMobile } = useBreakpoint()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { isOpen, setIsOpen } = useTokenEditor()

  return (
    <AppShell
      sidebar={<DesktopSidebar />}
      header={
        <TopBar>
          {isMobile && (
            <button
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                marginRight: 'var(--spacing-md)',
                color: 'var(--color-text)',
                lineHeight: 1,
              }}
            >
              ☰
            </button>
          )}
          <Text weight="bold" color="primary">Lithebox Playground</Text>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-pressed={isOpen}
            aria-label="Toggle token editor"
            style={{
              background: isOpen ? 'var(--color-primary)' : 'var(--color-surface)',
              color: isOpen ? 'var(--color-background)' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)',
              whiteSpace: 'nowrap',
            }}
          >
            ◧ Tokens
          </button>
        </TopBar>
      }
    >
      {isMobile && (
        <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} side="left">
          <div
            style={{
              padding: 'var(--spacing-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-md)',
            }}
          >
            <div style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}>
              <Text weight="bold" color="primary">Lithebox</Text>
            </div>
            <NavItems onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </Drawer>
      )}
      <ContentArea>{children}</ContentArea>
    </AppShell>
  )
}
