import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationManagerProvider, useToast, Button } from '../../index';

function ToastDemo({ variant }: { variant: 'success' | 'error' | 'info' | 'warning' }) {
  const toast = useToast();
  return (
    <div style={{ padding: '24px' }}>
      <Button onClick={() => toast[variant](`${variant} notification`, { description: 'This is the description.' })}>
        Show {variant} toast
      </Button>
    </div>
  );
}

const meta: Meta = {
  title: 'Feedback/Toast',
  decorators: [
    (Story) => (
      <NotificationManagerProvider>
        <Story />
      </NotificationManagerProvider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Success: StoryObj = {
  render: () => <ToastDemo variant="success" />,
};

export const Error: StoryObj = {
  render: () => <ToastDemo variant="error" />,
};

export const Info: StoryObj = {
  render: () => <ToastDemo variant="info" />,
};

export const Warning: StoryObj = {
  render: () => <ToastDemo variant="warning" />,
};

function MultiToastDemo() {
  const toast = useToast();
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '220px' }}>
      <Button onClick={() => toast.success('Saved successfully')}>Success</Button>
      <Button onClick={() => toast.error('Something went wrong')}>Error</Button>
      <Button onClick={() => toast.info('Update available')}>Info</Button>
      <Button onClick={() => toast.warning('Low disk space')}>Warning</Button>
    </div>
  );
}

export const AllVariants: StoryObj = {
  name: 'All Variants (Interactive)',
  render: () => <MultiToastDemo />,
};

function PersistentToastDemo() {
  const toast = useToast();
  return (
    <div style={{ padding: '24px' }}>
      <Button
        onClick={() =>
          toast.info('Background sync complete', {
            description: 'All changes saved.',
            duration: 60000,
            dismissible: true,
          })
        }
      >
        Show persistent toast (60s)
      </Button>
    </div>
  );
}

export const Persistent: StoryObj = {
  render: () => <PersistentToastDemo />,
};

function NonDismissibleDemo() {
  const toast = useToast();
  return (
    <div style={{ padding: '24px' }}>
      <Button onClick={() => toast.warning('This cannot be dismissed manually', { dismissible: false, duration: 3000 })}>
        Show non-dismissible toast
      </Button>
    </div>
  );
}

export const NonDismissible: StoryObj = {
  render: () => <NonDismissibleDemo />,
};
