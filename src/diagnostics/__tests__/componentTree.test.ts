import { describe, it, expect } from "vitest"
import { buildComponentTreeSnapshot, flattenComponentTree, findComponentById } from "../componentTree"

describe("buildComponentTreeSnapshot", () => {
  it("builds a snapshot from a flat node", () => {
    const result = buildComponentTreeSnapshot({ id: "1", type: "Button", props: { label: "Ok" } })
    expect(result.id).toBe("1")
    expect(result.type).toBe("Button")
    expect(result.props).toEqual({ label: "Ok" })
    expect(Object.isFrozen(result.props)).toBe(true)
  })

  it("recursively builds children", () => {
    const result = buildComponentTreeSnapshot({
      id: "root",
      type: "Box",
      props: {},
      children: [{ id: "child", type: "Text", props: { value: "hi" } }],
    })
    expect(result.children).toHaveLength(1)
    expect(result.children![0].id).toBe("child")
  })

  it("returns undefined children when none provided", () => {
    const result = buildComponentTreeSnapshot({ id: "x", type: "X", props: {} })
    expect(result.children).toBeUndefined()
  })
})

describe("flattenComponentTree", () => {
  it("returns single node for leaf", () => {
    const snapshot = buildComponentTreeSnapshot({ id: "a", type: "A", props: {} })
    expect(flattenComponentTree(snapshot)).toHaveLength(1)
  })

  it("returns all nodes in depth-first order", () => {
    const snapshot = buildComponentTreeSnapshot({
      id: "a",
      type: "A",
      props: {},
      children: [
        {
          id: "b",
          type: "B",
          props: {},
          children: [{ id: "c", type: "C", props: {} }],
        },
      ],
    })
    const flat = flattenComponentTree(snapshot)
    expect(flat.map((n) => n.id)).toEqual(["a", "b", "c"])
  })
})

describe("findComponentById", () => {
  it("finds the root node", () => {
    const snapshot = buildComponentTreeSnapshot({ id: "root", type: "Root", props: {} })
    expect(findComponentById(snapshot, "root")?.id).toBe("root")
  })

  it("finds a nested node by id", () => {
    const snapshot = buildComponentTreeSnapshot({
      id: "root",
      type: "Root",
      props: {},
      children: [{ id: "target", type: "Target", props: {} }],
    })
    const found = findComponentById(snapshot, "target")
    expect(found?.id).toBe("target")
  })

  it("returns undefined for unknown id", () => {
    const snapshot = buildComponentTreeSnapshot({ id: "x", type: "X", props: {} })
    expect(findComponentById(snapshot, "missing")).toBeUndefined()
  })
})
