import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveProvider, breakpoints, useBreakpoint } from '../../index';

const meta: Meta = {
  title: 'Responsive/Breakpoint Inspector',
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

function Inspector() {
  const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div style={{ padding: '24px', fontFamily: 'monospace' }}>
      <p style={{ marginBottom: '16px', fontSize: '12px', color: '#666' }}>
        Resize the browser window to see the breakpoint update in real time.
      </p>

      <div style={{
        background: '#f0f4ff',
        border: '2px solid #6366f1',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <div>
          <span style={{ fontSize: '12px', color: '#666' }}>Current breakpoint</span>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6366f1' }}>{breakpoint}</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'isMobile', value: isMobile },
            { label: 'isTablet', value: isTablet },
            { label: 'isDesktop', value: isDesktop },
          ].map(({ label, value }) => (
            <div key={label} style={{
              padding: '6px 12px',
              borderRadius: '4px',
              background: value ? '#d1fae5' : '#f3f4f6',
              border: `1px solid ${value ? '#10b981' : '#d1d5db'}`,
              fontSize: '13px',
              color: value ? '#065f46' : '#6b7280',
            }}>
              {label}: <strong>{String(value)}</strong>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ marginBottom: '12px' }}>Breakpoint Token Values</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>Min Width (px)</th>
            <th style={{ padding: '8px 12px', textAlign: 'left', border: '1px solid #ddd' }}>Active</th>
          </tr>
        </thead>
        <tbody>
          {(Object.entries(breakpoints) as [string, number][]).map(([name, width]) => (
            <tr key={name} style={{ background: name === breakpoint ? '#eff6ff' : 'white' }}>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd', fontWeight: name === breakpoint ? 600 : 400 }}>{name}</td>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>{width}px</td>
              <td style={{ padding: '8px 12px', border: '1px solid #ddd' }}>
                {name === breakpoint ? '✓' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Default: Story = {
  render: () => <Inspector />,
};
