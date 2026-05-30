import React, { useState, useMemo, useEffect, useCallback } from 'react'
import {
  Heading,
  Stack,
  Field,
  Input,
  Select,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Text,
  EmptyState,
  Drawer,
} from 'lithebox-ui'
import { useToast } from 'lithebox-ui'
import { mockData, DataRecord, RecordRole, RecordStatus } from './data/mockData'

const PAGE_SIZE = 10

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Viewer', label: 'Viewer' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
]

const STATUS_BADGE: Record<RecordStatus, 'success' | 'error' | 'warning'> = {
  active: 'success',
  inactive: 'error',
  pending: 'warning',
}

type DrawerMode = 'add' | 'edit'

type FormState = {
  name: string
  email: string
  role: string
  status: string
}

const EMPTY_FORM: FormState = { name: '', email: '', role: 'Viewer', status: 'active' }

export default function DataPage() {
  const toast = useToast()
  const [searchRaw, setSearchRaw] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('add')
  const [editRecord, setEditRecord] = useState<DataRecord | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchRaw)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [searchRaw])

  const filtered = useMemo(() => {
    return mockData.filter((r) => {
      const q = search.toLowerCase()
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      const matchRole = !roleFilter || r.role === roleFilter
      const matchStatus = !statusFilter || r.status === statusFilter
      return matchSearch && matchRole && matchStatus
    })
  }, [search, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function openAdd() {
    setDrawerMode('add')
    setForm(EMPTY_FORM)
    setFormErrors({})
    setEditRecord(null)
    setDrawerOpen(true)
  }

  function openEdit(record: DataRecord) {
    setDrawerMode('edit')
    setForm({ name: record.name, email: record.email, role: record.role, status: record.status })
    setFormErrors({})
    setEditRecord(record)
    setDrawerOpen(true)
  }

  function validateForm(): Partial<FormState> {
    const errs: Partial<FormState> = {}
    if (!form.name || form.name.length < 2) errs.name = 'Name is required'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required'
    return errs
  }

  async function handleSave() {
    const errs = validateForm()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setSaving(false)
    setDrawerOpen(false)
    toast.success(drawerMode === 'add' ? 'Record added' : 'Record updated')
  }

  function clearFilters() {
    setSearchRaw('')
    setSearch('')
    setRoleFilter('')
    setStatusFilter('')
    setPage(1)
  }

  if (loading) {
    return (
      <Stack gap="lg">
        <Heading level={1}>Data Management</Heading>
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <Text color="secondary">Loading…</Text>
        </div>
      </Stack>
    )
  }

  return (
    <>
      <Stack gap="lg">
        <Heading level={1}>Data Management</Heading>

        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-sm)',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ flex: '1 1 200px', minWidth: 160 }}>
            <Field label="Search" htmlFor="data-search">
              <Input
                id="data-search"
                value={searchRaw}
                onChange={setSearchRaw}
                placeholder="Search by name or email"
              />
            </Field>
          </div>
          <div style={{ flex: '0 1 160px', minWidth: 140 }}>
            <Field label="Role" htmlFor="data-role">
              <Select
                id="data-role"
                value={roleFilter}
                onChange={(v) => { setRoleFilter(v); setPage(1) }}
                options={ROLE_OPTIONS}
              />
            </Field>
          </div>
          <div style={{ flex: '0 1 160px', minWidth: 140 }}>
            <Field label="Status" htmlFor="data-status">
              <Select
                id="data-status"
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setPage(1) }}
                options={STATUS_OPTIONS}
              />
            </Field>
          </div>
          <Button onClick={openAdd}>Add Item</Button>
        </div>

        {/* Table or Empty State */}
        {pageRows.length === 0 ? (
          <EmptyState
            title="No results found"
            description="No records match your current filters."
            action={<Button variant="secondary" onClick={clearFilters}>Clear Filters</Button>}
          />
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell header>Name</TableCell>
                    <TableCell header>Email</TableCell>
                    <TableCell header>Role</TableCell>
                    <TableCell header>Status</TableCell>
                    <TableCell header>Created</TableCell>
                    <TableCell header>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell label="Name">{row.name}</TableCell>
                      <TableCell label="Email">{row.email}</TableCell>
                      <TableCell label="Role">{row.role}</TableCell>
                      <TableCell label="Status">
                        <Badge variant={STATUS_BADGE[row.status]}>{row.status}</Badge>
                      </TableCell>
                      <TableCell label="Created">{row.createdAt}</TableCell>
                      <TableCell label="Actions">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(row)}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
              <Text color="secondary" size="sm">
                Page {page} of {totalPages} ({filtered.length} records)
              </Text>
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Stack>

      {/* Add / Edit Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} side="right">
        <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', minWidth: 320 }}>
          <Heading level={3}>{drawerMode === 'add' ? 'Add Item' : 'Edit Item'}</Heading>
          <Stack gap="sm">
            <Field label="Name" htmlFor="drawer-name" required error={formErrors.name}>
              <Input
                id="drawer-name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Full name"
                error={!!formErrors.name}
              />
            </Field>
            <Field label="Email" htmlFor="drawer-email" required error={formErrors.email}>
              <Input
                id="drawer-email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="email@example.com"
                error={!!formErrors.email}
              />
            </Field>
            <Field label="Role" htmlFor="drawer-role">
              <Select
                id="drawer-role"
                value={form.role}
                onChange={(v) => setForm((f) => ({ ...f, role: v }))}
                options={[
                  { value: 'Admin', label: 'Admin' },
                  { value: 'Editor', label: 'Editor' },
                  { value: 'Viewer', label: 'Viewer' },
                ]}
              />
            </Field>
            <Field label="Status" htmlFor="drawer-status">
              <Select
                id="drawer-status"
                value={form.status}
                onChange={(v) => setForm((f) => ({ ...f, status: v }))}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'pending', label: 'Pending' },
                ]}
              />
            </Field>
          </Stack>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} loading={saving} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}
