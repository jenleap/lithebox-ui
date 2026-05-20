import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, Text, Stack } from '../../index';
import { resolveA11yState } from '../../a11y';

const meta: Meta = {
  title: 'A11y/A11yStateModel',
};

export default meta;

type Story = StoryObj;

function StateDemo({
  label,
  state,
}: {
  label: string;
  state: Parameters<typeof resolveA11yState>[0];
}) {
  const [value, setValue] = useState('');
  const resolved = resolveA11yState(state);
  return (
    <div style={{ padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <Text style={{ fontWeight: 600, marginBottom: '8px' }}>{label}</Text>
      <Input
        id={`state-demo-${label.toLowerCase().replace(/\s/g, '-')}`}
        value={value}
        onChange={setValue}
        placeholder={label}
        disabled={state.disabled}
        error={state.error}
      />
      <pre style={{ marginTop: '8px', fontSize: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
        {JSON.stringify(resolved, null, 2)}
      </pre>
    </div>
  );
}

export const StateResolution: Story = {
  name: 'State → ARIA Resolution',
  render: () => (
    <Stack gap="lg" style={{ maxWidth: '480px', padding: '24px' }}>
      <Text style={{ fontFamily: 'sans-serif' }}>
        Shows how each accessibility state maps to resolved ARIA attributes via resolveA11yState.
      </Text>
      <StateDemo label="Normal" state={{}} />
      <StateDemo label="Disabled" state={{ disabled: true }} />
      <StateDemo label="Error" state={{ error: true }} />
      <StateDemo label="Loading" state={{ loading: true }} />
      <StateDemo label="Read-only" state={{ readOnly: true }} />
      <StateDemo label="Disabled + Error" state={{ disabled: true, error: true }} />
    </Stack>
  ),
};
