import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageTransition } from '../../index';

const meta: Meta<typeof PageTransition> = {
  title: 'Motion/Page Transition',
  component: PageTransition,
};

export default meta;

type Story = StoryObj<typeof PageTransition>;

const SampleContent = () => (
  <div style={{ padding: '24px', background: '#f5f5f5', borderRadius: 8 }}>
    <h2 style={{ margin: '0 0 8px' }}>Page Content</h2>
    <p style={{ margin: 0, color: '#555' }}>This content is wrapped in a PageTransition.</p>
  </div>
);

export const Active: Story = {
  render: () => (
    <PageTransition active={true}>
      <SampleContent />
    </PageTransition>
  ),
};

export const Inactive: Story = {
  render: () => (
    <PageTransition active={false}>
      <SampleContent />
    </PageTransition>
  ),
};

export const Toggle: Story = {
  render: () => {
    const [active, setActive] = useState(true);
    return (
      <div style={{ padding: '24px' }}>
        <button
          onClick={() => setActive(v => !v)}
          style={{ marginBottom: '16px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Toggle Page ({active ? 'visible' : 'hidden'})
        </button>
        <PageTransition active={active}>
          <SampleContent />
        </PageTransition>
      </div>
    );
  },
};
