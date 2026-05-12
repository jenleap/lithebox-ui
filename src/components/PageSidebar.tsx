import React from "react"
import { PageContract } from "../contracts/PageContract"
import { resolveSlot } from "../contracts/resolveContract"
import { usePageCompositionContext } from "./PageCompositionContext"

export type PageSidebarProps = {
  children?: React.ReactNode
}

export function PageSidebar({ children }: PageSidebarProps) {
  const ctx = usePageCompositionContext()
  if (process.env.NODE_ENV !== "production" && !ctx.insidePage) {
    console.warn("[Lithebox] PageSidebar must be used inside a Page.")
  }

  const style: React.CSSProperties = {
    background: resolveSlot(PageContract.sidebar.background),
    borderRight: `1px solid ${resolveSlot(PageContract.sidebar.border)}`,
    width: resolveSlot(PageContract.sidebar.width) ?? "240px",
    flexShrink: 0,
    overflowY: "auto",
  }
  return <aside style={style}>{children}</aside>
}
