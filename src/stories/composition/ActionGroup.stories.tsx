import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Row, Stack, Card, Button, Label, Text } from '../../index';

const meta: Meta = {
  title: 'Composition/ActionGroup',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Row gap="sm">
      <Button variant="primary">Confirm</Button>
      <Button variant="secondary">Cancel</Button>
    </Row>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Stack gap="md">
      <Label>Review your changes</Label>
      <Text color="secondary">
        Once confirmed, this action cannot be undone.
      </Text>
      <Row gap="sm">
        <Button variant="primary">Confirm</Button>
        <Button variant="ghost">Go Back</Button>
      </Row>
    </Stack>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card padding="md">
      <Stack gap="md">
        <Text>Are you sure you want to delete this item?</Text>
        <Row gap="sm">
          <Button variant="primary">Confirm</Button>
          <Button variant="secondary">Cancel</Button>
        </Row>
      </Stack>
    </Card>
  ),
};
