import React from "react"
import { PageContract } from "../contracts/PageContract"
import { resolveSlot } from "../contracts/resolveContract"
import { usePageCompositionContext } from "./PageCompositionContext"

export type PageFooterProps = {
  children?: React.ReactNode
}

export function PageFooter({ children }: PageFooterProps) {
  const ctx = usePageCompositionContext()
  if (process.env.NODE_ENV !== "production" && !ctx.insidePage) {
    console.warn("[Lithebox] PageFooter must be used inside a Page.")
  }

  const style: React.CSSProperties = {
    background: resolveSlot(PageContract.footer.background),
    borderTop: `1px solid ${resolveSlot(PageContract.footer.border)}`,
    padding: resolveSlot(PageContract.footer.padding),
    flexShrink: 0,
  }
  return <footer style={style}>{children}</footer>
}
