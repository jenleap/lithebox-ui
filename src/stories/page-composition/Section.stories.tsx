import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Page,
  PageContent,
  Section,
  SectionHeader,
  SectionContent,
  Heading,
  Text,
  Stack,
} from '../../index';

const meta: Meta = {
  title: 'Page Composition/Section',
};

export default meta;

type Story = StoryObj;

const pageWrapper = (children: React.ReactNode) => (
  <div style={{ height: '300px' }}>
    <Page header={<div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}><Heading level={3}>Page</Heading></div>}>
      <PageContent>
        {children}
      </PageContent>
    </Page>
  </div>
);

export const WithTitle: Story = {
  render: () => pageWrapper(
    <Section title="Overview">
      <Text>This section has a title rendered as a SectionHeader.</Text>
      <Text color="secondary">Additional content inside the section.</Text>
    </Section>
  ),
};

export const WithoutTitle: Story = {
  render: () => pageWrapper(
    <Section>
      <Text>This section has no title — only a SectionContent area.</Text>
    </Section>
  ),
};

export const NestedSections: Story = {
  render: () => pageWrapper(
    <Stack gap="lg">
      <Section title="Overview">
        <Text>First section with summary information.</Text>
      </Section>
      <Section title="Details">
        <Text>Second section with detailed content.</Text>
        <Text color="secondary">Both sections stack vertically inside PageContent.</Text>
      </Section>
    </Stack>
  ),
};

export const CustomSectionHeader: Story = {
  render: () => pageWrapper(
    <section>
      <SectionHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading level={4}>Custom Header</Heading>
          <Text color="secondary">12 items</Text>
        </div>
      </SectionHeader>
      <SectionContent>
        <Text>Using SectionHeader directly for complex header layouts.</Text>
      </SectionContent>
    </section>
  ),
};
