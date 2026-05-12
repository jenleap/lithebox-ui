import { resolveSlot } from "../contracts/resolveContract"
import { ContentStateContract } from "../contracts/ContentStateContract"

export type DescriptionListProps = {
  children: React.ReactNode
}

export type DescriptionListItemProps = {
  label: string
  value: React.ReactNode
}

export function DescriptionList({ children }: DescriptionListProps) {
  const style: React.CSSProperties = {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: resolveSlot("spacing.sm"),
  }

  return <dl style={style}>{children}</dl>
}

export function DescriptionListItem({ label, value }: DescriptionListItemProps) {
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: resolveSlot("spacing.sm"),
  }

  const labelStyle: React.CSSProperties = {
    margin: 0,
    color: resolveSlot(ContentStateContract.description.text),
    fontSize: resolveSlot("typography.size.sm"),
  }

  const valueStyle: React.CSSProperties = {
    margin: 0,
    color: resolveSlot(ContentStateContract.title.text),
    fontSize: resolveSlot("typography.size.sm"),
  }

  return (
    <div style={containerStyle}>
      <dt style={labelStyle}>{label}</dt>
      <dd style={valueStyle}>{value}</dd>
    </div>
  )
}
