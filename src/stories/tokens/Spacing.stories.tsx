import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../primitives/Stack';
import { Row } from '../../primitives/Row';
import { Box } from '../../primitives/Box';
import { Label } from '../../components/Label';
import { Text } from '../../components/Text';
import type { Tokens } from '../../tokens/types';

const spacingTokens: { name: string; key: keyof Tokens['spacing']; value: string }[] = [
  { name: 'spacing.xs', key: 'xs', value: '4px' },
  { name: 'spacing.sm', key: 'sm', value: '8px' },
  { name: 'spacing.md', key: 'md', value: '16px' },
  { name: 'spacing.lg', key: 'lg', value: '24px' },
  { name: 'spacing.xl', key: 'xl', value: '32px' },
];

function SpacingBar({ name, variable, value }: { name: string; variable: string; value: string }) {
  return (
    <Row gap="md" align="center">
      <div style={{ width: 120, flexShrink: 0 }}>
        <Label>{name}</Label>
        <Text size="sm" color="secondary">{value}</Text>
      </div>
      <div
        style={{
          height: 24,
          width: `var(${variable})`,
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-sm)',
          minWidth: 4,
        }}
      />
    </Row>
  );
}

function SpacingScale() {
  return (
    <Box padding="lg">
      <Stack gap="md">
        {spacingTokens.map((token) => (
          <SpacingBar
            key={token.name}
            name={token.name}
            variable={`--spacing-${token.key}`}
            value={token.value}
          />
        ))}
      </Stack>
    </Box>
  );
}

const meta: Meta = {
  title: 'Tokens/Spacing',
  component: SpacingScale,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
