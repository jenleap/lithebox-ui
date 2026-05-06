import type { Preview } from '@storybook/react';
import ThemeDecorator from './ThemeDecorator';

const preview: Preview = {
  decorators: [ThemeDecorator],
  globalTypes: {
    tokenOverrides: {
      name: 'Token Overrides',
      description: 'Partial token overrides applied to ThemeProvider (JSON string)',
      defaultValue: '{}',
      toolbar: {
        title: 'Token Overrides',
        icon: 'paintbrush',
        items: [
          { value: '{}', title: 'Default tokens' },
          { value: '{"color":{"primary":"#E11D48"}}', title: 'Primary: Rose' },
          { value: '{"color":{"primary":"#7C3AED"}}', title: 'Primary: Violet' },
          { value: '{"color":{"primary":"#0EA5E9"}}', title: 'Primary: Sky' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#F9FAFB' },
        { name: 'background', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;
