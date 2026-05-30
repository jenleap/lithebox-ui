import { describe, it, expect } from "vitest"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import React from "react"
import { Tooltip } from "./Tooltip"
import { LitheboxProvider } from "../runtime/LitheboxProvider"

function wrap(ui: React.ReactNode) {
  return render(<LitheboxProvider>{ui}</LitheboxProvider>)
}

describe("Tooltip", () => {
  it("renders without tooltip initially", () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    expect(screen.queryByRole("tooltip")).toBeNull()
  })

  it("shows tooltip on hover", async () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByText("Trigger"))
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())
    expect(screen.getByRole("tooltip")).toHaveTextContent("tip")
  })

  it("hides tooltip on mouse leave", async () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    const trigger = screen.getByText("Trigger")
    fireEvent.mouseEnter(trigger)
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())
    fireEvent.mouseLeave(trigger)
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull())
  })

  it("shows tooltip on focus", async () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    fireEvent.focus(screen.getByText("Trigger"))
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())
  })

  it("hides tooltip on blur", async () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    const trigger = screen.getByText("Trigger")
    fireEvent.focus(trigger)
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())
    fireEvent.blur(trigger)
    await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull())
  })

  it("trigger has aria-describedby matching tooltip id", async () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    const trigger = screen.getByText("Trigger")
    fireEvent.mouseEnter(trigger)
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())
    const tooltip = screen.getByRole("tooltip")
    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id)
  })

  it("tooltip element has role tooltip", async () => {
    wrap(<Tooltip content="tip"><button>Trigger</button></Tooltip>)
    fireEvent.mouseEnter(screen.getByText("Trigger"))
    await waitFor(() => expect(screen.getByRole("tooltip")).toBeInTheDocument())
  })

  it("renders all placement values without error", () => {
    const placements = ["top", "right", "bottom", "left"] as const
    for (const placement of placements) {
      expect(() =>
        wrap(
          <Tooltip content="tip" placement={placement}>
            <button>T</button>
          </Tooltip>
        )
      ).not.toThrow()
    }
  })
})
