import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Stack,
  Heading,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  StatusIndicator,
  EmptyState,
  LoadingState,
} from '../../index';

const meta: Meta = {
  title: 'Data Display/Composition',
};

export default meta;

type Story = StoryObj;

export const ServerStatusDashboard: Story = {
  render: () => (
    <Stack gap="md">
      <Heading level={2}>Infrastructure Status</Heading>
      <Table density="comfortable">
        <TableHeader>
          <TableRow>
            <TableCell header>Service</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header>Uptime</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>API Server</TableCell>
            <TableCell><StatusIndicator variant="success" label="Online" /></TableCell>
            <TableCell><Badge variant="success">99.9%</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Database Primary</TableCell>
            <TableCell><StatusIndicator variant="success" label="Online" /></TableCell>
            <TableCell><Badge variant="success">99.7%</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cache Layer</TableCell>
            <TableCell><StatusIndicator variant="warning" label="Degraded" /></TableCell>
            <TableCell><Badge variant="warning">97.2%</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Message Queue</TableCell>
            <TableCell><StatusIndicator variant="error" label="Offline" /></TableCell>
            <TableCell><Badge variant="error">82.1%</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  ),
};

export const EmptyTable: Story = {
  render: () => (
    <Stack gap="md">
      <Heading level={2}>Deployments</Heading>
      <Table density="comfortable">
        <TableHeader>
          <TableRow>
            <TableCell header>Service</TableCell>
            <TableCell header>Environment</TableCell>
            <TableCell header>Status</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <EmptyState
        title="No deployments yet"
        description="Your deployments will appear here once triggered."
      />
    </Stack>
  ),
};

export const LoadingTable: Story = {
  render: () => (
    <Stack gap="md">
      <Heading level={2}>Deployments</Heading>
      <Table density="comfortable">
        <TableHeader>
          <TableRow>
            <TableCell header>Service</TableCell>
            <TableCell header>Environment</TableCell>
            <TableCell header>Status</TableCell>
          </TableRow>
        </TableHeader>
      </Table>
      <LoadingState label="Loading deployments..." />
    </Stack>
  ),
};
