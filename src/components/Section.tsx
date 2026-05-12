import React from "react"
import { SectionContract } from "../contracts/SectionContract"
import { resolveSlot } from "../contracts/resolveContract"
import { usePageCompositionContext } from "./PageCompositionContext"

export type SectionProps = {
  title?: string
  children?: React.ReactNode
}

export type SectionHeaderProps = {
  children: React.ReactNode
}

export type SectionContentProps = {
  children: React.ReactNode
}

export function SectionHeader({ children }: SectionHeaderProps) {
  const style: React.CSSProperties = {
    paddingBottom: resolveSlot(SectionContract.header.padding),
    borderBottom: `1px solid ${resolveSlot(SectionContract.header.border)}`,
    marginBottom: resolveSlot(SectionContract.root.gap),
  }
  return <div style={style}>{children}</div>
}

export function SectionContent({ children }: SectionContentProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot(SectionContract.content.gap),
  }
  return <div style={style}>{children}</div>
}

export function Section({ title, children }: SectionProps) {
  const ctx = usePageCompositionContext()
  if (process.env.NODE_ENV !== "production" && !ctx.insidePageContent) {
    console.warn("[Lithebox] Section must be used inside PageContent.")
  }

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot(SectionContract.root.gap),
  }

  return (
    <section style={style}>
      {title && (
        <SectionHeader>
          <span
            style={{
              color: resolveSlot(SectionContract.header.title.text),
              fontWeight: 600,
            }}
          >
            {title}
          </span>
        </SectionHeader>
      )}
      <SectionContent>{children}</SectionContent>
    </section>
  )
}
