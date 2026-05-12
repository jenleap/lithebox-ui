import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, LoadingState, ErrorState, Button } from '../../index';

const meta: Meta = {
  title: 'Data Display/Content States',
};

export default meta;

type Story = StoryObj;

export const Empty: Story = {
  render: () => (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      action={<Button variant="secondary">Clear filters</Button>}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <LoadingState label="Fetching data..." />
  ),
};

export const Error: Story = {
  render: () => (
    <ErrorState
      description="Check your connection and try again."
      action={<Button variant="secondary">Retry</Button>}
    />
  ),
};
