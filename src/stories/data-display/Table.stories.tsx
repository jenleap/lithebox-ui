import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableCell, Badge } from '../../index';

const meta: Meta = {
  title: 'Data Display/Table',
};

export default meta;

type Story = StoryObj;

const rows = [
  { name: 'Alice Johnson', status: 'active', role: 'Engineer' },
  { name: 'Bob Smith', status: 'inactive', role: 'Designer' },
  { name: 'Carol White', status: 'active', role: 'Product Manager' },
];

export const Comfortable: Story = {
  render: () => (
    <Table density="comfortable">
      <TableHeader>
        <TableRow>
          <TableCell header>Name</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header>Role</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'active' ? 'success' : 'default'}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table density="compact">
      <TableHeader>
        <TableRow>
          <TableCell header>Name</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header>Role</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>
              <Badge variant={row.status === 'active' ? 'success' : 'default'}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
