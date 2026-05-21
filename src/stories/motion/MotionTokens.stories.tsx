import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motionTokens, useMotionTransition, ModalMotionContract, BannerMotionContract } from '../../index';

const meta: Meta = {
  title: 'Motion/Tokens',
};

export default meta;

type Story = StoryObj;

export const DurationAndEasing: Story = {
  render: () => {
    const [active, setActive] = useState(true);
    const modalStyles = useMotionTransition(ModalMotionContract, active);
    const fadeStyles = useMotionTransition(BannerMotionContract, active);

    return (
      <div style={{ padding: '24px', fontFamily: 'monospace' }}>
        <h3 style={{ marginBottom: '16px' }}>Duration Tokens</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '24px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Token</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(motionTokens.duration) as [string, string][]).map(([key, value]) => (
              <tr key={key}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{key}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginBottom: '16px' }}>Easing Tokens</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '24px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Token</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(motionTokens.easing) as [string, string][]).map(([key, value]) => (
              <tr key={key}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{key}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginBottom: '16px' }}>Live Animation Preview</h3>
        <button
          onClick={() => setActive(v => !v)}
          style={{ marginBottom: '16px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Toggle ({active ? 'active' : 'inactive'})
        </button>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Scale + Fade (Modal)</p>
            <div style={{ width: 80, height: 80, background: '#6366f1', borderRadius: 8, ...modalStyles }} />
            <pre style={{ fontSize: '10px', marginTop: '8px', background: '#f5f5f5', padding: '4px' }}>
              {JSON.stringify({ opacity: modalStyles.opacity, transition: modalStyles.transition }, null, 2)}
            </pre>
          </div>
          <div>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Fade Only (Banner)</p>
            <div style={{ width: 80, height: 80, background: '#10b981', borderRadius: 8, ...fadeStyles }} />
            <pre style={{ fontSize: '10px', marginTop: '8px', background: '#f5f5f5', padding: '4px' }}>
              {JSON.stringify({ opacity: fadeStyles.opacity, transition: fadeStyles.transition }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  },
};
