import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../../primitives/Container';
import { Stack } from '../../primitives/Stack';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Divider } from '../../components/Divider';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof Container>;

function SampleContent() {
  return (
    <Stack gap="md">
      <Heading level={2}>Container Content</Heading>
      <Text>
        This content is constrained by the Container max-width. Resize the viewport to observe
        how the container keeps content from stretching too wide.
      </Text>
      <Divider />
      <Text color="secondary">
        Layout is determined by the Container's maxWidth prop, which maps to fixed breakpoint values.
      </Text>
    </Stack>
  );
}

export const Default: Story = {
  render: () => (
    <Container maxWidth="lg" padding="lg">
      <SampleContent />
    </Container>
  ),
};

export const NarrowContent: Story = {
  render: () => (
    <Container maxWidth="sm" padding="md">
      <SampleContent />
    </Container>
  ),
};
