import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Row } from '../../primitives/Row';
import { Box } from '../../primitives/Box';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';

const meta: Meta<typeof Row> = {
  title: 'Layout/Row',
  component: Row,
};

export default meta;

type Story = StoryObj<typeof Row>;

export const Default: Story = {
  render: () => (
    <Row gap="md">
      <Box padding="md" background="surface" border radius="sm"><Text>Item 1</Text></Box>
      <Box padding="md" background="surface" border radius="sm"><Text>Item 2</Text></Box>
      <Box padding="md" background="surface" border radius="sm"><Text>Item 3</Text></Box>
    </Row>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <Row gap="md" align="center">
      <Box padding="sm" background="surface" border><Text size="sm">Short</Text></Box>
      <Box padding="lg" background="surface" border>
        <Text>Taller item</Text>
        <Text size="sm" color="secondary">with more content</Text>
      </Box>
      <Box padding="sm" background="surface" border><Text size="sm">Short</Text></Box>
    </Row>
  ),
};

export const JustifyBetween: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Row gap="md" justify="between">
      <Box padding="md" background="surface" border radius="sm"><Text>Left</Text></Box>
      <Box padding="md" background="surface" border radius="sm"><Text>Right</Text></Box>
    </Row>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <Row gap="sm">
      <Button variant="primary">Confirm</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Skip</Button>
    </Row>
  ),
};
