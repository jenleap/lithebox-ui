import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { EmptyState } from "./EmptyState"
import { LoadingState } from "./LoadingState"
import { ErrorState } from "./ErrorState"

describe("EmptyState", () => {
  it("renders title", () => {
    const { getByText } = render(<EmptyState title="No results" />)
    expect(getByText("No results")).toBeTruthy()
  })

  it("renders optional description", () => {
    const { getByText } = render(
      <EmptyState title="Empty" description="Try adding some data." />
    )
    expect(getByText("Try adding some data.")).toBeTruthy()
  })

  it("renders without description", () => {
    expect(() => render(<EmptyState title="Empty" />)).not.toThrow()
  })

  it("renders optional action slot", () => {
    const { getByText } = render(
      <EmptyState title="Empty" action={<button>Add item</button>} />
    )
    expect(getByText("Add item")).toBeTruthy()
  })

  it("renders optional icon slot", () => {
    const { getByText } = render(
      <EmptyState title="Empty" icon={<span>icon</span>} />
    )
    expect(getByText("icon")).toBeTruthy()
  })
})

describe("LoadingState", () => {
  it("renders without error", () => {
    expect(() => render(<LoadingState />)).not.toThrow()
  })

  it("renders label when provided", () => {
    const { getByText } = render(<LoadingState label="Loading..." />)
    expect(getByText("Loading...")).toBeTruthy()
  })

  it("renders without label", () => {
    expect(() => render(<LoadingState />)).not.toThrow()
  })
})

describe("ErrorState", () => {
  it("renders default title", () => {
    const { getByText } = render(<ErrorState />)
    expect(getByText("Something went wrong")).toBeTruthy()
  })

  it("renders custom title", () => {
    const { getByText } = render(<ErrorState title="Failed to load" />)
    expect(getByText("Failed to load")).toBeTruthy()
  })

  it("renders optional description", () => {
    const { getByText } = render(
      <ErrorState description="Check your connection." />
    )
    expect(getByText("Check your connection.")).toBeTruthy()
  })

  it("renders optional action slot", () => {
    const { getByText } = render(
      <ErrorState action={<button>Retry</button>} />
    )
    expect(getByText("Retry")).toBeTruthy()
  })
})
