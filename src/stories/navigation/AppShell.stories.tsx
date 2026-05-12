import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, Sidebar, TopBar, ContentArea, Text, Heading } from '../../index';

const meta: Meta<typeof AppShell> = {
  title: 'Navigation/AppShell',
  component: AppShell,
};

export default meta;

type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: () => (
    <AppShell
      sidebar={
        <Sidebar>
          <Heading level={4}>Navigation</Heading>
          <Text>Dashboard</Text>
          <Text>Settings</Text>
          <Text>Profile</Text>
        </Sidebar>
      }
      header={
        <TopBar>
          <Heading level={4}>My Application</Heading>
        </TopBar>
      }
    >
      <ContentArea>
        <Heading level={2}>Welcome</Heading>
        <Text>This is the main content area.</Text>
      </ContentArea>
    </AppShell>
  ),
};

export const WithoutSidebar: Story = {
  render: () => (
    <AppShell
      header={
        <TopBar>
          <Heading level={4}>My Application</Heading>
        </TopBar>
      }
    >
      <ContentArea>
        <Heading level={2}>Full Width Content</Heading>
        <Text>No sidebar in this layout.</Text>
      </ContentArea>
    </AppShell>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <AppShell
      sidebar={
        <Sidebar>
          <Heading level={4}>Navigation</Heading>
          <Text>Dashboard</Text>
          <Text>Settings</Text>
        </Sidebar>
      }
    >
      <ContentArea>
        <Heading level={2}>Content Without TopBar</Heading>
        <Text>No header bar in this layout.</Text>
      </ContentArea>
    </AppShell>
  ),
};
