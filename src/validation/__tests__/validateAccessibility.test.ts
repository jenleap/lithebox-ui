import { describe, it, expect } from "vitest"
import { validateAccessibility } from "../validateAccessibility"
import {
  LBX_ACCESSIBILITY_MISSING_ARIA,
  LBX_ACCESSIBILITY_FOCUS_REQUIRED,
  LBX_ACCESSIBILITY_KEYBOARD_REQUIRED,
  LBX_ACCESSIBILITY_ROLE_INVALID,
} from "../errorCodes"

const rules = [
  {
    component: "Dialog",
    requiredAriaAttributes: [{ attribute: "aria-label", condition: "always" as const }],
    requiresFocusTrap: true,
    requiredKeyboardInteractions: ["Escape"],
    allowedRoles: ["dialog", "alertdialog"],
  },
]

describe("validateAccessibility", () => {
  it("errors on missing ARIA attribute", () => {
    const tree = { component: "Dialog", props: {} }
    const result = validateAccessibility(tree, rules)
    expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_MISSING_ARIA)).toBe(true)
  })

  it("errors on missing focus trap", () => {
    const tree = { component: "Dialog", props: { "aria-label": "My dialog" } }
    const result = validateAccessibility(tree, rules)
    expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_FOCUS_REQUIRED)).toBe(true)
  })

  it("errors on missing keyboard interaction", () => {
    const tree = {
      component: "Dialog",
      props: { "aria-label": "x", "data-focus-trap": true },
    }
    const result = validateAccessibility(tree, rules)
    expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_KEYBOARD_REQUIRED)).toBe(true)
  })

  it("errors on invalid role", () => {
    const tree = {
      component: "Dialog",
      props: {
        "aria-label": "x",
        "data-focus-trap": true,
        "data-keyboard-interactions": ["Escape"],
      },
      role: "tooltip",
    }
    const result = validateAccessibility(tree, rules)
    expect(result.errors.some((e) => e.code === LBX_ACCESSIBILITY_ROLE_INVALID)).toBe(true)
  })

  it("valid when all requirements met", () => {
    const tree = {
      component: "Dialog",
      props: {
        "aria-label": "x",
        "data-focus-trap": true,
        "data-keyboard-interactions": ["Escape"],
      },
      role: "dialog",
    }
    expect(validateAccessibility(tree, rules).valid).toBe(true)
  })

  it("skips when-interactive ARIA rule for non-interactive nodes", () => {
    const interactiveRules = [
      {
        component: "Icon",
        requiredAriaAttributes: [{ attribute: "aria-label", condition: "when-interactive" as const }],
      },
    ]
    const tree = { component: "Icon", props: {}, isInteractive: false }
    expect(validateAccessibility(tree, interactiveRules).valid).toBe(true)
  })

  it("no-ops for components with no rules", () => {
    const tree = { component: "Box", props: {} }
    expect(validateAccessibility(tree, rules).valid).toBe(true)
  })
})
