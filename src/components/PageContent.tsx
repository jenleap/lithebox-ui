import React from "react"
import { PageContract } from "../contracts/PageContract"
import { resolveSlot } from "../contracts/resolveContract"
import { PageCompositionProvider, usePageCompositionContext } from "./PageCompositionContext"

export type PageContentProps = {
  children?: React.ReactNode
}

export function PageContent({ children }: PageContentProps) {
  const ctx = usePageCompositionContext()
  if (process.env.NODE_ENV !== "production" && !ctx.insidePage) {
    console.warn("[Lithebox] PageContent must be used inside a Page.")
  }

  const style: React.CSSProperties = {
    flex: 1,
    overflowY: "auto",
    padding: resolveSlot(PageContract.content.padding),
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot(PageContract.content.gap),
  }
  return (
    <PageCompositionProvider value={{ insidePage: true, insidePageContent: true }}>
      <main style={style}>{children}</main>
    </PageCompositionProvider>
  )
}
