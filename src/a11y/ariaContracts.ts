import type { AriaContract } from "./types"

export const ButtonA11yContract: AriaContract = {
  role: "button",
  attributes: {
    "aria-disabled": "disabled",
    "aria-pressed": "toggleState",
  },
} as const

export const ModalA11yContract: AriaContract = {
  role: "dialog",
  attributes: {
    "aria-modal": "true",
  },
} as const

export const DrawerA11yContract: AriaContract = {
  role: "dialog",
  attributes: {
    "aria-modal": "true",
  },
} as const

export const DropdownA11yContract: AriaContract = {
  role: "menu",
  attributes: {
    "aria-expanded": "open",
  },
} as const

export const InputA11yContract: AriaContract = {
  role: "textbox",
  attributes: {
    "aria-invalid": "error",
    "aria-required": "required",
    "aria-readonly": "readOnly",
  },
} as const

export const CheckboxA11yContract: AriaContract = {
  role: "checkbox",
  attributes: {
    "aria-checked": "checked",
    "aria-disabled": "disabled",
  },
} as const

export const RadioA11yContract: AriaContract = {
  role: "radio",
  attributes: {
    "aria-checked": "checked",
    "aria-disabled": "disabled",
  },
} as const

export const SelectA11yContract: AriaContract = {
  role: "combobox",
  attributes: {
    "aria-expanded": "open",
    "aria-required": "required",
  },
} as const

export const SidebarA11yContract: AriaContract = {
  role: "navigation",
  attributes: {},
} as const

export const ListA11yContract: AriaContract = {
  role: "list",
  attributes: {},
} as const

export const TableA11yContract: AriaContract = {
  role: "grid",
  attributes: {},
} as const

export const BannerA11yContract: AriaContract = {
  role: "alert",
  attributes: {},
} as const

export const ToastA11yContract: AriaContract = {
  role: "status",
  attributes: {
    "aria-live": "polite",
    "aria-atomic": "true",
  },
} as const

export const PageA11yContract: AriaContract = {
  role: "main",
  attributes: {},
} as const

export const TooltipA11yContract: AriaContract = {
  role: "tooltip",
  attributes: {},
} as const

export const ContextMenuA11yContract: AriaContract = {
  role: "menu",
  attributes: {
    "aria-orientation": "vertical",
  },
} as const
