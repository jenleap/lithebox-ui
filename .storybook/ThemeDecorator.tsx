import React from 'react';
import type { Decorator } from '@storybook/react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import type { Tokens } from '../src/tokens/types';

const ThemeDecorator: Decorator = (Story, context) => {
  const raw = context.globals?.tokenOverrides;
  let overrides: Partial<Tokens> | undefined;
  try {
    const parsed = raw ? JSON.parse(raw) : undefined;
    overrides = typeof parsed === 'object' && parsed !== null ? parsed : undefined;
  } catch {
    overrides = undefined;
  }

  return (
    <ThemeProvider tokens={overrides}>
      <Story />
    </ThemeProvider>
  );
};

export default ThemeDecorator;
