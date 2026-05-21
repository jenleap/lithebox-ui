import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveProvider, Box, Stack, Row, useBreakpoint } from '../../index';

const meta: Meta = {
  title: 'Responsive/Layout Primitives',
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
      Current breakpoint: <strong>{breakpoint}</strong>
    </div>
  );
}

const ColorBox = ({ label, color }: { label: string; color: string }) => (
  <div style={{
    background: color,
    borderRadius: '6px',
    padding: '16px',
    color: 'white',
    fontWeight: 600,
    textAlign: 'center',
    minWidth: '80px',
  }}>
    {label}
  </div>
);

export const ResponsiveStack: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#555' }}>
        Stack switches from <code>column</code> (mobile) to <code>row</code> (desktop). Resize to see it.
      </p>
      <Stack direction={{ sm: 'column', lg: 'row' }} gap="md">
        <ColorBox label="Item A" color="#6366f1" />
        <ColorBox label="Item B" color="#8b5cf6" />
        <ColorBox label="Item C" color="#a78bfa" />
      </Stack>
      <BreakpointLabel />
    </div>
  ),
};

export const ResponsiveBox: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#555' }}>
        Box padding increases with screen size: <code>xs</code> → <code>sm</code> → <code>lg</code>.
      </p>
      <Box
        padding={{ sm: 'xs', md: 'sm', lg: 'lg' }}
        background="surface"
        border
        radius="md"
      >
        <div style={{ fontFamily: 'monospace' }}>Padding changes per breakpoint</div>
      </Box>
      <BreakpointLabel />
    </div>
  ),
};

export const ResponsiveRow: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px', fontSize: '13px', color: '#555' }}>
        Row gap changes: tight on mobile, spacious on desktop.
      </p>
      <Row gap={{ sm: 'xs', md: 'sm', lg: 'xl' }} wrap>
        {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((label) => (
          <div key={label} style={{
            padding: '8px 16px',
            background: '#e0e7ff',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#3730a3',
          }}>
            {label}
          </div>
        ))}
      </Row>
      <BreakpointLabel />
    </div>
  ),
};
