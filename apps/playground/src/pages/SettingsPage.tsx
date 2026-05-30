import React, { useState } from 'react'
import {
  Heading,
  Stack,
  Card,
  Text,
  Divider,
  Field,
  Input,
  Textarea,
  Button,
  Checkbox,
  Modal,
} from 'lithebox-ui'
import { useThemeMode } from 'lithebox-ui'
import { useToast } from 'lithebox-ui'

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card padding="lg">
      <Stack gap="md">
        <div>
          <Heading level={3}>{title}</Heading>
          <Divider />
        </div>
        {children}
      </Stack>
    </Card>
  )
}

export default function SettingsPage() {
  const { mode, setMode } = useThemeMode()
  const toast = useToast()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [accountErrors, setAccountErrors] = useState<{ name?: string; email?: string }>({})
  const [accountLoading, setAccountLoading] = useState(false)

  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  function validateAccount() {
    const errs: { name?: string; email?: string } = {}
    if (!displayName || displayName.length < 2) errs.name = 'Name must be at least 2 characters'
    if (!email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
    return errs
  }

  async function handleAccountSave() {
    const errs = validateAccount()
    setAccountErrors(errs)
    if (Object.keys(errs).length > 0) return
    setAccountLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setAccountLoading(false)
    toast.success('Account settings saved')
  }

  function handleDeleteConfirm() {
    setDeleteModalOpen(false)
    toast.error('This is a demo — no action taken')
  }

  return (
    <>
      <Stack gap="lg">
        <Heading level={1}>Settings</Heading>

        {/* Appearance */}
        <SectionCard title="Appearance">
          <div>
            <Text color="secondary" size="sm">Theme</Text>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <Button
              variant={mode === 'light' ? 'primary' : 'secondary'}
              onClick={() => setMode('light')}
            >
              Light
            </Button>
            <Button
              variant={mode === 'dark' ? 'primary' : 'secondary'}
              onClick={() => setMode('dark')}
            >
              Dark
            </Button>
          </div>
        </SectionCard>

        {/* Account */}
        <SectionCard title="Account">
          <Stack gap="sm">
            <Field label="Display Name" htmlFor="settings-name" required error={accountErrors.name}>
              <Input
                id="settings-name"
                value={displayName}
                onChange={setDisplayName}
                placeholder="Your name"
                error={!!accountErrors.name}
              />
            </Field>
            <Field label="Email" htmlFor="settings-email" required error={accountErrors.email}>
              <Input
                id="settings-email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                error={!!accountErrors.email}
              />
            </Field>
            <Field label={`Bio (${bio.length}/200)`} htmlFor="settings-bio">
              <Textarea
                id="settings-bio"
                value={bio}
                onChange={(v) => v.length <= 200 && setBio(v)}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </Field>
          </Stack>
          <Button onClick={handleAccountSave} loading={accountLoading} disabled={accountLoading}>
            {accountLoading ? 'Saving…' : 'Save Changes'}
          </Button>
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="Notifications">
          <Stack gap="sm">
            <Checkbox
              id="notif-email"
              label="Email notifications"
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
            <Checkbox
              id="notif-push"
              label="Push notifications"
              checked={pushNotifs}
              onChange={setPushNotifs}
            />
            <Checkbox
              id="notif-digest"
              label="Weekly digest"
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </Stack>
        </SectionCard>

        {/* Danger Zone */}
        <SectionCard title="Danger Zone">
          <Text color="secondary" size="sm">
            Permanently delete your account and all associated data.
          </Text>
          <Button variant="secondary" onClick={() => setDeleteModalOpen(true)}>
            Delete Account
          </Button>
        </SectionCard>
      </Stack>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Stack gap="md">
          <Heading level={3}>Delete Account</Heading>
          <Text color="secondary">
            Are you sure? This action cannot be undone.
          </Text>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteConfirm}>
              Confirm Delete
            </Button>
          </div>
        </Stack>
      </Modal>
    </>
  )
}
