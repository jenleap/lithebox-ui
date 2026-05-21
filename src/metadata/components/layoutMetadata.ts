import type { ComponentMetadata } from "../types"
import { registerComponent } from "../registry"

// allowedChildren: [] means no restriction — any child is valid for layout primitives

const Box: ComponentMetadata = {
  name: "Box",
  category: "layout",
  description: "Base primitive layout element. A generic container that maps directly to a div with token-driven spacing and display props.",
  version: "1.0.0",
  props: {
    padding: { type: "string", description: "Token-driven inner spacing applied to all sides" },
    margin: { type: "string", description: "Token-driven outer spacing applied to all sides" },
    display: { type: "string", description: "CSS display value (block, flex, grid, inline-flex, etc.)" },
    flexDirection: { type: "string", description: "Flex direction when display is flex or inline-flex" },
    gap: { type: "string", description: "Token-driven gap between flex or grid children" },
    width: { type: "string", description: "Width of the box, accepts token or CSS value" },
    height: { type: "string", description: "Height of the box, accepts token or CSS value" },
  },
  composition: {
    allowedChildren: [],
    allowedParents: [],
  },
  responsive: {
    breakpoints: {
      sm: { padding: "sm", gap: "sm" },
      md: { padding: "md", gap: "md" },
    },
    behavior: { collapse: false },
  },
  usage: {
    recommended: [
      "Use as a generic wrapper when no semantic layout component fits",
      "Use for single-dimension spacing and display adjustments",
    ],
    discouraged: [
      "Do not use Box as a replacement for Stack or Row when directionality is clear",
      "Do not use Box for complex multi-column layouts — use a grid approach instead",
    ],
  },
}

const Stack: ComponentMetadata = {
  name: "Stack",
  category: "layout",
  description: "Vertical stack layout. Distributes children in a column with uniform gap spacing derived from tokens.",
  version: "1.0.0",
  props: {
    gap: { type: "string", description: "Token-driven vertical spacing between children" },
    align: { type: "string", description: "Cross-axis alignment of children (flex align-items)" },
    justify: { type: "string", description: "Main-axis alignment of children (flex justify-content)" },
    padding: { type: "string", description: "Token-driven inner spacing applied to all sides" },
  },
  composition: {
    allowedChildren: [],
    allowedParents: [],
  },
  responsive: {
    breakpoints: {
      sm: { gap: "sm" },
      md: { gap: "md" },
    },
    behavior: { collapse: true },
  },
  usage: {
    recommended: [
      "Use for vertical sequences of content blocks",
      "Use for form fields stacked vertically",
      "Use inside Card body and page sections",
    ],
    discouraged: [
      "Do not use for horizontal layouts — use Row instead",
      "Do not nest Stack inside Stack unnecessarily — compose with Box when spacing differs",
    ],
  },
}

const Row: ComponentMetadata = {
  name: "Row",
  category: "layout",
  description: "Horizontal row layout. Distributes children in a row with optional wrapping and token-driven gap.",
  version: "1.0.0",
  props: {
    gap: { type: "string", description: "Token-driven horizontal spacing between children" },
    align: { type: "string", description: "Cross-axis alignment of children (flex align-items)" },
    justify: { type: "string", description: "Main-axis alignment of children (flex justify-content)" },
    wrap: { type: "boolean", description: "Whether children wrap to the next line when overflow occurs", default: false },
    padding: { type: "string", description: "Token-driven inner spacing applied to all sides" },
  },
  composition: {
    allowedChildren: [],
    allowedParents: [],
  },
  responsive: {
    breakpoints: {
      sm: { gap: "sm" },
    },
    behavior: { collapse: true, transform: "Wraps to column direction at sm breakpoint" },
  },
  usage: {
    recommended: [
      "Use for horizontal groupings of UI elements",
      "Use for action bars and button groups",
      "Use for label + input inline layouts",
    ],
    discouraged: [
      "Do not use for complex grid layouts with many columns",
      "Do not use when vertical stacking is the clear intent — use Stack",
    ],
  },
}

const Container: ComponentMetadata = {
  name: "Container",
  category: "layout",
  description: "Page-level content width constraint. Centers content and applies max-width from tokens.",
  version: "1.0.0",
  props: {
    maxWidth: { type: "string", description: "Maximum width constraint sourced from design tokens" },
    padding: { type: "string", description: "Horizontal padding applied at each side of the container" },
    center: { type: "boolean", description: "Whether to center the container horizontally", default: true },
  },
  composition: {
    allowedChildren: [],
    allowedParents: [],
    disallowedChildren: ["Container"],
  },
  responsive: {
    breakpoints: {
      sm: { padding: "sm" },
      md: { padding: "md" },
    },
    behavior: { collapse: false },
  },
  usage: {
    recommended: [
      "Use as the outermost content width wrapper on page layouts",
      "Use inside ContentArea to constrain reading width",
    ],
    discouraged: [
      "Do not nest Container inside another Container",
      "Do not use inside Card or Surface — those have their own padding contracts",
    ],
  },
}

registerComponent(Box)
registerComponent(Stack)
registerComponent(Row)
registerComponent(Container)
