import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import type { OverlayEntry } from "./types"

type OverlayContextValue = {
  registerOverlay: (entry: OverlayEntry) => void
  unregisterOverlay: (id: string) => void
  portalRoot: HTMLElement | null
}

const OverlayContext = createContext<OverlayContextValue | null>(null)

type OverlayManagerProviderProps = {
  children?: React.ReactNode
  portalRootId?: string
}

export function OverlayManagerProvider({ children, portalRootId = "overlay-root" }: OverlayManagerProviderProps) {
  const portalRootRef = useRef<HTMLDivElement | null>(null)
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const [, setOverlays] = useState<OverlayEntry[]>([])

  useEffect(() => {
    const div = document.createElement("div")
    div.id = portalRootId
    document.body.appendChild(div)
    portalRootRef.current = div
    setPortalRoot(div)
    return () => {
      document.body.removeChild(div)
      portalRootRef.current = null
      setPortalRoot(null)
    }
  }, [portalRootId])

  const registerOverlay = (entry: OverlayEntry) => {
    setOverlays(prev => [...prev.filter(e => e.id !== entry.id), entry])
  }

  const unregisterOverlay = (id: string) => {
    setOverlays(prev => prev.filter(e => e.id !== id))
  }

  return (
    <OverlayContext.Provider value={{ registerOverlay, unregisterOverlay, portalRoot }}>
      {children}
    </OverlayContext.Provider>
  )
}

export function useOverlayContext(): OverlayContextValue {
  const ctx = useContext(OverlayContext)
  if (!ctx) {
    throw new Error("useOverlayContext must be used within OverlayManagerProvider")
  }
  return ctx
}
