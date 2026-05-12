import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../index';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Textarea value={value} onChange={setValue} placeholder="Write something..." />;
  },
};

export const WithRows: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Textarea value={value} onChange={setValue} rows={8} placeholder="Large textarea..." />;
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('Too short');
    return <Textarea value={value} onChange={setValue} error />;
  },
};

export const Disabled: Story = {
  render: () => (
    <Textarea value="This content is read-only." onChange={() => {}} disabled />
  ),
};
