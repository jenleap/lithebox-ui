import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text, Stack } from '../../index';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: () => <Text>The quick brown fox jumps over the lazy dog.</Text>,
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <Text size="sm">size=sm — The quick brown fox</Text>
      <Text size="md">size=md — The quick brown fox</Text>
      <Text size="lg">size=lg — The quick brown fox</Text>
      <Text size="xl">size=xl — The quick brown fox</Text>
    </Stack>
  ),
};

export const Muted: Story = {
  render: () => (
    <Stack gap="sm">
      <Text color="primary">Primary text color</Text>
      <Text color="secondary">Secondary text color — muted</Text>
    </Stack>
  ),
};
