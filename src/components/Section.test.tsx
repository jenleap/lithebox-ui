import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Page } from "./Page"
import { PageContent } from "./PageContent"
import { Section, SectionHeader, SectionContent } from "./Section"

describe("Section", () => {
  it("renders title when provided", () => {
    const { getByText } = render(
      <Page>
        <PageContent>
          <Section title="Overview"><p>body</p></Section>
        </PageContent>
      </Page>
    )
    expect(getByText("Overview")).toBeTruthy()
  })

  it("renders children", () => {
    const { getByText } = render(
      <Page>
        <PageContent>
          <Section><p>content</p></Section>
        </PageContent>
      </Page>
    )
    expect(getByText("content")).toBeTruthy()
  })

  it("renders without title", () => {
    const { getByText } = render(
      <Page>
        <PageContent>
          <Section><p>no title</p></Section>
        </PageContent>
      </Page>
    )
    expect(getByText("no title")).toBeTruthy()
  })

  it("renders as section element", () => {
    const { container } = render(
      <Page>
        <PageContent>
          <Section><p>x</p></Section>
        </PageContent>
      </Page>
    )
    expect(container.querySelector("section")).toBeTruthy()
  })

  it("warns when used outside PageContent", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
    render(<Section title="Test"><p>x</p></Section>)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
    spy.mockRestore()
  })
})

describe("SectionHeader", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Page>
        <PageContent>
          <SectionHeader><span>Header</span></SectionHeader>
        </PageContent>
      </Page>
    )
    expect(getByText("Header")).toBeTruthy()
  })
})

describe("SectionContent", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Page>
        <PageContent>
          <SectionContent><span>body</span></SectionContent>
        </PageContent>
      </Page>
    )
    expect(getByText("body")).toBeTruthy()
  })
})
