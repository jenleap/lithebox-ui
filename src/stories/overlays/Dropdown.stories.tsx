import React, { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, OverlayManagerProvider, Button, Text } from '../../index';

const meta: Meta<typeof Dropdown> = {
  title: 'Overlays/Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <OverlayManagerProvider>
        <div style={{ padding: '40px' }}>
          <button ref={anchorRef} onClick={() => setOpen(prev => !prev)}>
            Open Dropdown
          </button>
          <Dropdown open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Text>Option One</Text>
              <Text>Option Two</Text>
              <Text>Option Three</Text>
            </div>
          </Dropdown>
        </div>
      </OverlayManagerProvider>
    );
  },
};

export const RightAligned: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
      <OverlayManagerProvider>
        <div style={{ padding: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <button ref={anchorRef} onClick={() => setOpen(prev => !prev)}>
            Actions
          </button>
          <Dropdown open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Text>Edit</Text>
              <Text>Duplicate</Text>
              <Text>Delete</Text>
            </div>
          </Dropdown>
        </div>
      </OverlayManagerProvider>
    );
  },
};
