import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Surface, Stack, Box, Text, Label } from '../../index';

const meta: Meta<typeof Surface> = {
  title: 'Components/Surface',
  component: Surface,
};

export default meta;

type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  render: () => (
    <Surface>
      <Box padding="md">
        <Text>Surface base variant — background color</Text>
      </Box>
    </Surface>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap="md">
      <Stack gap="xs">
        <Label>base</Label>
        <Surface variant="base">
          <Box padding="md"><Text>Base surface</Text></Box>
        </Surface>
      </Stack>
      <Stack gap="xs">
        <Label>raised</Label>
        <Surface variant="raised">
          <Box padding="md"><Text>Raised surface — surface color</Text></Box>
        </Surface>
      </Stack>
      <Stack gap="xs">
        <Label>sunken</Label>
        <Surface variant="sunken">
          <Box padding="md"><Text>Sunken surface — background with border</Text></Box>
        </Surface>
      </Stack>
    </Stack>
  ),
};
