import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator, Stack } from '../../index';

const meta: Meta = {
  title: 'Data Display/StatusIndicator',
};

export default meta;

type Story = StoryObj;

export const AllVariantsWithLabels: Story = {
  render: () => (
    <Stack gap="sm">
      <StatusIndicator variant="default" label="Unknown" />
      <StatusIndicator variant="success" label="Online" />
      <StatusIndicator variant="warning" label="Degraded" />
      <StatusIndicator variant="error" label="Offline" />
      <StatusIndicator variant="info" label="Syncing" />
    </Stack>
  ),
};

export const DotsOnly: Story = {
  render: () => (
    <Stack gap="sm">
      <StatusIndicator variant="default" />
      <StatusIndicator variant="success" />
      <StatusIndicator variant="warning" />
      <StatusIndicator variant="error" />
      <StatusIndicator variant="info" />
    </Stack>
  ),
};
