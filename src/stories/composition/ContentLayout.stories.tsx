import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container, Stack, Row, Card, Heading, Text, Divider, Button } from '../../index';

const meta: Meta = {
  title: 'Composition/ContentLayout',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof meta>;

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card padding="md">
      <Stack gap="sm">
        <Heading level={3}>{title}</Heading>
        <Text color="secondary">{description}</Text>
        <Button variant="secondary" size="sm">Learn more</Button>
      </Stack>
    </Card>
  );
}

export const Default: Story = {
  render: () => (
    <Container maxWidth="lg" padding="lg">
      <Stack gap="lg">
        <Stack gap="sm">
          <Heading level={1}>Component Library</Heading>
          <Text color="secondary">
            A token-first, deterministic component system for building consistent UI at scale.
          </Text>
        </Stack>
        <Divider />
        <Row gap="md">
          <FeatureCard
            title="Token System"
            description="All visual decisions derive from a single source of truth."
          />
          <FeatureCard
            title="Layout Primitives"
            description="Box, Stack, Row, and Container for deterministic composition."
          />
          <FeatureCard
            title="Core Components"
            description="Text, Button, Card, and more — all contract-bound."
          />
        </Row>
      </Stack>
    </Container>
  ),
};

export const SingleColumn: Story = {
  render: () => (
    <Container maxWidth="sm" padding="lg">
      <Stack gap="lg">
        <Stack gap="sm">
          <Heading level={1}>Component Library</Heading>
          <Text color="secondary">
            A token-first, deterministic component system for building consistent UI at scale.
          </Text>
        </Stack>
        <Divider />
        <Stack gap="md">
          <FeatureCard
            title="Token System"
            description="All visual decisions derive from a single source of truth."
          />
          <FeatureCard
            title="Layout Primitives"
            description="Box, Stack, Row, and Container for deterministic composition."
          />
          <FeatureCard
            title="Core Components"
            description="Text, Button, Card, and more — all contract-bound."
          />
        </Stack>
      </Stack>
    </Container>
  ),
};
