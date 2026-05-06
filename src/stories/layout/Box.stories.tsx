import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../primitives/Box';
import { Text } from '../../components/Text';
import { Surface } from '../../components/Surface';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box padding="md">
      <Text>Box with md padding</Text>
    </Box>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <Surface variant="raised">
      <Box padding="lg">
        <Text>Box inside Surface — surface background from tokens</Text>
      </Box>
    </Surface>
  ),
};

export const NestedBoxes: Story = {
  render: () => (
    <Box padding="lg" background="surface" border radius="md">
      <Text weight="medium">Outer Box (lg padding, surface bg, border)</Text>
      <Box padding="md" background="background" border radius="sm">
        <Text>Inner Box (md padding, background bg, border)</Text>
        <Box padding="sm">
          <Text size="sm" color="secondary">Innermost Box (sm padding)</Text>
        </Box>
      </Box>
    </Box>
  ),
};
