import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Page,
  PageHeader,
  PageContent,
  PageSidebar,
  PageFooter,
  Section,
  Heading,
  Text,
  Button,
  Stack,
  Field,
  Input,
} from '../../index';

const meta: Meta<typeof Page> = {
  title: 'Page Composition/Page',
  component: Page,
};

export default meta;

type Story = StoryObj<typeof Page>;

const pageStyle = { height: '500px' };

export const StandardLayout: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        layout="standard"
        header={
          <PageHeader>
            <Heading level={2}>My Application</Heading>
          </PageHeader>
        }
      >
        <PageContent>
          <Section title="Overview">
            <Text>Welcome to the standard layout. Content fills the full width below the header.</Text>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        layout="dashboard"
        header={
          <PageHeader>
            <Heading level={2}>Dashboard</Heading>
          </PageHeader>
        }
        sidebar={
          <PageSidebar>
            <div style={{ padding: '16px' }}>
              <Stack gap="sm">
                <Text weight="medium">Dashboard</Text>
                <Text color="secondary">Servers</Text>
                <Text color="secondary">Settings</Text>
              </Stack>
            </div>
          </PageSidebar>
        }
      >
        <PageContent>
          <Section title="Overview">
            <Text>Main content area. Sidebar is pinned to the left.</Text>
          </Section>
          <Section title="Activity">
            <Text>Secondary section with recent activity.</Text>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const DetailLayout: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        layout="detail"
        header={
          <PageHeader>
            <Heading level={2}>User Detail</Heading>
          </PageHeader>
        }
        sidebar={
          <PageSidebar>
            <div style={{ padding: '16px' }}>
              <Stack gap="sm">
                <Text weight="medium">Actions</Text>
                <Button variant="secondary" size="sm">Edit</Button>
                <Button variant="secondary" size="sm">Archive</Button>
              </Stack>
            </div>
          </PageSidebar>
        }
      >
        <PageContent>
          <Section title="Profile">
            <Text>Primary content with contextual sidebar alongside.</Text>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        layout="form"
        header={
          <PageHeader>
            <Heading level={2}>Create Account</Heading>
          </PageHeader>
        }
      >
        <PageContent>
          <Section title="Account Details">
            <Stack gap="md">
              <Field label="Name"><Input placeholder="Your name" /></Field>
              <Field label="Email"><Input placeholder="you@example.com" /></Field>
              <Button>Submit</Button>
            </Stack>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        layout="standard"
        header={
          <PageHeader>
            <Heading level={2}>Results</Heading>
          </PageHeader>
        }
        footer={
          <PageFooter>
            <Text color="secondary">Page 1 of 12</Text>
          </PageFooter>
        }
      >
        <PageContent>
          <Section title="Items">
            <Text>Content with a persistent footer for pagination.</Text>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const StateLoading: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        state="loading"
        header={
          <PageHeader>
            <Heading level={2}>Dashboard</Heading>
          </PageHeader>
        }
      >
        <PageContent>
          <Section><Text>This content is hidden during loading.</Text></Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const StateError: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        state="error"
        header={
          <PageHeader>
            <Heading level={2}>Dashboard</Heading>
          </PageHeader>
        }
      >
        <PageContent />
      </Page>
    </div>
  ),
};

export const StateEmpty: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        state="empty"
        header={
          <PageHeader>
            <Heading level={2}>Projects</Heading>
          </PageHeader>
        }
      >
        <PageContent />
      </Page>
    </div>
  ),
};

export const StateReady: Story = {
  render: () => (
    <div style={pageStyle}>
      <Page
        state="ready"
        header={
          <PageHeader>
            <Heading level={2}>Projects</Heading>
          </PageHeader>
        }
      >
        <PageContent>
          <Section title="All Projects">
            <Text>Content is visible when state is ready.</Text>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};
