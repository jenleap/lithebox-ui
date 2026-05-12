import React from "react"
import { PageContract } from "../contracts/PageContract"
import { resolveSlot } from "../contracts/resolveContract"

export type PageHeaderProps = {
  children?: React.ReactNode
}

export function PageHeader({ children }: PageHeaderProps) {
  const style: React.CSSProperties = {
    background: resolveSlot(PageContract.header.background),
    borderBottom: `1px solid ${resolveSlot(PageContract.header.border)}`,
    padding: resolveSlot(PageContract.header.padding),
    flexShrink: 0,
  }
  return <header style={style}>{children}</header>
}
