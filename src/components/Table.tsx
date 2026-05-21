import { createContext, useContext } from "react"
import { TableContract } from "../contracts/TableContract"
import { resolveSlot } from "../contracts/resolveContract"
import { useBreakpoint } from "../responsive/useBreakpoint"
import { responsiveDensity } from "../responsive/breakpointTokens"

export type TableDensity = "comfortable" | "compact"

export type TableProps = {
  density?: TableDensity
  children?: React.ReactNode
}

export type TableHeaderProps = {
  children?: React.ReactNode
}

export type TableBodyProps = {
  children?: React.ReactNode
}

export type TableRowProps = {
  children?: React.ReactNode
}

export type TableCellProps = {
  children?: React.ReactNode
  header?: boolean
  label?: string
}

interface TableContextValue {
  density: TableDensity
  isMobile: boolean
}

const TableContext = createContext<TableContextValue>({ density: "comfortable", isMobile: false })

export function Table({ density, children }: TableProps) {
  const { breakpoint, isMobile } = useBreakpoint()
  const resolvedDensity: TableDensity = density ?? responsiveDensity[breakpoint === "sm" || breakpoint === "md" || breakpoint === "lg" ? breakpoint : "lg"]

  const style: React.CSSProperties = isMobile
    ? { width: "100%", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }
    : { borderCollapse: "collapse", width: "100%" }

  return (
    <TableContext.Provider value={{ density: resolvedDensity, isMobile }}>
      {isMobile ? <div style={style}>{children}</div> : <table style={style}>{children}</table>}
    </TableContext.Provider>
  )
}

export function TableHeader({ children }: TableHeaderProps) {
  const { isMobile } = useContext(TableContext)

  if (isMobile) return null

  const style: React.CSSProperties = {
    background: resolveSlot(TableContract.header.background),
  }

  return <thead style={style}>{children}</thead>
}

export function TableBody({ children }: TableBodyProps) {
  const { isMobile } = useContext(TableContext)
  return isMobile ? <>{children}</> : <tbody>{children}</tbody>
}

export function TableRow({ children }: TableRowProps) {
  const { isMobile } = useContext(TableContext)

  if (isMobile) {
    const cardStyle: React.CSSProperties = {
      background: "var(--color-surface)",
      border: `1px solid ${resolveSlot(TableContract.row.border)}`,
      borderRadius: "var(--radius-sm)",
      padding: "var(--spacing-sm)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--spacing-xs)",
    }
    return <div style={cardStyle}>{children}</div>
  }

  const style: React.CSSProperties = {
    borderBottom: `1px solid ${resolveSlot(TableContract.row.border)}`,
  }

  return <tr style={style}>{children}</tr>
}

export function TableCell({ children, header = false, label }: TableCellProps) {
  const { density, isMobile } = useContext(TableContext)
  const padding = resolveSlot(TableContract.density[density].padding)

  if (isMobile && !header) {
    const rowStyle: React.CSSProperties = {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--spacing-sm)",
    }
    const labelStyle: React.CSSProperties = {
      color: resolveSlot(TableContract.header.text),
      fontWeight: 600,
      fontSize: "0.875em",
      flexShrink: 0,
    }
    const valueStyle: React.CSSProperties = {
      color: resolveSlot(TableContract.cell.text),
      textAlign: "right",
    }
    return (
      <div style={rowStyle}>
        {label && <span style={labelStyle}>{label}</span>}
        <span style={valueStyle}>{children}</span>
      </div>
    )
  }

  if (isMobile && header) return null

  const style: React.CSSProperties = {
    padding,
    textAlign: "left",
    color: header
      ? resolveSlot(TableContract.header.text)
      : resolveSlot(TableContract.cell.text),
    ...(header && { fontWeight: 600 }),
  }

  return header
    ? <th style={style}>{children}</th>
    : <td style={style}>{children}</td>
}
