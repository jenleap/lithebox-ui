export type AriaRole =
  | "button"
  | "dialog"
  | "navigation"
  | "list"
  | "listitem"
  | "grid"
  | "row"
  | "gridcell"
  | "combobox"
  | "textbox"
  | "checkbox"
  | "radio"
  | "menuitem"
  | "menu"
  | "banner"
  | "main"
  | "contentinfo"
  | "complementary"
  | "region"
  | "alert"
  | "status"
  | "tooltip"

export type AriaAttributeMap = Record<string, string | boolean>

export type AriaContract = {
  role: AriaRole
  attributes: Partial<AriaAttributeMap>
}

export type A11yStateMap = {
  disabled?: boolean
  loading?: boolean
  error?: boolean
  readOnly?: boolean
}

export type ResolvedAriaProps = {
  "aria-disabled"?: boolean
  "aria-busy"?: boolean
  "aria-invalid"?: boolean
  "aria-readonly"?: boolean
  tabIndex?: number
}
