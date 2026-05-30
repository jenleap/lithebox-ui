import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PlaygroundShell } from '../shell/PlaygroundShell'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'
import ResetPage from '../pages/auth/ResetPage'
import DashboardPage from '../pages/DashboardPage'
import SettingsPage from '../pages/SettingsPage'
import DataPage from '../pages/DataPage'
import OverlaysPage from '../pages/OverlaysPage'

function ShellLayout({ children }: { children: React.ReactNode }) {
  return <PlaygroundShell>{children}</PlaygroundShell>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/reset" element={<ResetPage />} />
      <Route
        path="/dashboard"
        element={<ShellLayout><DashboardPage /></ShellLayout>}
      />
      <Route
        path="/settings"
        element={<ShellLayout><SettingsPage /></ShellLayout>}
      />
      <Route
        path="/data"
        element={<ShellLayout><DataPage /></ShellLayout>}
      />
      <Route
        path="/overlays"
        element={<ShellLayout><OverlaysPage /></ShellLayout>}
      />
    </Routes>
  )
}
