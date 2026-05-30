import React, { useRef, useState } from 'react'
import {
  Heading,
  Stack,
  Card,
  Text,
  Button,
  Modal,
  Drawer,
  Dropdown,
  Field,
  Input,
  Divider,
} from 'lithebox-ui'
import { useToast } from 'lithebox-ui'

function DemoCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card padding="md">
      <Stack gap="sm">
        <Heading level={3}>{title}</Heading>
        <Text color="secondary" size="sm">{description}</Text>
        <Divider />
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
          {children}
        </div>
      </Stack>
    </Card>
  )
}

function ModalDemo() {
  const [open, setOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)
  const [innerOpen, setInnerOpen] = useState(false)

  return (
    <DemoCard
      title="Modal"
      description="Validates focus trapping, Escape key, backdrop, and nested z-index stacking."
    >
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Button variant="secondary" onClick={() => setNestedOpen(true)}>Open Nested Modal</Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack gap="md">
          <Heading level={3}>Modal Title</Heading>
          <Text color="secondary">
            Focus is trapped inside. Tab cycles between buttons only. Escape closes this modal.
          </Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Stack>
      </Modal>

      <Modal open={nestedOpen} onClose={() => setNestedOpen(false)}>
        <Stack gap="md">
          <Heading level={3}>Outer Modal</Heading>
          <Text color="secondary">Open an inner modal to test z-index stacking.</Text>
          <Button onClick={() => setInnerOpen(true)}>Open Inner Modal</Button>
          <Button variant="secondary" onClick={() => setNestedOpen(false)}>Close Outer</Button>
        </Stack>
      </Modal>

      <Modal open={innerOpen} onClose={() => setInnerOpen(false)}>
        <Stack gap="md">
          <Heading level={3}>Inner Modal</Heading>
          <Text color="secondary">This renders above the outer modal. Escape closes only this modal.</Text>
          <Button onClick={() => setInnerOpen(false)}>Close Inner</Button>
        </Stack>
      </Modal>
    </DemoCard>
  )
}

function DrawerDemo() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [drawerName, setDrawerName] = useState('')

  return (
    <DemoCard
      title="Drawer"
      description="Validates focus trapping, Escape key, backdrop click, and form composition inside overlays."
    >
      <Button onClick={() => setLeftOpen(true)}>Open Left Drawer</Button>
      <Button variant="secondary" onClick={() => setRightOpen(true)}>Open Right Drawer</Button>

      <Drawer open={leftOpen} onClose={() => setLeftOpen(false)} side="left">
        <div style={{ padding: 'var(--spacing-lg)', minWidth: 280 }}>
          <Stack gap="md">
            <Heading level={3}>Left Drawer</Heading>
            <Text color="secondary" size="sm">Closes on Escape and backdrop click. Focus trapped.</Text>
            <Field label="Name" htmlFor="drawer-left-name">
              <Input id="drawer-left-name" value={drawerName} onChange={setDrawerName} placeholder="Type something…" />
            </Field>
            <Button variant="secondary" onClick={() => setLeftOpen(false)}>Close</Button>
          </Stack>
        </div>
      </Drawer>

      <Drawer open={rightOpen} onClose={() => setRightOpen(false)} side="right">
        <div style={{ padding: 'var(--spacing-lg)', minWidth: 280 }}>
          <Stack gap="md">
            <Heading level={3}>Right Drawer</Heading>
            <Text color="secondary" size="sm">Slides in from the right. Focus trapped.</Text>
            <Button variant="secondary" onClick={() => setRightOpen(false)}>Close</Button>
          </Stack>
        </div>
      </Drawer>
    </DemoCard>
  )
}

function DropdownDemo() {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const MENU_ITEMS = ['Edit', 'Duplicate', 'Archive', 'Delete']

  return (
    <DemoCard
      title="Dropdown Menu"
      description="Validates arrow-key navigation, Enter selection, Escape to close, click-outside to close."
    >
      <div style={{ position: 'relative' }}>
        <button
          ref={anchorRef}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text)',
          }}
        >
          Actions ▾
        </button>
        <Dropdown open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
          <div role="menu" style={{ minWidth: 160 }}>
            {MENU_ITEMS.map((item) => (
              <div
                key={item}
                role="menuitem"
                tabIndex={-1}
                onClick={() => { setOpen(false); toast.info(`Selected: ${item}`) }}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  cursor: 'pointer',
                  color: item === 'Delete' ? 'var(--color-error)' : 'var(--color-text)',
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-sm)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-background)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </DemoCard>
  )
}

function StackingDemo() {
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownAnchorRef = useRef<HTMLButtonElement>(null)

  return (
    <DemoCard
      title="Z-Index Stacking"
      description="Dropdown inside a Modal must render above the Modal backdrop. Tests overlay coordination."
    >
      <Button onClick={() => setModalOpen(true)}>Open Modal with Dropdown</Button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Stack gap="md">
          <Heading level={3}>Modal with Dropdown</Heading>
          <Text color="secondary">Open the dropdown — it must appear above this modal.</Text>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              ref={dropdownAnchorRef}
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text)',
              }}
            >
              Open Dropdown ▾
            </button>
            <Dropdown open={dropdownOpen} onClose={() => setDropdownOpen(false)} anchorRef={dropdownAnchorRef}>
              <div role="menu" style={{ minWidth: 160 }}>
                {['Option A', 'Option B', 'Option C'].map((item) => (
                  <div
                    key={item}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => { setDropdownOpen(false); toast.success(`Selected: ${item}`) }}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      cursor: 'pointer',
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Dropdown>
          </div>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Close Modal</Button>
        </Stack>
      </Modal>
    </DemoCard>
  )
}

export default function OverlaysPage() {
  return (
    <Stack gap="lg">
      <div>
        <Heading level={1}>Overlay Validation</Heading>
        <Text color="secondary">
          System validation for all Lithebox overlay components — focus management, z-index stacking, and keyboard accessibility.
        </Text>
      </div>

      <ModalDemo />
      <DrawerDemo />
      <DropdownDemo />
      <StackingDemo />

      <Card padding="md">
        <Stack gap="sm">
          <Heading level={3}>Not Yet Implemented</Heading>
          <Text color="secondary" size="sm">
            The following overlay types are not yet in the public API and are tracked for future features:
          </Text>
          <Text color="secondary" size="sm">• Tooltip — contextual hover/focus overlays</Text>
          <Text color="secondary" size="sm">• ContextMenu — right-click triggered menus</Text>
        </Stack>
      </Card>
    </Stack>
  )
}
