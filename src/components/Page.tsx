import React from "react"
import { PageContract } from "../contracts/PageContract"
import { resolveSlot } from "../contracts/resolveContract"
import { getLayoutBodyStyle, getLayoutContentStyle } from "../utils/pageLayouts"
import { LoadingState } from "./LoadingState"
import { ErrorState } from "./ErrorState"
import { EmptyState } from "./EmptyState"
import { PageCompositionProvider, usePageCompositionContext } from "./PageCompositionContext"

export type PageState = "loading" | "error" | "empty" | "ready"
export type PageLayout = "standard" | "dashboard" | "detail" | "form"

function renderPageState(state: PageState): React.ReactNode | null {
  switch (state) {
    case "loading":
      return <LoadingState label="Loading..." />
    case "error":
      return <ErrorState />
    case "empty":
      return <EmptyState title="Nothing here" description="This page has no content yet." />
    default:
      return null
  }
}

export type PageProps = {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  state?: PageState
  layout?: PageLayout
}

export function Page({
  header,
  sidebar,
  footer,
  children,
  state = "ready",
  layout = "standard",
}: PageProps) {
  const parentCtx = usePageCompositionContext()
  if (process.env.NODE_ENV !== "production" && parentCtx.insidePage) {
    console.warn("[Lithebox] Page cannot be nested inside another Page.")
  }

  const rootStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: resolveSlot(PageContract.root.minHeight) ?? "100vh",
    background: resolveSlot(PageContract.root.background),
  }

  const bodyStyle = getLayoutBodyStyle(layout)
  const contentWrapStyle = getLayoutContentStyle(layout)
  const hasContentWrap = Object.keys(contentWrapStyle).length > 0
  const stateOverride = state !== "ready" ? renderPageState(state) : null

  return (
    <PageCompositionProvider value={{ insidePage: true, insidePageContent: false }}>
    <div style={rootStyle} data-layout={layout} data-state={state}>
      {header}
      <div style={bodyStyle}>
        {stateOverride ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {stateOverride}
          </div>
        ) : (
          <>
            {sidebar}
            {hasContentWrap ? <div style={contentWrapStyle}>{children}</div> : children}
          </>
        )}
      </div>
      {footer}
    </div>
    </PageCompositionProvider>
  )
}
