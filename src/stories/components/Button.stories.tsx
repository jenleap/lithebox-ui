import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Stack, Row } from '../../index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => <Button variant="primary">Primary Button</Button>,
};

export const Variants: Story = {
  render: () => (
    <Row gap="md" align="center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </Row>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row gap="md" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Row>
  ),
};

export const Disabled: Story = {
  render: () => <Button disabled>Disabled</Button>,
};

export const Loading: Story = {
  render: () => <Button loading>Saving...</Button>,
};

export const AllVariantsDisabled: Story = {
  render: () => (
    <Row gap="md" align="center">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
    </Row>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <Stack gap="md">
      <Row gap="sm">
        <Button variant="primary" size="sm">Primary sm</Button>
        <Button variant="primary" size="md">Primary md</Button>
        <Button variant="primary" size="lg">Primary lg</Button>
      </Row>
      <Row gap="sm">
        <Button variant="secondary" size="sm">Secondary sm</Button>
        <Button variant="secondary" size="md">Secondary md</Button>
        <Button variant="secondary" size="lg">Secondary lg</Button>
      </Row>
      <Row gap="sm">
        <Button variant="ghost" size="sm">Ghost sm</Button>
        <Button variant="ghost" size="md">Ghost md</Button>
        <Button variant="ghost" size="lg">Ghost lg</Button>
      </Row>
    </Stack>
  ),
};
