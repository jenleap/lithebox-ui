import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ResponsiveProvider,
  Table, TableHeader, TableBody, TableRow, TableCell,
  List, ListItem,
  useBreakpoint,
} from '../../index';

const meta: Meta = {
  title: 'Responsive/Data Display',
  decorators: [
    (Story) => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj;

function BreakpointLabel() {
  const { breakpoint } = useBreakpoint();
  return (
    <div style={{ marginTop: '12px', fontSize: '12px', color: '#888', fontFamily: 'monospace' }}>
      Current breakpoint: <strong>{breakpoint}</strong> — resize to see the responsive transformation.
    </div>
  );
}

const COLUMNS = ['Name', 'Role', 'Status'];
const ROWS = [
  { name: 'Alice Chen', role: 'Engineer', status: 'Active' },
  { name: 'Bob Smith', role: 'Designer', status: 'Active' },
  { name: 'Carol Jones', role: 'PM', status: 'On leave' },
  { name: 'David Kim', role: 'QA', status: 'Active' },
];

export const ResponsiveTable: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#555' }}>
        Full table on desktop, stacked cards on mobile. No horizontal scroll.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableCell key={col} header>{col}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.name}>
              <TableCell label="Name">{row.name}</TableCell>
              <TableCell label="Role">{row.role}</TableCell>
              <TableCell label="Status">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BreakpointLabel />
    </div>
  ),
};

export const ResponsiveList: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#555' }}>
        List uses compact spacing on mobile and comfortable spacing on larger screens.
      </p>
      <List>
        {['Design token architecture', 'Component contract system', 'Breakpoint token system', 'Responsive layout engine', 'Storybook integration'].map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </List>
      <BreakpointLabel />
    </div>
  ),
};
