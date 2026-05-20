import { describe, it, expect, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useKeyboardNavigation } from "./useKeyboardNavigation"

function makeKeyEvent(key: string, shiftKey = false): React.KeyboardEvent {
  return { key, shiftKey, preventDefault: vi.fn() } as unknown as React.KeyboardEvent
}

describe("useKeyboardNavigation", () => {
  it("initial activeIndex is 0", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn() })
    )
    expect(result.current.activeIndex).toBe(0)
  })

  it("ArrowDown increments activeIndex", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn() })
    )
    act(() => {
      result.current.getItemProps(0).onKeyDown(makeKeyEvent("ArrowDown"))
    })
    expect(result.current.activeIndex).toBe(1)
  })

  it("ArrowUp at 0 with loop=false stays at 0", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn(), loop: false })
    )
    act(() => {
      result.current.getItemProps(0).onKeyDown(makeKeyEvent("ArrowUp"))
    })
    expect(result.current.activeIndex).toBe(0)
  })

  it("ArrowUp at 0 with loop=true wraps to last item", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn(), loop: true })
    )
    act(() => {
      result.current.getItemProps(0).onKeyDown(makeKeyEvent("ArrowUp"))
    })
    expect(result.current.activeIndex).toBe(2)
  })

  it("ArrowDown at last item with loop=true wraps to 0", () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect, loop: true })
    )
    act(() => {
      result.current.setActiveIndex(2)
    })
    act(() => {
      result.current.getItemProps(2).onKeyDown(makeKeyEvent("ArrowDown"))
    })
    expect(result.current.activeIndex).toBe(0)
  })

  it("ArrowDown at last item with loop=false stays at last", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn(), loop: false })
    )
    act(() => {
      result.current.setActiveIndex(2)
    })
    act(() => {
      result.current.getItemProps(2).onKeyDown(makeKeyEvent("ArrowDown"))
    })
    expect(result.current.activeIndex).toBe(2)
  })

  it("Enter calls onSelect with activeIndex", () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect })
    )
    act(() => {
      result.current.setActiveIndex(1)
    })
    act(() => {
      result.current.getItemProps(1).onKeyDown(makeKeyEvent("Enter"))
    })
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it("Space calls onSelect with activeIndex", () => {
    const onSelect = vi.fn()
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect })
    )
    act(() => {
      result.current.getItemProps(0).onKeyDown(makeKeyEvent(" "))
    })
    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it("Escape calls onEscape", () => {
    const onEscape = vi.fn()
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn(), onEscape })
    )
    act(() => {
      result.current.getItemProps(0).onKeyDown(makeKeyEvent("Escape"))
    })
    expect(onEscape).toHaveBeenCalled()
  })

  it("getItemProps returns tabIndex 0 for active item", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn() })
    )
    expect(result.current.getItemProps(0).tabIndex).toBe(0)
    expect(result.current.getItemProps(1).tabIndex).toBe(-1)
  })

  it("getItemProps returns aria-selected true only for active item", () => {
    const { result } = renderHook(() =>
      useKeyboardNavigation({ itemCount: 3, onSelect: vi.fn() })
    )
    expect(result.current.getItemProps(0)["aria-selected"]).toBe(true)
    expect(result.current.getItemProps(1)["aria-selected"]).toBe(false)
  })
})
