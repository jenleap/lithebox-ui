import React from "react"
import { usePageTransition } from "./usePageTransition"

export type PageTransitionProps = {
  active: boolean
  children: React.ReactNode
}

export function PageTransition({ active, children }: PageTransitionProps) {
  const motionStyles = usePageTransition(active)

  return <div style={motionStyles}>{children}</div>
}
