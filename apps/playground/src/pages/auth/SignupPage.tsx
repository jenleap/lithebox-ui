import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Input, Button, Card, Heading, Text, Stack } from 'lithebox-ui'
import { useToast } from 'lithebox-ui'

type Errors = {
  name?: string
  email?: string
  password?: string
  confirm?: string
}

function validate(name: string, email: string, password: string, confirm: string): Errors {
  const errors: Errors = {}
  if (!name || name.length < 2) errors.name = 'Name must be at least 2 characters'
  if (!email) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email'
  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters'
  if (confirm !== password) errors.confirm = 'Passwords do not match'
  return errors
}

export default function SignupPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const errs = validate(name, email, password, confirm)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    toast.success('Account created successfully')
    navigate('/dashboard')
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
              <Heading level={2}>Create account</Heading>
              <Text color="secondary" size="sm">Join Lithebox Playground</Text>
            </div>
            <Stack gap="sm">
              <Field label="Name" htmlFor="signup-name" required error={errors.name}>
                <Input
                  id="signup-name"
                  value={name}
                  onChange={setName}
                  placeholder="Your name"
                  error={!!errors.name}
                />
              </Field>
              <Field label="Email" htmlFor="signup-email" required error={errors.email}>
                <Input
                  id="signup-email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  error={!!errors.email}
                />
              </Field>
              <Field label="Password" htmlFor="signup-password" required error={errors.password}>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Min 8 characters"
                  error={!!errors.password}
                />
              </Field>
              <Field label="Confirm Password" htmlFor="signup-confirm" required error={errors.confirm}>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={confirm}
                  onChange={setConfirm}
                  placeholder="Repeat your password"
                  error={!!errors.confirm}
                />
              </Field>
            </Stack>
            <Button onClick={handleSubmit} loading={loading} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
            <Text color="secondary" size="sm">
              Already have an account?{' '}
              <Link to="/auth/login" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
            </Text>
          </Stack>
        </Card>
      </div>
    </div>
  )
}
