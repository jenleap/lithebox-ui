import { describe, it, expect } from "vitest"
import "../components/layoutMetadata"
import "../components/primitiveMetadata"
import "../components/formMetadata"
import "../components/navigationMetadata"
import "../components/dataDisplayMetadata"
import "../components/feedbackMetadata"
import { getComponent, getAllComponents } from "../registry"

describe("component metadata — full registry", () => {
  it("registers at least 30 components after all metadata imports", () => {
    const all = getAllComponents()
    expect(Object.keys(all).length).toBeGreaterThanOrEqual(30)
  })

  it("Box is registered with category layout and version 1.0.0", () => {
    const box = getComponent("Box")
    expect(box?.category).toBe("layout")
    expect(box?.version).toBe("1.0.0")
  })

  it("Button has states including disabled and loading", () => {
    const button = getComponent("Button")
    expect(button?.states).toContain("disabled")
    expect(button?.states).toContain("loading")
  })

  it("Card has slots for header, body, and footer", () => {
    const card = getComponent("Card")
    expect(card?.slots?.["header"]).toBeDefined()
    expect(card?.slots?.["body"]).toBeDefined()
    expect(card?.slots?.["footer"]).toBeDefined()
  })

  it("Field has allowedChildren including Input", () => {
    const field = getComponent("Field")
    expect(field?.composition.allowedChildren).toContain("Input")
  })

  it("TableCell has allowedParents restricted to TableRow only", () => {
    const tableCell = getComponent("TableCell")
    expect(tableCell?.composition.allowedParents).toEqual(["TableRow"])
  })

  it("AppShell has maxDepth of 1", () => {
    const appShell = getComponent("AppShell")
    expect(appShell?.composition.maxDepth).toBe(1)
  })

  it("Modal has focusBehavior defined in accessibility", () => {
    const modal = getComponent("Modal")
    expect(modal?.accessibility?.focusBehavior).toBeDefined()
  })

  it("Toast has maxDepth of 0", () => {
    const toast = getComponent("Toast")
    expect(toast?.composition.maxDepth).toBe(0)
  })

  it("Badge has maxDepth of 0", () => {
    const badge = getComponent("Badge")
    expect(badge?.composition.maxDepth).toBe(0)
  })

  it("Field has slots for label and input", () => {
    const field = getComponent("Field")
    expect(field?.slots?.["label"]).toBeDefined()
    expect(field?.slots?.["input"]).toBeDefined()
  })

  it("Select has accessibility role of combobox", () => {
    const select = getComponent("Select")
    expect(select?.accessibility?.role).toBe("combobox")
  })

  it("Checkbox states include indeterminate", () => {
    const checkbox = getComponent("Checkbox")
    expect(checkbox?.states).toContain("indeterminate")
  })

  it("all registered components have version 1.0.0", () => {
    const all = getAllComponents()
    for (const meta of Object.values(all)) {
      expect(meta.version).toBe("1.0.0")
    }
  })

  it("Icon has maxDepth of 0", () => {
    const icon = getComponent("Icon")
    expect(icon?.composition.maxDepth).toBe(0)
  })

  it("ToastContainer allowedChildren is restricted to Toast only", () => {
    const container = getComponent("ToastContainer")
    expect(container?.composition.allowedChildren).toEqual(["Toast"])
  })

  it("List allowedChildren is restricted to ListItem only", () => {
    const list = getComponent("List")
    expect(list?.composition.allowedChildren).toEqual(["ListItem"])
  })

  it("Table has states including loading and empty", () => {
    const table = getComponent("Table")
    expect(table?.states).toContain("loading")
    expect(table?.states).toContain("empty")
  })
})
