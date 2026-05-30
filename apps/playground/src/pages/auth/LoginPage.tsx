import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Input, Button, Card, Heading, Text, Stack } from 'lithebox-ui'
import { useToast } from 'lithebox-ui'

function validate(email: string, password: string) {
  const errors: { email?: string; password?: string } = {}
  if (!email) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email'
  if (!password) errors.password = 'Password is required'
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters'
  return errors
}

export default function LoginPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const errs = validate(email, password)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    toast.success('Signed in successfully')
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
              <Heading level={2}>Sign in</Heading>
              <Text color="secondary" size="sm">Welcome back to Lithebox Playground</Text>
            </div>
            <Stack gap="sm">
              <Field label="Email" htmlFor="login-email" required error={errors.email}>
                <Input
                  id="login-email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  error={!!errors.email}
                />
              </Field>
              <Field label="Password" htmlFor="login-password" required error={errors.password}>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  error={!!errors.password}
                />
              </Field>
            </Stack>
            <Button onClick={handleSubmit} loading={loading} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
            <Text color="secondary" size="sm">
              <Link to="/auth/signup" style={{ color: 'var(--color-primary)' }}>Create an account</Link>
              {' · '}
              <Link to="/auth/reset" style={{ color: 'var(--color-primary)' }}>Forgot password?</Link>
            </Text>
          </Stack>
        </Card>
      </div>
    </div>
  )
}
