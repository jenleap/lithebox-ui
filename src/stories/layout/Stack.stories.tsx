import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Heading } from '../../components/Heading';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
};

export default meta;

type Story = StoryObj<typeof Stack>;

const textItems = ['First item', 'Second item', 'Third item'];

export const Default: Story = {
  render: () => (
    <Stack gap="md">
      {textItems.map((t) => <Text key={t}>{t}</Text>)}
    </Stack>
  ),
};

export const TightGap: Story = {
  render: () => (
    <Stack gap="xs">
      {textItems.map((t) => <Text key={t}>{t}</Text>)}
    </Stack>
  ),
};

export const WideGap: Story = {
  render: () => (
    <Stack gap="xl">
      {textItems.map((t) => <Text key={t}>{t}</Text>)}
    </Stack>
  ),
};

export const WithComponents: Story = {
  render: () => (
    <Stack gap="md">
      <Card padding="md">
        <Heading level={3}>Card One</Heading>
        <Text>Content inside the first card.</Text>
      </Card>
      <Card padding="md">
        <Heading level={3}>Card Two</Heading>
        <Text>Content inside the second card.</Text>
      </Card>
      <Card padding="md">
        <Heading level={3}>Card Three</Heading>
        <Text>Content inside the third card.</Text>
      </Card>
    </Stack>
  ),
};
