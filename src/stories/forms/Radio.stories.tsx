import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, Stack } from '../../index';

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('option-a');
    return (
      <Radio
        checked={selected === 'option-a'}
        onChange={() => setSelected('option-a')}
        value="option-a"
        name="demo"
        label="Option A"
      />
    );
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('monthly');
    return (
      <Stack gap="xs">
        <Radio
          checked={selected === 'monthly'}
          onChange={() => setSelected('monthly')}
          value="monthly"
          name="billing"
          label="Monthly billing"
        />
        <Radio
          checked={selected === 'annual'}
          onChange={() => setSelected('annual')}
          value="annual"
          name="billing"
          label="Annual billing (save 20%)"
        />
      </Stack>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Radio
      checked={false}
      onChange={() => {}}
      value="locked"
      name="locked-group"
      label="Unavailable option"
      disabled
    />
  ),
};
