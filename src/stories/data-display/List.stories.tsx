import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem, DescriptionList, DescriptionListItem } from '../../index';

const meta: Meta = {
  title: 'Data Display/List',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem>API Server</ListItem>
      <ListItem>Database Primary</ListItem>
      <ListItem>Cache Layer</ListItem>
      <ListItem>Message Queue</ListItem>
    </List>
  ),
};

export const SpacingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>sm</p>
        <List spacing="sm">
          <ListItem>Item A</ListItem>
          <ListItem>Item B</ListItem>
          <ListItem>Item C</ListItem>
        </List>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>md</p>
        <List spacing="md">
          <ListItem>Item A</ListItem>
          <ListItem>Item B</ListItem>
          <ListItem>Item C</ListItem>
        </List>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>lg</p>
        <List spacing="lg">
          <ListItem>Item A</ListItem>
          <ListItem>Item B</ListItem>
          <ListItem>Item C</ListItem>
        </List>
      </div>
    </div>
  ),
};

export const DescriptionListStory: Story = {
  name: 'Description List',
  render: () => (
    <DescriptionList>
      <DescriptionListItem label="Name" value="Alice Johnson" />
      <DescriptionListItem label="Role" value="Senior Engineer" />
      <DescriptionListItem label="Status" value="Active" />
      <DescriptionListItem label="Joined" value="January 2024" />
    </DescriptionList>
  ),
};
