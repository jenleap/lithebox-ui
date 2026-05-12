import { createContext, useContext } from "react"
import { TableContract } from "../contracts/TableContract"
import { resolveSlot } from "../contracts/resolveContract"

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
}

const TableDensityContext = createContext<TableDensity>("comfortable")

export function Table({ density = "comfortable", children }: TableProps) {
  const style: React.CSSProperties = {
    borderCollapse: "collapse",
    width: "100%",
  }

  return (
    <TableDensityContext.Provider value={density}>
      <table style={style}>{children}</table>
    </TableDensityContext.Provider>
  )
}

export function TableHeader({ children }: TableHeaderProps) {
  const style: React.CSSProperties = {
    background: resolveSlot(TableContract.header.background),
  }

  return <thead style={style}>{children}</thead>
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children }: TableRowProps) {
  const style: React.CSSProperties = {
    borderBottom: `1px solid ${resolveSlot(TableContract.row.border)}`,
  }

  return <tr style={style}>{children}</tr>
}

export function TableCell({ children, header = false }: TableCellProps) {
  const density = useContext(TableDensityContext)
  const padding = resolveSlot(TableContract.density[density].padding)

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
