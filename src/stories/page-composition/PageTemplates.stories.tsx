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
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  Badge,
  StatusIndicator,
  DescriptionList,
  DescriptionListItem,
} from '../../index';

const meta: Meta = {
  title: 'Page Composition/Templates',
};

export default meta;

type Story = StoryObj;

export const DashboardTemplate: Story = {
  render: () => (
    <div style={{ height: '600px' }}>
      <Page
        layout="dashboard"
        header={
          <PageHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading level={2}>Infrastructure Dashboard</Heading>
              <Button size="sm">Add Server</Button>
            </div>
          </PageHeader>
        }
        sidebar={
          <PageSidebar>
            <div style={{ padding: '16px' }}>
              <Stack gap="sm">
                <Text weight="medium">Dashboard</Text>
                <Text color="secondary">Servers</Text>
                <Text color="secondary">Alerts</Text>
                <Text color="secondary">Settings</Text>
              </Stack>
            </div>
          </PageSidebar>
        }
      >
        <PageContent>
          <Section title="Server Status">
            <Table density="comfortable">
              <TableHeader>
                <TableRow>
                  <TableCell header>Name</TableCell>
                  <TableCell header>Status</TableCell>
                  <TableCell header>Region</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>api-prod-01</TableCell>
                  <TableCell><StatusIndicator variant="success" label="Online" /></TableCell>
                  <TableCell><Badge variant="default">us-east-1</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>api-prod-02</TableCell>
                  <TableCell><StatusIndicator variant="success" label="Online" /></TableCell>
                  <TableCell><Badge variant="default">us-west-2</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>db-replica-01</TableCell>
                  <TableCell><StatusIndicator variant="warning" label="Degraded" /></TableCell>
                  <TableCell><Badge variant="default">eu-west-1</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>
          <Section title="Recent Activity">
            <List spacing="sm">
              <ListItem>Deployment api-prod-01 v2.4.1 completed</ListItem>
              <ListItem>Alert: db-replica-01 latency above threshold</ListItem>
              <ListItem>Scaling event: api-prod cluster +2 nodes</ListItem>
              <ListItem>Backup completed for db-primary-01</ListItem>
            </List>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const FormTemplate: Story = {
  render: () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');
    return (
      <div style={{ height: '500px' }}>
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
                <Field label="Name" htmlFor="name">
                  <Input id="name" placeholder="Jane Smith" value={name} onChange={setName} />
                </Field>
                <Field label="Email" htmlFor="email">
                  <Input id="email" placeholder="jane@example.com" value={email} onChange={setEmail} />
                </Field>
                <Field label="Role" htmlFor="role">
                  <Select
                    id="role"
                    value={role}
                    onChange={setRole}
                    options={[
                      { value: 'engineer', label: 'Engineer' },
                      { value: 'designer', label: 'Designer' },
                      { value: 'manager', label: 'Manager' },
                    ]}
                  />
                </Field>
                <Button>Create Account</Button>
              </Stack>
            </Section>
          </PageContent>
        </Page>
      </div>
    );
  },
};

export const DetailTemplate: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Page
        layout="detail"
        header={
          <PageHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading level={2}>User Detail</Heading>
              <Button variant="secondary" size="sm">Edit</Button>
            </div>
          </PageHeader>
        }
        sidebar={
          <PageSidebar>
            <div style={{ padding: '16px' }}>
              <Stack gap="sm">
                <Text weight="medium">Actions</Text>
                <Button variant="secondary" size="sm">Deactivate</Button>
                <Button variant="ghost" size="sm">View Audit Log</Button>
              </Stack>
            </div>
          </PageSidebar>
        }
      >
        <PageContent>
          <Section title="Profile">
            <DescriptionList>
              <DescriptionListItem label="Name" value="Jane Smith" />
              <DescriptionListItem label="Email" value="jane@example.com" />
              <DescriptionListItem
                label="Role"
                value={<Badge variant="info">Engineer</Badge>}
              />
              <DescriptionListItem
                label="Status"
                value={<StatusIndicator variant="success" label="Active" />}
              />
            </DescriptionList>
          </Section>
        </PageContent>
      </Page>
    </div>
  ),
};

export const LoadingTemplate: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <Page
        layout="dashboard"
        state="loading"
        header={
          <PageHeader>
            <Heading level={2}>Dashboard</Heading>
          </PageHeader>
        }
        sidebar={
          <PageSidebar>
            <div style={{ padding: '16px' }}>
              <Text weight="medium">Navigation</Text>
            </div>
          </PageSidebar>
        }
      >
        <PageContent />
      </Page>
    </div>
  ),
};

export const ErrorTemplate: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <Page
        layout="standard"
        state="error"
        header={
          <PageHeader>
            <Heading level={2}>Reports</Heading>
          </PageHeader>
        }
      >
        <PageContent />
      </Page>
    </div>
  ),
};

export const EmptyTemplate: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <Page
        layout="standard"
        state="empty"
        header={
          <PageHeader>
            <Heading level={2}>Projects</Heading>
          </PageHeader>
        }
        footer={
          <PageFooter>
            <Text color="secondary">0 results</Text>
          </PageFooter>
        }
      >
        <PageContent />
      </Page>
    </div>
  ),
};
