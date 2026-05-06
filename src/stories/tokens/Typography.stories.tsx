import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../primitives/Stack';
import { Box } from '../../primitives/Box';
import { Divider } from '../../components/Divider';
import { Label } from '../../components/Label';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import type { Tokens } from '../../tokens/types';

const sample = 'The quick brown fox jumps over the lazy dog';

const textSizes: { label: string; size: keyof Tokens['typography']['size'] }[] = [
  { label: 'size.sm — 12px', size: 'sm' },
  { label: 'size.md — 14px', size: 'md' },
  { label: 'size.lg — 18px', size: 'lg' },
  { label: 'size.xl — 24px', size: 'xl' },
];

function TypographyScale() {
  return (
    <Box padding="lg">
      <Stack gap="lg">
        <Stack gap="md">
          <Label>Heading Scale</Label>
          <Divider />
          <Heading level={1}>Heading Level 1 — xl</Heading>
          <Heading level={2}>Heading Level 2 — lg</Heading>
          <Heading level={3}>Heading Level 3 — md</Heading>
          <Heading level={4}>Heading Level 4 — sm</Heading>
        </Stack>
        <Stack gap="md">
          <Label>Text Scale</Label>
          <Divider />
          {textSizes.map(({ label, size }) => (
            <Stack key={size} gap="xs">
              <Label>{label}</Label>
              <Text size={size}>{sample}</Text>
            </Stack>
          ))}
        </Stack>
        <Stack gap="md">
          <Label>Font Weights</Label>
          <Divider />
          <Text weight="regular">Regular (400) — {sample}</Text>
          <Text weight="medium">Medium (500) — {sample}</Text>
          <Text weight="bold">Bold (700) — {sample}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyScale,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
