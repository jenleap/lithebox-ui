import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Field, Input, Button, Card, Heading, Text, Stack } from 'lithebox-ui'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit() {
    if (!email) {
      setError('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email')
      return
    }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-background)',
        padding: 'var(--spacing-lg)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Card padding="lg">
          <Stack gap="md">
            <div>
              <Heading level={2}>Reset password</Heading>
              <Text color="secondary" size="sm">Enter your email to receive a reset link</Text>
            </div>

            {sent ? (
              <div
                role="alert"
                style={{
                  background: 'var(--color-success-subtle, #D1FAE5)',
                  border: '1px solid var(--color-success, #10B981)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--spacing-md)',
                }}
              >
                <Text color="primary">Check your email</Text>
                <Text color="secondary" size="sm">
                  We sent a password reset link to {email}
                </Text>
              </div>
            ) : (
              <>
                <Field label="Email" htmlFor="reset-email" required error={error}>
                  <Input
                    id="reset-email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    error={!!error}
                  />
                </Field>
                <Button onClick={handleSubmit} loading={loading} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </Button>
              </>
            )}

            <Text color="secondary" size="sm">
              <Link to="/auth/login" style={{ color: 'var(--color-primary)' }}>Back to sign in</Link>
            </Text>
          </Stack>
        </Card>
      </div>
    </div>
  )
}
