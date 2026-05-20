import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, Button, Text, Stack, OverlayManagerProvider } from '../../index';
import { useKeyboardNavigation } from '../../a11y';

const meta: Meta = {
  title: 'A11y/KeyboardNavigation',
};

export default meta;

type Story = StoryObj;

const DROPDOWN_ITEMS = ['Edit', 'Duplicate', 'Archive', 'Delete'];

export const DropdownKeyboardNav: Story = {
  name: 'Dropdown Keyboard Navigation',
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <OverlayManagerProvider>
        <Stack gap="md">
          <Text>Open the dropdown and use ArrowDown/Up to navigate items (add role="menuitem" to items for arrow keys). Enter/Space selects. Escape closes.</Text>
          {selected && <Text>Selected: {selected}</Text>}
          <Button ref={anchorRef} onClick={() => setOpen(prev => !prev)}>
            Actions
          </Button>
          <Dropdown open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {DROPDOWN_ITEMS.map(item => (
                <button
                  key={item}
                  role="menuitem"
                  onClick={() => { setSelected(item); setOpen(false); }}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px 12px',
                    textAlign: 'left',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </Dropdown>
        </Stack>
      </OverlayManagerProvider>
    );
  },
};

const NAV_ITEMS = ['Dashboard', 'Projects', 'Team', 'Reports', 'Settings'];

export const StandaloneKeyboardNav: Story = {
  name: 'Standalone useKeyboardNavigation',
  render: () => {
    const [lastSelected, setLastSelected] = useState<string | null>(null);
    const { activeIndex, getItemProps } = useKeyboardNavigation({
      itemCount: NAV_ITEMS.length,
      onSelect: (index) => setLastSelected(NAV_ITEMS[index]),
      loop: true,
    });

    return (
      <Stack gap="md">
        <Text>Demonstrates useKeyboardNavigation hook directly. Use ArrowDown/Up on any item, Enter to select. Loop is enabled.</Text>
        {lastSelected && <Text>Last selected: {lastSelected}</Text>}
        <div role="menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '200px' }}>
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item}
              role="menuitem"
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                background: index === activeIndex ? 'var(--color-primary, #0066cc)' : 'transparent',
                color: index === activeIndex ? '#fff' : 'inherit',
                outline: 'none',
              }}
              {...getItemProps(index)}
            >
              {item}
            </div>
          ))}
        </div>
      </Stack>
    );
  },
};
