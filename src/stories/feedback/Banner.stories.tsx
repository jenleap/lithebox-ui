import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Banner, NotificationManagerProvider } from '../../index';

const meta: Meta<typeof Banner> = {
  title: 'Feedback/Banner',
  component: Banner,
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

type Story = StoryObj<typeof Banner>;

export const Success: Story = {
  render: () => (
    <Banner
      banner={{
        id: 'b1',
        variant: 'success',
        title: 'Changes saved',
        description: 'Your profile has been updated successfully.',
        dismissible: true,
        lifecycleState: 'visible',
      }}
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <Banner
      banner={{
        id: 'b2',
        variant: 'warning',
        title: 'Scheduled maintenance',
        description: 'System will be down on Friday at 2 AM.',
        dismissible: true,
        lifecycleState: 'visible',
      }}
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Banner
      banner={{
        id: 'b3',
        variant: 'error',
        title: 'Service disruption',
        description: 'We are experiencing issues. Please try again later.',
        dismissible: false,
        lifecycleState: 'visible',
      }}
    />
  ),
};

export const Info: Story = {
  render: () => (
    <Banner
      banner={{
        id: 'b4',
        variant: 'info',
        title: 'New features available',
        description: 'Check the release notes for what\'s new.',
        dismissible: true,
        lifecycleState: 'visible',
      }}
    />
  ),
};

export const NonDismissible: Story = {
  name: 'Non-Dismissible',
  render: () => (
    <Banner
      banner={{
        id: 'b5',
        variant: 'warning',
        title: 'Read-only mode',
        description: 'You do not have permission to edit this resource.',
        dismissible: false,
        lifecycleState: 'visible',
      }}
    />
  ),
};

export const TitleOnly: Story = {
  name: 'Title Only',
  render: () => (
    <Banner
      banner={{
        id: 'b6',
        variant: 'info',
        title: 'Informational notice with no description.',
        dismissible: true,
        lifecycleState: 'visible',
      }}
    />
  ),
};
