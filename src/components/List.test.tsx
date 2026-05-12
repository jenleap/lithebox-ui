import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { List, ListItem } from "./List"
import { DescriptionList, DescriptionListItem } from "./DescriptionList"

describe("List", () => {
  it("renders as ul", () => {
    const { container } = render(<List><ListItem>Item 1</ListItem></List>)
    expect(container.querySelector("ul")).toBeTruthy()
  })

  it("renders children text", () => {
    const { getByText } = render(<List><ListItem>Hello</ListItem></List>)
    expect(getByText("Hello")).toBeTruthy()
  })

  it("renders ListItem as li", () => {
    const { container } = render(<List><ListItem>A</ListItem></List>)
    expect(container.querySelector("li")).toBeTruthy()
  })

  it("applies gap from spacing sm variant", () => {
    const { container } = render(<List spacing="sm"><ListItem>A</ListItem></List>)
    const ul = container.querySelector("ul") as HTMLElement
    expect(ul.getAttribute("style")).toContain("var(--spacing-xs)")
  })

  it("applies gap from spacing lg variant", () => {
    const { container } = render(<List spacing="lg"><ListItem>A</ListItem></List>)
    const ul = container.querySelector("ul") as HTMLElement
    expect(ul.getAttribute("style")).toContain("var(--spacing-md)")
  })
})

describe("DescriptionList", () => {
  it("renders as dl", () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem label="Key" value="Value" />
      </DescriptionList>
    )
    expect(container.querySelector("dl")).toBeTruthy()
  })

  it("renders label text", () => {
    const { getByText } = render(
      <DescriptionList>
        <DescriptionListItem label="Name" value="Alice" />
      </DescriptionList>
    )
    expect(getByText("Name")).toBeTruthy()
  })

  it("renders value text", () => {
    const { getByText } = render(
      <DescriptionList>
        <DescriptionListItem label="Role" value="Engineer" />
      </DescriptionList>
    )
    expect(getByText("Engineer")).toBeTruthy()
  })

  it("renders label in dt element", () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem label="Status" value="Active" />
      </DescriptionList>
    )
    expect(container.querySelector("dt")).toBeTruthy()
  })

  it("renders value in dd element", () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionListItem label="Status" value="Active" />
      </DescriptionList>
    )
    expect(container.querySelector("dd")).toBeTruthy()
  })
})
