import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  useMotionTransition,
  ModalMotionContract,
  DrawerLeftMotionContract,
  BannerMotionContract,
} from '../../index';

const meta: Meta = {
  title: 'Motion/Primitives',
};

export default meta;

type Story = StoryObj;

function AnimatedBox({
  label,
  color,
  contract,
}: {
  label: string;
  color: string;
  contract: typeof ModalMotionContract;
}) {
  const [active, setActive] = useState(true);
  const styles = useMotionTransition(contract, active);

  return (
    <div style={{ marginBottom: '32px' }}>
      <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{label}</p>
      <button
        onClick={() => setActive(v => !v)}
        style={{ marginBottom: '12px', padding: '6px 12px', cursor: 'pointer' }}
      >
        Toggle ({active ? 'in' : 'out'})
      </button>
      <div style={{ width: 100, height: 100, background: color, borderRadius: 8, ...styles }} />
      <pre style={{ fontSize: '10px', marginTop: '8px', background: '#f5f5f5', padding: '6px', borderRadius: 4 }}>
        {`transition: ${styles.transition}\nopacity: ${styles.opacity}`}
      </pre>
    </div>
  );
}

export const EnterAndExit: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <AnimatedBox label="Scale + Fade (Enter/Exit)" color="#6366f1" contract={ModalMotionContract} />
    </div>
  ),
};

export const SlideInLeft: Story = {
  render: () => (
    <div style={{ padding: '24px', overflow: 'hidden' }}>
      <AnimatedBox label="Slide In/Out Left (Drawer)" color="#f59e0b" contract={DrawerLeftMotionContract} />
    </div>
  ),
};

export const FadeOnly: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <AnimatedBox label="Fade Only (Banner/Dropdown)" color="#10b981" contract={BannerMotionContract} />
    </div>
  ),
};
