import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider, Stack, Card, Text, Heading } from '../../index';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <Stack gap="md">
      <Text>Content above the divider</Text>
      <Divider />
      <Text>Content below the divider</Text>
    </Stack>
  ),
};

export const WithinCard: Story = {
  render: () => (
    <Card padding="md">
      <Stack gap="md">
        <Heading level={3}>Top Section</Heading>
        <Divider />
        <Text>Bottom section content separated by a divider.</Text>
      </Stack>
    </Card>
  ),
};
