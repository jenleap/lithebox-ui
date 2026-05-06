import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../primitives/Stack';
import { Row } from '../../primitives/Row';
import { Box } from '../../primitives/Box';
import { Label } from '../../components/Label';
import { Text } from '../../components/Text';
import type { Tokens } from '../../tokens/types';

const radiusTokens: { name: string; key: keyof Tokens['radius']; value: string }[] = [
  { name: 'radius.sm', key: 'sm', value: '4px' },
  { name: 'radius.md', key: 'md', value: '8px' },
  { name: 'radius.lg', key: 'lg', value: '16px' },
];

function RadiusSwatch({ name, variable, value }: { name: string; variable: string; value: string }) {
  return (
    <Stack gap="sm" align="center">
      <div
        style={{
          width: 80,
          height: 80,
          background: 'var(--color-primary)',
          borderRadius: `var(${variable})`,
        }}
      />
      <Label>{name}</Label>
      <Text size="sm" color="secondary">{value}</Text>
    </Stack>
  );
}

function RadiusScale() {
  return (
    <Box padding="lg">
      <Row gap="xl" align="start">
        {radiusTokens.map((token) => (
          <RadiusSwatch
            key={token.name}
            name={token.name}
            variable={`--radius-${token.key}`}
            value={token.value}
          />
        ))}
      </Row>
    </Box>
  );
}

const meta: Meta = {
  title: 'Tokens/Radius',
  component: RadiusScale,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
