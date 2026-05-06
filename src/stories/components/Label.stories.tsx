import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label, Stack, Text } from '../../index';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Email address</Label>,
};

export const WithContext: Story = {
  render: () => (
    <Stack gap="xs">
      <Label>Field label</Label>
      <Text size="sm" color="secondary">Supporting description for the field</Text>
    </Stack>
  ),
};
