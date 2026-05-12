import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, OverlayManagerProvider, Button, Text, Heading } from '../../index';

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <OverlayManagerProvider>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Heading level={3}>Confirm Action</Heading>
          <Text>Are you sure you want to proceed? This cannot be undone.</Text>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </OverlayManagerProvider>
    );
  },
};

export const WithLongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <OverlayManagerProvider>
        <Button onClick={() => setOpen(true)}>Open Modal with Long Content</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Heading level={3}>Terms of Service</Heading>
          {Array.from({ length: 10 }).map((_, i) => (
            <Text key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          ))}
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Modal>
      </OverlayManagerProvider>
    );
  },
};
