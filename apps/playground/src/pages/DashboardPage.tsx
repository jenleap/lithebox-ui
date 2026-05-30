import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heading,
  Stack,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Text,
} from 'lithebox-ui'
import { KpiCard } from './dashboard/KpiCard'
import { ActivityFeed } from './dashboard/ActivityFeed'

const KPIS = [
  { label: 'Total Users', value: '12,400', trend: 'up' as const },
  { label: 'Active Sessions', value: '843', trend: 'up' as const },
  { label: 'Error Rate', value: '0.3%', trend: 'down' as const },
  { label: 'Avg Response', value: '142ms', trend: 'neutral' as const },
]

type RowStatus = 'active' | 'inactive' | 'pending'
const STATUS_BADGE: Record<RowStatus, 'success' | 'error' | 'warning'> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
}

const TABLE_ROWS: { id: string; name: string; status: RowStatus; date: string }[] = [
  { id: '001', name: 'Alice Chen', status: 'active', date: '2026-05-29' },
  { id: '002', name: 'Bob Kim', status: 'pending', date: '2026-05-28' },
  { id: '003', name: 'Carol Davis', status: 'active', date: '2026-05-27' },
  { id: '004', name: 'Dave Osei', status: 'inactive', date: '2026-05-26' },
  { id: '005', name: 'Eve Nakamura', status: 'active', date: '2026-05-25' },
]

export default function DashboardPage() {
  return (
    <Stack gap="lg">
      <Heading level={1}>Dashboard</Heading>

      {/* KPI Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--spacing-md)',
        }}
      >
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Table + Activity Feed */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 'var(--spacing-md)',
          alignItems: 'start',
        }}
      >
        {/* Table section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
            <Text weight="bold">Users</Text>
            <Link to="/data">
              <Button variant="secondary" size="sm">View All</Button>
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell header>Name</TableCell>
                  <TableCell header>Status</TableCell>
                  <TableCell header>Date</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TABLE_ROWS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell label="Name">{row.name}</TableCell>
                    <TableCell label="Status">
                      <Badge variant={STATUS_BADGE[row.status]}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell label="Date">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </Stack>
  )
}
