import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../primitives/Stack';
import { Row } from '../../primitives/Row';
import { Box } from '../../primitives/Box';
import { Label } from '../../components/Label';
import { Text } from '../../components/Text';

const colorTokens: { name: string; variable: string }[] = [
  { name: 'color.primary', variable: '--color-primary' },
  { name: 'color.secondary', variable: '--color-secondary' },
  { name: 'color.background', variable: '--color-background' },
  { name: 'color.surface', variable: '--color-surface' },
  { name: 'color.text.primary', variable: '--color-text-primary' },
  { name: 'color.text.secondary', variable: '--color-text-secondary' },
  { name: 'color.border', variable: '--color-border' },
  { name: 'color.error', variable: '--color-error' },
];

function ColorSwatch({ name, variable }: { name: string; variable: string }) {
  return (
    <Row gap="md" align="center">
      <div
        style={{
          width: 48,
          height: 48,
          background: `var(${variable})`,
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          flexShrink: 0,
        }}
      />
      <Stack gap="xs">
        <Label>{name}</Label>
        <Text size="sm" color="secondary">{variable}</Text>
      </Stack>
    </Row>
  );
}

function ColorPalette() {
  return (
    <Box padding="lg">
      <Stack gap="md">
        {colorTokens.map((token) => (
          <ColorSwatch key={token.name} name={token.name} variable={token.variable} />
        ))}
      </Stack>
    </Box>
  );
}

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorPalette,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
