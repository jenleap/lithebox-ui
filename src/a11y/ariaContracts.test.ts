import { describe, it, expect } from "vitest"
import {
  ButtonA11yContract,
  ModalA11yContract,
  DrawerA11yContract,
  DropdownA11yContract,
  InputA11yContract,
  CheckboxA11yContract,
  RadioA11yContract,
  SelectA11yContract,
  SidebarA11yContract,
  ListA11yContract,
  TableA11yContract,
  BannerA11yContract,
  ToastA11yContract,
  PageA11yContract,
} from "./ariaContracts"

describe("ariaContracts", () => {
  it("every contract has a role property", () => {
    const contracts = [
      ButtonA11yContract, ModalA11yContract, DrawerA11yContract, DropdownA11yContract,
      InputA11yContract, CheckboxA11yContract, RadioA11yContract, SelectA11yContract,
      SidebarA11yContract, ListA11yContract, TableA11yContract, BannerA11yContract,
      ToastA11yContract, PageA11yContract,
    ]
    contracts.forEach(c => expect(c.role).toBeDefined())
  })

  it("ButtonA11yContract has role button", () => {
    expect(ButtonA11yContract.role).toBe("button")
  })

  it("ModalA11yContract has role dialog and aria-modal", () => {
    expect(ModalA11yContract.role).toBe("dialog")
    expect(ModalA11yContract.attributes["aria-modal"]).toBe("true")
  })

  it("DrawerA11yContract has role dialog and aria-modal", () => {
    expect(DrawerA11yContract.role).toBe("dialog")
    expect(DrawerA11yContract.attributes["aria-modal"]).toBe("true")
  })

  it("SidebarA11yContract has role navigation", () => {
    expect(SidebarA11yContract.role).toBe("navigation")
  })

  it("ToastA11yContract has role status and aria-live polite", () => {
    expect(ToastA11yContract.role).toBe("status")
    expect(ToastA11yContract.attributes["aria-live"]).toBe("polite")
    expect(ToastA11yContract.attributes["aria-atomic"]).toBe("true")
  })

  it("BannerA11yContract has role alert", () => {
    expect(BannerA11yContract.role).toBe("alert")
  })

  it("DropdownA11yContract has role menu", () => {
    expect(DropdownA11yContract.role).toBe("menu")
  })

  it("PageA11yContract has role main", () => {
    expect(PageA11yContract.role).toBe("main")
  })

  it("TableA11yContract has role grid", () => {
    expect(TableA11yContract.role).toBe("grid")
  })

  it("InputA11yContract maps aria-invalid to error descriptor", () => {
    expect(InputA11yContract.attributes["aria-invalid"]).toBe("error")
  })
})
