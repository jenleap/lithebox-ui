import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../index';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input value={value} onChange={setValue} placeholder="Type something..." />;
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('Hello world');
    return <Input value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('invalid@');
    return <Input value={value} onChange={setValue} error placeholder="Email" />;
  },
};

export const Disabled: Story = {
  render: () => (
    <Input value="Cannot edit this" onChange={() => {}} disabled />
  ),
};
