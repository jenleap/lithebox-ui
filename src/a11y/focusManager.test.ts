import { describe, it, expect, beforeEach, vi } from "vitest"

function makeEl(): HTMLElement {
  const el = document.createElement("button")
  el.focus = vi.fn()
  document.body.appendChild(el)
  return el
}

describe("focusManager", () => {
  beforeEach(async () => {
    // Re-import to reset module-level stacks between tests
    vi.resetModules()
  })

  it("getCurrent returns null on empty stack", async () => {
    const { focusManager } = await import("./focusManager")
    expect(focusManager.getCurrent()).toBeNull()
  })

  it("push: getCurrent returns the pushed element", async () => {
    const { focusManager } = await import("./focusManager")
    const el = makeEl()
    focusManager.push(el)
    expect(focusManager.getCurrent()).toBe(el)
  })

  it("pop: getCurrent returns null after popping single-pushed element", async () => {
    const { focusManager } = await import("./focusManager")
    const el = makeEl()
    focusManager.push(el)
    focusManager.pop()
    expect(focusManager.getCurrent()).toBeNull()
  })

  it("supports nested pushes", async () => {
    const { focusManager } = await import("./focusManager")
    const el1 = makeEl()
    const el2 = makeEl()
    focusManager.push(el1)
    focusManager.push(el2)
    expect(focusManager.getCurrent()).toBe(el2)
    focusManager.pop()
    expect(focusManager.getCurrent()).toBe(el1)
  })

  it("pop on empty stack does not throw", async () => {
    const { focusManager } = await import("./focusManager")
    expect(() => focusManager.pop()).not.toThrow()
  })

  it("peek returns null when restore stack is empty", async () => {
    const { focusManager } = await import("./focusManager")
    expect(focusManager.peek()).toBeNull()
  })

  it("calls focus on the pushed element", async () => {
    const { focusManager } = await import("./focusManager")
    const el = makeEl()
    focusManager.push(el)
    expect(el.focus).toHaveBeenCalled()
  })
})
