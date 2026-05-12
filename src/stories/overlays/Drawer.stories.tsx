import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, OverlayManagerProvider, Button, Text, Heading } from '../../index';

const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <OverlayManagerProvider>
        <Button onClick={() => setOpen(true)}>Open Left Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} side="left">
          <Heading level={3}>Navigation</Heading>
          <Text>Dashboard</Text>
          <Text>Reports</Text>
          <Text>Settings</Text>
          <Text>Profile</Text>
          <div style={{ marginTop: '16px' }}>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </OverlayManagerProvider>
    );
  },
};

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <OverlayManagerProvider>
        <Button onClick={() => setOpen(true)}>Open Right Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} side="right">
          <Heading level={3}>Details Panel</Heading>
          <Text>Additional information and actions appear here in the right-side panel.</Text>
          <div style={{ marginTop: '16px' }}>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </OverlayManagerProvider>
    );
  },
};
