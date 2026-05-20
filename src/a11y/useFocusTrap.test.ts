import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"
import { useRef } from "react"
import { useFocusTrap } from "./useFocusTrap"

function makeContainer(): HTMLDivElement {
  const container = document.createElement("div")
  const btn1 = document.createElement("button")
  const btn2 = document.createElement("button")
  const btn3 = document.createElement("button")
  btn1.textContent = "First"
  btn2.textContent = "Second"
  btn3.textContent = "Third"
  container.appendChild(btn1)
  container.appendChild(btn2)
  container.appendChild(btn3)
  document.body.appendChild(container)
  return container
}

function simulateTab(shiftKey = false) {
  const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey, bubbles: true })
  document.dispatchEvent(event)
  return event
}

describe("useFocusTrap", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
  })

  it("does not attach listener when active=false", () => {
    const addSpy = vi.spyOn(document, "addEventListener")
    const container = makeContainer()
    const { } = renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useFocusTrap(ref, false)
    })
    const tabListeners = addSpy.mock.calls.filter(([event]) => event === "keydown")
    expect(tabListeners.length).toBe(0)
    addSpy.mockRestore()
  })

  it("wraps Tab from last focusable to first when active=true", () => {
    const container = makeContainer()
    const buttons = container.querySelectorAll<HTMLElement>("button")
    const last = buttons[buttons.length - 1]

    renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useFocusTrap(ref, true)
    })

    last.focus()
    const focusSpy = vi.spyOn(buttons[0], "focus")
    simulateTab(false)
    expect(focusSpy).toHaveBeenCalled()
  })

  it("wraps Shift+Tab from first focusable to last when active=true", () => {
    const container = makeContainer()
    const buttons = container.querySelectorAll<HTMLElement>("button")
    const first = buttons[0]
    const last = buttons[buttons.length - 1]

    renderHook(() => {
      const ref = useRef<HTMLElement>(container)
      useFocusTrap(ref, true)
    })

    first.focus()
    const focusSpy = vi.spyOn(last, "focus")
    simulateTab(true)
    expect(focusSpy).toHaveBeenCalled()
  })

  it("removes listener when active transitions to false", () => {
    const container = makeContainer()
    const removeSpy = vi.spyOn(document, "removeEventListener")

    const { rerender } = renderHook(({ active }: { active: boolean }) => {
      const ref = useRef<HTMLElement>(container)
      useFocusTrap(ref, active)
    }, { initialProps: { active: true } })

    rerender({ active: false })

    const removed = removeSpy.mock.calls.some(([event]) => event === "keydown")
    expect(removed).toBe(true)
    removeSpy.mockRestore()
  })
})
