import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, mergeTokens, defaultTokens, Card, Stack, Heading, Text, Button, Row } from '../../index';

const meta: Meta = {
  title: 'Tokens/TokenOverride',
  parameters: {
    docs: {
      description: {
        component:
          'Use the global Token Overrides toolbar to apply overrides across all stories. ' +
          'This story demonstrates story-level token controls scoped to a single component tree.',
      },
    },
  },
  argTypes: {
    primaryColor: {
      name: 'color.primary',
      control: { type: 'color' },
      defaultValue: defaultTokens.color.primary,
    },
    secondaryColor: {
      name: 'color.secondary',
      control: { type: 'color' },
      defaultValue: defaultTokens.color.secondary,
    },
  },
  args: {
    primaryColor: defaultTokens.color.primary,
    secondaryColor: defaultTokens.color.secondary,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ primaryColor, secondaryColor }) => {
    const tokens = mergeTokens(defaultTokens, {
      color: { primary: primaryColor, secondary: secondaryColor },
    });

    return (
      <ThemeProvider tokens={tokens}>
        <Card padding="md">
          <Stack gap="md">
            <Heading level={3}>Token Override Preview</Heading>
            <Text color="secondary">
              Adjust the color controls in the Storybook panel to see live token updates on this card.
            </Text>
            <Row gap="sm">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
            </Row>
          </Stack>
        </Card>
      </ThemeProvider>
    );
  },
};
