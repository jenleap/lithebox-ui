import { describe, it, expect } from "vitest"
import { validateComposition } from "../validateComposition"
import {
  LBX_INVALID_CHILD,
  LBX_INVALID_PARENT,
  LBX_MAX_DEPTH_EXCEEDED,
} from "../errorCodes"

const rules = [
  { component: "ButtonGroup", allowedChildren: ["Button"] },
  { component: "Button", allowedParents: ["ButtonGroup", "Toolbar"] },
]

describe("validateComposition", () => {
  it("returns valid for correct parent-child", () => {
    const tree = { component: "ButtonGroup", children: [{ component: "Button" }] }
    expect(validateComposition(tree, rules).valid).toBe(true)
  })

  it("errors on invalid child", () => {
    const tree = { component: "ButtonGroup", children: [{ component: "Icon" }] }
    const result = validateComposition(tree, rules)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_INVALID_CHILD)).toBe(true)
  })

  it("errors on invalid parent", () => {
    const tree = { component: "Modal", children: [{ component: "Button" }] }
    const result = validateComposition(tree, rules)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.code === LBX_INVALID_PARENT)).toBe(true)
  })

  it("errors when max depth exceeded", () => {
    type Node = { component: string; children?: Node[] }
    const deep = (depth: number): Node =>
      depth === 0
        ? { component: "Leaf" }
        : { component: "Wrapper", children: [deep(depth - 1)] }
    const result = validateComposition(deep(10), [], 5)
    expect(result.errors.some((e) => e.code === LBX_MAX_DEPTH_EXCEEDED)).toBe(true)
  })

  it("returns valid for a leaf node with no rules", () => {
    const tree = { component: "Text" }
    expect(validateComposition(tree, []).valid).toBe(true)
  })

  it("returns valid when no children are present and allowedChildren is set", () => {
    const tree = { component: "ButtonGroup" }
    expect(validateComposition(tree, rules).valid).toBe(true)
  })
})
