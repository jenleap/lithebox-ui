import React from 'react'
import { Card, Stack, Text, Divider, Heading } from 'lithebox-ui'

type ActivityItem = {
  user: string
  action: string
  time: string
}

const ACTIVITY: ActivityItem[] = [
  { user: 'Alice Chen', action: 'Updated dashboard layout', time: '2 min ago' },
  { user: 'Bob Kim', action: 'Added 12 new records', time: '15 min ago' },
  { user: 'Carol Davis', action: 'Changed theme to dark mode', time: '1 hr ago' },
  { user: 'Dave Osei', action: 'Exported data table to CSV', time: '2 hr ago' },
  { user: 'Eve Nakamura', action: 'Reviewed overlay behavior', time: '3 hr ago' },
]

export function ActivityFeed() {
  return (
    <Card padding="md">
      <Stack gap="sm">
        <Heading level={4}>Recent Activity</Heading>
        {ACTIVITY.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Divider />}
            <Stack gap="xs">
              <Text weight="bold" size="sm">{item.user}</Text>
              <Text color="secondary" size="sm">{item.action}</Text>
              <Text color="secondary" size="sm">{item.time}</Text>
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    </Card>
  )
}
