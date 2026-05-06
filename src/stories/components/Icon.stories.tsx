import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, Stack, Row, Label } from '../../index';

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: () => (
    <Icon size="md">
      <StarIcon />
    </Icon>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Row gap="lg" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Stack key={size} gap="xs" align="center">
          <Icon size={size}>
            <StarIcon />
          </Icon>
          <Label>{size}</Label>
        </Stack>
      ))}
    </Row>
  ),
};
