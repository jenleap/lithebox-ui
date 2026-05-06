import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Stack, Heading, Text, Divider } from '../../index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Stack gap="sm">
        <Heading level={3}>Card Title</Heading>
        <Text>Card body text describing the content of this card.</Text>
      </Stack>
    </Card>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <Card padding="lg">
      <Stack gap="sm">
        <Heading level={3}>Card with Large Padding</Heading>
        <Text>This card has explicit lg padding applied.</Text>
      </Stack>
    </Card>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Card padding="md">
      <Stack gap="md">
        <Heading level={3}>Section A</Heading>
        <Text>Content for the first section of this card.</Text>
        <Divider />
        <Heading level={3}>Section B</Heading>
        <Text>Content for the second section of this card.</Text>
      </Stack>
    </Card>
  ),
};
