import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Stack, Heading, Text, Button, Divider } from '../../index';

const meta: Meta = {
  title: 'Composition/CardSection',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card padding="md">
      <Stack gap="md">
        <Heading level={3}>Feature Highlight</Heading>
        <Text>
          This card demonstrates a standard content + action pattern used throughout the application.
        </Text>
        <Button variant="primary">Get Started</Button>
      </Stack>
    </Card>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Card padding="md">
      <Stack gap="md">
        <Heading level={3}>Plan Summary</Heading>
        <Text>Your current subscription includes all core features.</Text>
        <Divider />
        <Heading level={4}>Billing</Heading>
        <Text>Next invoice on June 1, 2026.</Text>
      </Stack>
    </Card>
  ),
};

export const Nested: Story = {
  render: () => (
    <Stack gap="md">
      <Card padding="md">
        <Stack gap="sm">
          <Heading level={3}>Item One</Heading>
          <Text>Description for the first card in the list.</Text>
        </Stack>
      </Card>
      <Card padding="md">
        <Stack gap="sm">
          <Heading level={3}>Item Two</Heading>
          <Text>Description for the second card in the list.</Text>
        </Stack>
      </Card>
    </Stack>
  ),
};
