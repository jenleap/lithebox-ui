import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption } from '../../index';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
};

export default meta;

type Story = StoryObj<typeof Select>;

const options: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('us');
    return <Select value={value} onChange={setValue} options={options} />;
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Select a country"
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Select a country"
        error
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select value="us" onChange={() => {}} options={options} disabled />
  ),
};
