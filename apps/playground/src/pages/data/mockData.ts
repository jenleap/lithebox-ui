export type RecordStatus = 'active' | 'inactive' | 'pending'
export type RecordRole = 'Admin' | 'Editor' | 'Viewer'

export type DataRecord = {
  id: string
  name: string
  email: string
  role: RecordRole
  status: RecordStatus
  createdAt: string
}

const ROLES: RecordRole[] = ['Admin', 'Editor', 'Viewer']
const STATUSES: RecordStatus[] = ['active', 'inactive', 'pending']
const NAMES = [
  'Alice Chen', 'Bob Kim', 'Carol Davis', 'Dave Osei', 'Eve Nakamura',
  'Frank Lee', 'Grace Park', 'Henry Zhou', 'Iris Müller', 'Jack Torres',
]

export const mockData: DataRecord[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1).padStart(3, '0'),
  name: `${NAMES[i % NAMES.length]} ${Math.floor(i / NAMES.length) || ''}`.trim(),
  email: `user${i + 1}@example.com`,
  role: ROLES[i % ROLES.length],
  status: STATUSES[i % STATUSES.length],
  createdAt: new Date(2026, 4, 1 + (i % 28)).toISOString().slice(0, 10),
}))
