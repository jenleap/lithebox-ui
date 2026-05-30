import React from 'react'
import { NavLink } from 'react-router-dom'

type NavItem = {
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Data', to: '/data' },
  { label: 'Settings', to: '/settings' },
  { label: 'Overlays', to: '/overlays' },
]

type NavItemsProps = {
  onNavigate?: () => void
}

export function NavItems({ onNavigate }: NavItemsProps) {
  return (
    <nav aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          style={({ isActive }) => ({
            display: 'block',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-sm)',
            textDecoration: 'none',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: isActive ? 600 : 400,
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            background: isActive ? 'var(--color-primary-subtle, rgba(0,0,0,0.06))' : 'transparent',
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
