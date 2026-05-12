import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Field,
  Input,
  Textarea,
  Select,
  SelectOption,
  Checkbox,
  Button,
  Stack,
} from '../../index';

const meta: Meta = {
  title: 'Forms/FormComposition',
};

export default meta;

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

export const ContactForm: StoryObj = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [country, setCountry] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [emailError, setEmailError] = useState('');

    function handleSubmit() {
      if (!email.includes('@')) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
        alert('Form submitted!');
      }
    }

    return (
      <div style={{ maxWidth: 480 }}>
        <Stack gap="md">
          <Field label="Full Name" htmlFor="form-name" required>
            <Input id="form-name" value={name} onChange={setName} placeholder="Jane Doe" />
          </Field>

          <Field
            label="Email"
            htmlFor="form-email"
            required
            helperText="We'll never share your email."
            error={emailError || undefined}
          >
            <Input
              id="form-email"
              value={email}
              onChange={val => { setEmail(val); if (emailError) setEmailError(''); }}
              placeholder="jane@example.com"
              error={!!emailError}
            />
          </Field>

          <Field label="Message" htmlFor="form-message" helperText="Max 500 characters.">
            <Textarea id="form-message" value={message} onChange={setMessage} rows={4} />
          </Field>

          <Field label="Country" htmlFor="form-country">
            <Select
              id="form-country"
              value={country}
              onChange={setCountry}
              options={countryOptions}
              placeholder="Select a country"
            />
          </Field>

          <Checkbox
            checked={agreed}
            onChange={setAgreed}
            label="I agree to the terms and conditions"
            id="form-terms"
          />

          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </div>
    );
  },
};
