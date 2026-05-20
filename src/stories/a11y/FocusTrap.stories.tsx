import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Drawer, Button, Input, OverlayManagerProvider, Stack, Text } from '../../index';

const meta: Meta = {
  title: 'A11y/FocusTrap',
};

export default meta;

type Story = StoryObj;

export const ModalFocusTrap: Story = {
  name: 'Modal Focus Trap',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    return (
      <OverlayManagerProvider>
        <Stack gap="md">
          <Text>Tab key is contained within the modal. Shift+Tab wraps from first to last. Close with Escape or the close button.</Text>
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Stack gap="md">
              <Text>Modal content — focus is trapped here.</Text>
              <Input id="trap-input" value={value} onChange={setValue} placeholder="Type something..." />
              <Button onClick={() => setOpen(false)}>Close</Button>
            </Stack>
          </Modal>
        </Stack>
      </OverlayManagerProvider>
    );
  },
};

export const DrawerFocusTrap: Story = {
  name: 'Drawer Focus Trap',
  render: () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    return (
      <OverlayManagerProvider>
        <Stack gap="md">
          <Text>Tab key is contained within the drawer. Shift+Tab wraps from first to last. Close with Escape or the close button.</Text>
          <Button onClick={() => setOpen(true)}>Open Drawer</Button>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Stack gap="md">
              <Text>Drawer content — focus is trapped here.</Text>
              <Input id="drawer-input" value={value} onChange={setValue} placeholder="Type something..." />
              <Button onClick={() => setOpen(false)}>Close</Button>
            </Stack>
          </Drawer>
        </Stack>
      </OverlayManagerProvider>
    );
  },
};
