import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "./Table"

describe("Table", () => {
  it("renders as table element", () => {
    const { container } = render(<Table />)
    expect(container.querySelector("table")).toBeTruthy()
  })

  it("renders TableHeader as thead", () => {
    const { container } = render(<Table><TableHeader /></Table>)
    expect(container.querySelector("thead")).toBeTruthy()
  })

  it("renders TableBody as tbody", () => {
    const { container } = render(<Table><TableBody /></Table>)
    expect(container.querySelector("tbody")).toBeTruthy()
  })

  it("renders TableRow as tr", () => {
    const { container } = render(
      <Table><TableBody><TableRow /></TableBody></Table>
    )
    expect(container.querySelector("tr")).toBeTruthy()
  })

  it("renders header cell as th", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow><TableCell header>Name</TableCell></TableRow>
        </TableHeader>
      </Table>
    )
    expect(container.querySelector("th")).toBeTruthy()
  })

  it("renders body cell as td", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow><TableCell>Value</TableCell></TableRow>
        </TableBody>
      </Table>
    )
    expect(container.querySelector("td")).toBeTruthy()
  })

  it("comfortable density applies md padding", () => {
    const { container } = render(
      <Table density="comfortable">
        <TableBody><TableRow><TableCell>X</TableCell></TableRow></TableBody>
      </Table>
    )
    const td = container.querySelector("td") as HTMLElement
    expect(td.getAttribute("style")).toContain("var(--spacing-md)")
  })

  it("compact density applies sm padding", () => {
    const { container } = render(
      <Table density="compact">
        <TableBody><TableRow><TableCell>X</TableCell></TableRow></TableBody>
      </Table>
    )
    const td = container.querySelector("td") as HTMLElement
    expect(td.getAttribute("style")).toContain("var(--spacing-sm)")
  })

  it("renders cell content", () => {
    const { getByText } = render(
      <Table>
        <TableBody><TableRow><TableCell>Cell text</TableCell></TableRow></TableBody>
      </Table>
    )
    expect(getByText("Cell text")).toBeTruthy()
  })
})
