import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import { Page } from "./Page"
import { PageHeader } from "./PageHeader"
import { PageContent } from "./PageContent"
import { PageSidebar } from "./PageSidebar"
import { PageFooter } from "./PageFooter"

describe("Page", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Page>
        <PageContent>
          <p>content</p>
        </PageContent>
      </Page>
    )
    expect(getByText("content")).toBeTruthy()
  })

  it("renders header slot", () => {
    const { getByText } = render(
      <Page header={<PageHeader><span>Header</span></PageHeader>}>
        <PageContent />
      </Page>
    )
    expect(getByText("Header")).toBeTruthy()
  })

  it("renders footer slot", () => {
    const { getByText } = render(
      <Page footer={<PageFooter><span>Footer</span></PageFooter>}>
        <PageContent />
      </Page>
    )
    expect(getByText("Footer")).toBeTruthy()
  })

  it("renders sidebar slot", () => {
    const { getByText } = render(
      <Page sidebar={<PageSidebar><span>Nav</span></PageSidebar>}>
        <PageContent />
      </Page>
    )
    expect(getByText("Nav")).toBeTruthy()
  })

  it("applies data-layout=standard", () => {
    const { container } = render(<Page layout="standard"><PageContent /></Page>)
    expect((container.firstChild as HTMLElement).getAttribute("data-layout")).toBe("standard")
  })

  it("applies data-layout=dashboard", () => {
    const { container } = render(<Page layout="dashboard"><PageContent /></Page>)
    expect((container.firstChild as HTMLElement).getAttribute("data-layout")).toBe("dashboard")
  })

  it("applies data-layout=detail", () => {
    const { container } = render(<Page layout="detail"><PageContent /></Page>)
    expect((container.firstChild as HTMLElement).getAttribute("data-layout")).toBe("detail")
  })

  it("applies data-layout=form", () => {
    const { container } = render(<Page layout="form"><PageContent /></Page>)
    expect((container.firstChild as HTMLElement).getAttribute("data-layout")).toBe("form")
  })

  it("state=loading hides children and renders LoadingState", () => {
    const { queryByText, getByText } = render(
      <Page state="loading">
        <PageContent>
          <p>hidden</p>
        </PageContent>
      </Page>
    )
    expect(queryByText("hidden")).toBeNull()
    expect(getByText("Loading...")).toBeTruthy()
  })

  it("state=error hides children and renders ErrorState", () => {
    const { queryByText, getByText } = render(
      <Page state="error">
        <PageContent>
          <p>hidden</p>
        </PageContent>
      </Page>
    )
    expect(queryByText("hidden")).toBeNull()
    expect(getByText("Something went wrong")).toBeTruthy()
  })

  it("state=empty hides children and renders EmptyState", () => {
    const { queryByText, getByText } = render(
      <Page state="empty">
        <PageContent>
          <p>hidden</p>
        </PageContent>
      </Page>
    )
    expect(queryByText("hidden")).toBeNull()
    expect(getByText("Nothing here")).toBeTruthy()
  })

  it("state=ready renders children normally", () => {
    const { getByText } = render(
      <Page state="ready">
        <PageContent>
          <p>visible</p>
        </PageContent>
      </Page>
    )
    expect(getByText("visible")).toBeTruthy()
  })

  it("header still renders during loading state", () => {
    const { getByText } = render(
      <Page
        state="loading"
        header={<PageHeader><span>Title</span></PageHeader>}
      >
        <PageContent />
      </Page>
    )
    expect(getByText("Title")).toBeTruthy()
  })

  it("warns when Page is nested inside another Page", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
    render(
      <Page>
        <Page>
          <PageContent />
        </Page>
      </Page>
    )
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
    spy.mockRestore()
  })
})

describe("PageHeader", () => {
  it("renders children", () => {
    const { getByText } = render(<PageHeader><span>Title</span></PageHeader>)
    expect(getByText("Title")).toBeTruthy()
  })

  it("renders as header element", () => {
    const { container } = render(<PageHeader>H</PageHeader>)
    expect(container.querySelector("header")).toBeTruthy()
  })
})

describe("PageContent", () => {
  it("renders children inside a Page", () => {
    const { getByText } = render(
      <Page>
        <PageContent><p>body</p></PageContent>
      </Page>
    )
    expect(getByText("body")).toBeTruthy()
  })

  it("renders as main element", () => {
    const { container } = render(
      <Page><PageContent>x</PageContent></Page>
    )
    expect(container.querySelector("main")).toBeTruthy()
  })

  it("warns when used outside Page", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
    render(<PageContent><p>x</p></PageContent>)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
    spy.mockRestore()
  })
})

describe("PageSidebar", () => {
  it("renders children inside a Page", () => {
    const { getByText } = render(
      <Page sidebar={<PageSidebar><span>nav</span></PageSidebar>}>
        <PageContent />
      </Page>
    )
    expect(getByText("nav")).toBeTruthy()
  })

  it("renders as aside element", () => {
    const { container } = render(
      <Page sidebar={<PageSidebar>x</PageSidebar>}>
        <PageContent />
      </Page>
    )
    expect(container.querySelector("aside")).toBeTruthy()
  })

  it("warns when used outside Page", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
    render(<PageSidebar><p>x</p></PageSidebar>)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
    spy.mockRestore()
  })
})

describe("PageFooter", () => {
  it("renders children inside a Page", () => {
    const { getByText } = render(
      <Page footer={<PageFooter><span>pagination</span></PageFooter>}>
        <PageContent />
      </Page>
    )
    expect(getByText("pagination")).toBeTruthy()
  })

  it("renders as footer element", () => {
    const { container } = render(
      <Page footer={<PageFooter>x</PageFooter>}>
        <PageContent />
      </Page>
    )
    expect(container.querySelector("footer")).toBeTruthy()
  })

  it("warns when used outside Page", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
    render(<PageFooter><p>x</p></PageFooter>)
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("[Lithebox]"))
    spy.mockRestore()
  })
})
