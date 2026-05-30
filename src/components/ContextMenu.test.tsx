import { describe, it, expect, vi } from "vitest"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import React from "react"
import { ContextMenu } from "./ContextMenu"
import { LitheboxProvider } from "../runtime/LitheboxProvider"

function wrap(ui: React.ReactNode) {
  return render(<LitheboxProvider>{ui}</LitheboxProvider>)
}

describe("ContextMenu", () => {
  it("renders children without menu", () => {
    wrap(
      <ContextMenu items={[{ label: "Open", onClick: vi.fn() }]}>
        <div>Area</div>
      </ContextMenu>
    )
    expect(screen.queryByRole("menu")).toBeNull()
  })

  it("opens on right-click", async () => {
    wrap(
      <ContextMenu items={[{ label: "Open", onClick: vi.fn() }]}>
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
  })

  it("closes on Escape", async () => {
    wrap(
      <ContextMenu items={[{ label: "Open", onClick: vi.fn() }]}>
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
    fireEvent.keyDown(document, { key: "Escape" })
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
  })

  it("calls item onClick and closes menu", async () => {
    const handler = vi.fn()
    wrap(
      <ContextMenu items={[{ label: "Open", onClick: handler }]}>
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
    fireEvent.click(screen.getByText("Open"))
    expect(handler).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull())
  })

  it("disabled item not clickable", async () => {
    const handler = vi.fn()
    wrap(
      <ContextMenu items={[{ label: "Rename", onClick: handler, disabled: true }]}>
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
    fireEvent.click(screen.getByText("Rename"))
    expect(handler).not.toHaveBeenCalled()
  })

  it("arrow key navigation moves focus to next item", async () => {
    wrap(
      <ContextMenu items={[{ label: "First", onClick: vi.fn() }, { label: "Second", onClick: vi.fn() }]}>
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
    await waitFor(() => expect(document.activeElement).toBe(screen.getByText("First")))
    fireEvent.keyDown(document, { key: "ArrowDown" })
    await waitFor(() => expect(document.activeElement).toBe(screen.getByText("Second")))
  })

  it("arrow key navigation skips disabled items", async () => {
    wrap(
      <ContextMenu
        items={[
          { label: "First", onClick: vi.fn() },
          { label: "Middle", onClick: vi.fn(), disabled: true },
          { label: "Third", onClick: vi.fn() },
        ]}
      >
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
    await waitFor(() => expect(document.activeElement).toBe(screen.getByText("First")))
    fireEvent.keyDown(document, { key: "ArrowDown" })
    await waitFor(() => expect(document.activeElement).toBe(screen.getByText("Third")))
  })

  it("destructive item has error color style", async () => {
    wrap(
      <ContextMenu items={[{ label: "Delete", onClick: vi.fn(), destructive: true }]}>
        <div>Area</div>
      </ContextMenu>
    )
    fireEvent.contextMenu(screen.getByText("Area"))
    await waitFor(() => expect(screen.getByRole("menu")).toBeInTheDocument())
    const item = screen.getByText("Delete")
    expect(item.getAttribute("style")).toContain("var(--color-error)")
  })
})
