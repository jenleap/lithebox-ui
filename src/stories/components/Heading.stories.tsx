import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Stack } from '../../index';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  render: () => <Heading level={1}>Page Title</Heading>,
};

export const AllLevels: Story = {
  render: () => (
    <Stack gap="md">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
    </Stack>
  ),
};
