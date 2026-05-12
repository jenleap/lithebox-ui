import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Row, Stack, Text } from '../../index';

const meta: Meta = {
  title: 'Data Display/Badge',
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <Row gap="sm" align="center">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </Row>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <Stack gap="sm">
      <Row gap="md" align="center">
        <Text>API Server</Text>
        <Badge variant="success">Online</Badge>
      </Row>
      <Row gap="md" align="center">
        <Text>Database Replica</Text>
        <Badge variant="warning">Degraded</Badge>
      </Row>
      <Row gap="md" align="center">
        <Text>Cache Layer</Text>
        <Badge variant="error">Offline</Badge>
      </Row>
      <Row gap="md" align="center">
        <Text>Message Queue</Text>
        <Badge variant="info">Syncing</Badge>
      </Row>
    </Stack>
  ),
};
