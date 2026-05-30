import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"
import { ContextMenuA11yContract } from "../a11y/ariaContracts"
import { useMotionTransition } from "../motion/useMotionTransition"
import { DropdownMotionContract } from "../motion/contracts"
import { duration } from "../motion/motionTokens"

export type ContextMenuItem = {
  label: string
  onClick: () => void
  disabled?: boolean
  destructive?: boolean
}

export type ContextMenuProps = {
  items: ContextMenuItem[]
  children: React.ReactNode
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  const { portalRoot } = useOverlay({ id: "contextmenu", layer: "dropdown" })
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (open) {
      setMounted(true)
    } else {
      const delay = parseInt(duration.fast, 10)
      const timer = setTimeout(() => setMounted(false), delay)
      return () => clearTimeout(timer)
    }
  }, [open])

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault()
    setPosition({ top: e.clientY + window.scrollY, left: e.clientX + window.scrollX })
    setOpen(true)
  }

  // Clamp position to viewport after mount
  useLayoutEffect(() => {
    if (!open || !menuRef.current) return
    const menu = menuRef.current
    const menuWidth = menu.offsetWidth
    const menuHeight = menu.offsetHeight
    const maxLeft = window.innerWidth + window.scrollX - menuWidth - 8
    const maxTop = window.innerHeight + window.scrollY - menuHeight - 8
    setPosition((p) => ({
      top: Math.min(p.top, maxTop),
      left: Math.min(p.left, maxLeft),
    }))
  }, [open, mounted])

  // Escape and arrow key navigation
  useEffect(() => {
    if (!open) return

    function getItems(): HTMLElement[] {
      if (!menuRef.current) return []
      return Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
      )
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      const menuItems = getItems()
      if (menuItems.length === 0) return
      const current = document.activeElement as HTMLElement
      const idx = menuItems.indexOf(current)

      if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = idx < menuItems.length - 1 ? menuItems[idx + 1] : menuItems[0]
        next.focus()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prev = idx > 0 ? menuItems[idx - 1] : menuItems[menuItems.length - 1]
        prev.focus()
      } else if (e.key === "Home") {
        e.preventDefault()
        menuItems[0]?.focus()
      } else if (e.key === "End") {
        e.preventDefault()
        menuItems[menuItems.length - 1]?.focus()
      }
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  // Click outside to close
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Auto-focus first enabled item on open
  useEffect(() => {
    if (!open || !menuRef.current) return
    const first = menuRef.current.querySelector<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    )
    first?.focus()
  }, [open, mounted])

  const motionStyles = useMotionTransition(DropdownMotionContract, open)

  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: position.top,
    left: position.left,
    zIndex: LAYER_Z_INDEX.dropdown,
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sm)",
    padding: "var(--spacing-xs)",
    minWidth: 160,
    outline: "none",
    ...motionStyles,
  }

  return (
    <>
      <div onContextMenu={handleContextMenu} style={{ display: "contents" }}>
        {children}
      </div>

      {mounted && portalRoot &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            role={ContextMenuA11yContract.role}
            aria-orientation="vertical"
            style={menuStyle}
          >
            {items.map((item, i) => (
              <div
                key={i}
                role="menuitem"
                tabIndex={item.disabled ? undefined : -1}
                aria-disabled={item.disabled ? "true" : undefined}
                onClick={() => {
                  if (item.disabled) return
                  item.onClick()
                  setOpen(false)
                }}
                style={{
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  color: item.destructive
                    ? "var(--color-error)"
                    : "var(--color-text)",
                  opacity: item.disabled ? 0.4 : 1,
                  fontFamily: "var(--font-family-base)",
                  fontSize: "var(--font-size-sm)",
                  borderRadius: "var(--radius-sm)",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) (e.currentTarget as HTMLElement).style.background = "var(--color-background)"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent"
                }}
              >
                {item.label}
              </div>
            ))}
          </div>,
          portalRoot
        )
      }
    </>
  )
}
