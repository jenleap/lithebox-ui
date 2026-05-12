import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Field, Input, Textarea, Select, SelectOption } from '../../index';

const meta: Meta<typeof Field> = {
  title: 'Forms/Field',
  component: Field,
};

export default meta;

type Story = StoryObj<typeof Field>;

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Field label="Email" htmlFor="email-helper" helperText="We'll never share your email.">
        <Input id="email-helper" value={value} onChange={setValue} placeholder="you@example.com" />
      </Field>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('not-an-email');
    return (
      <Field
        label="Email"
        htmlFor="email-error"
        helperText="We'll never share your email."
        error="Please enter a valid email address."
      >
        <Input id="email-error" value={value} onChange={setValue} error />
      </Field>
    );
  },
};

export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Field label="Full Name" htmlFor="name-required" required>
        <Input id="name-required" value={value} onChange={setValue} placeholder="Jane Doe" />
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Field label="Username" htmlFor="username-disabled" disabled>
      <Input id="username-disabled" value="janedoe" onChange={() => {}} disabled />
    </Field>
  ),
};

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
];

export const WithSelect: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Field label="Country" htmlFor="country-field">
        <Select
          id="country-field"
          value={value}
          onChange={setValue}
          options={countryOptions}
          placeholder="Select a country"
        />
      </Field>
    );
  },
};

export const WithTextarea: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Field label="Message" htmlFor="message-field" helperText="Max 500 characters.">
        <Textarea id="message-field" value={value} onChange={setValue} rows={4} />
      </Field>
    );
  },
};
