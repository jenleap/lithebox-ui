import type { ComponentMetadata } from "../types"
import { registerComponent } from "../registry"

const Text: ComponentMetadata = {
  name: "Text",
  category: "display",
  description: "Renders inline or block text content using design token typography. The base component for all body copy, captions, and overline text.",
  version: "1.0.0",
  props: {
    size: { type: "string", description: "Typography size token (xs, sm, md, lg)" },
    weight: { type: "string", description: "Font weight token (regular, medium, semibold, bold)" },
    color: { type: "string", description: "Semantic color token applied to text" },
    align: { type: "enum", description: "Text alignment", enumValues: ["left", "center", "right"] },
    truncate: { type: "boolean", description: "Whether to truncate overflowing text with ellipsis", default: false },
  },
  variants: {
    body: { description: "Standard paragraph body text at default size and weight" },
    caption: { description: "Smaller, muted text for secondary information and metadata" },
    overline: { description: "Uppercase, spaced text used for section labels and categories" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Stack", "Row", "Card", "Surface"],
    disallowedChildren: ["Heading", "Button"],
  },
  accessibility: {
    role: "paragraph",
    screenReaderDescription: "Renders inline text content",
  },
}

const Heading: ComponentMetadata = {
  name: "Heading",
  category: "display",
  description: "Semantic heading element mapping to h1–h6. Uses design token typography scale to control size and weight independently of semantic level.",
  version: "1.0.0",
  props: {
    level: {
      type: "enum",
      required: true,
      description: "Semantic heading level that maps to the HTML h element",
      enumValues: ["1", "2", "3", "4", "5", "6"],
    },
    size: { type: "string", description: "Visual size token, independent of semantic level" },
    weight: { type: "string", description: "Font weight token" },
    color: { type: "string", description: "Semantic color token applied to heading text" },
  },
  variants: {
    h1: { description: "Display-scale heading for page titles", props: { level: "1" } },
    h2: { description: "Section-level heading", props: { level: "2" } },
    h3: { description: "Sub-section heading", props: { level: "3" } },
    h4: { description: "Card or panel heading", props: { level: "4" } },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Stack", "Card", "Surface", "Page", "Section"],
    disallowedChildren: ["Heading", "Button", "Card"],
  },
  accessibility: {
    role: "heading",
    aria: { level: "1" },
    keyboardInteractions: [],
  },
}

const Label: ComponentMetadata = {
  name: "Label",
  category: "input",
  description: "Accessible form label element associated with an input via htmlFor. Renders required indicator when marked required.",
  version: "1.0.0",
  props: {
    htmlFor: { type: "string", required: true, description: "ID of the associated input element" },
    required: { type: "boolean", description: "Displays a required indicator asterisk when true", default: false },
    size: { type: "enum", description: "Label size variant", enumValues: ["sm", "md", "lg"] },
  },
  states: ["default", "error"],
  composition: {
    allowedParents: ["Field", "Box", "Stack"],
    disallowedChildren: ["Button", "Card"],
  },
  accessibility: {
    role: "label",
    focusBehavior: "Transfers focus to associated input on click",
  },
}

const Card: ComponentMetadata = {
  name: "Card",
  category: "display",
  description: "Surface container for grouping related content. Supports optional interactivity, selection state, and structured header/body/footer slots.",
  version: "1.0.0",
  props: {
    padding: { type: "string", description: "Token-driven inner spacing", default: "md" },
    elevation: { type: "enum", description: "Shadow depth level", enumValues: ["none", "sm", "md", "lg"] },
    interactive: { type: "boolean", description: "Enables hover, focus, and active states for clickable cards", default: false },
    selected: { type: "boolean", description: "Marks the card as selected", default: false },
  },
  variants: {
    default: { description: "Standard card with default elevation" },
    elevated: { description: "Card with increased shadow for prominent content", props: { elevation: "md" } },
    flat: { description: "Card with no shadow, border-based separation", props: { elevation: "none" } },
  },
  slots: {
    header: { description: "Optional top area for title, actions, or metadata" },
    body: { description: "Primary content area of the card", required: true },
    footer: { description: "Optional bottom area for actions or supplementary info" },
  },
  states: ["default", "hover", "focus", "active", "disabled", "selected"],
  composition: {
    allowedParents: ["Box", "Stack", "Row", "Grid"],
    allowedChildren: ["Text", "Heading", "Button", "Stack", "Row", "Box", "Surface", "Divider"],
  },
  responsive: {
    breakpoints: {
      sm: { padding: "sm", elevation: "none" },
      md: { padding: "md" },
    },
    behavior: { collapse: false },
  },
  accessibility: {
    role: "article",
    keyboardInteractions: ["Enter to activate if interactive"],
  },
}

const Surface: ComponentMetadata = {
  name: "Surface",
  category: "display",
  description: "Semantic background surface for grouping non-interactive content. Applies elevation and radius from tokens without card-level semantics.",
  version: "1.0.0",
  props: {
    elevation: { type: "enum", description: "Shadow depth level", enumValues: ["none", "sm", "md", "lg"] },
    padding: { type: "string", description: "Token-driven inner spacing" },
    borderRadius: { type: "string", description: "Border radius token" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Stack", "Card"],
    allowedChildren: ["Text", "Heading", "Box", "Stack", "Row"],
  },
  accessibility: {},
}

const Divider: ComponentMetadata = {
  name: "Divider",
  category: "display",
  description: "Visual separator between content sections. Renders as a horizontal or vertical rule using token-defined color and spacing.",
  version: "1.0.0",
  props: {
    orientation: {
      type: "enum",
      description: "Direction of the divider line",
      enumValues: ["horizontal", "vertical"],
      default: "horizontal",
    },
    spacing: { type: "string", description: "Token-driven margin applied above and below the divider" },
    color: { type: "string", description: "Semantic color token for the divider line" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Stack", "Card"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "separator",
    aria: { orientation: "horizontal" },
  },
}

const Button: ComponentMetadata = {
  name: "Button",
  category: "input",
  description: "Interactive action trigger. Supports multiple visual variants, sizes, loading state, and optional leading/trailing icons.",
  version: "1.0.0",
  props: {
    variant: {
      type: "enum",
      required: true,
      description: "Visual style variant of the button",
      enumValues: ["primary", "secondary", "ghost", "danger"],
      default: "primary",
    },
    size: {
      type: "enum",
      description: "Size of the button",
      enumValues: ["sm", "md", "lg"],
      default: "md",
    },
    disabled: { type: "boolean", description: "Prevents interaction and applies disabled styling", default: false },
    loading: { type: "boolean", description: "Shows a loading spinner and prevents interaction", default: false },
    iconLeft: { type: "string", description: "Icon name rendered to the left of the label" },
    iconRight: { type: "string", description: "Icon name rendered to the right of the label" },
    fullWidth: { type: "boolean", description: "Stretches button to fill its container width", default: false },
  },
  variants: {
    primary: { description: "High-emphasis action button using brand color" },
    secondary: { description: "Medium-emphasis button with border treatment" },
    ghost: { description: "Low-emphasis button with no background or border" },
    danger: { description: "Destructive action button using error semantic color" },
  },
  states: ["default", "hover", "focus", "active", "disabled", "loading"],
  composition: {
    allowedParents: ["Box", "Row", "Stack", "Card", "TopBar", "ActionGroup"],
    disallowedChildren: ["Button", "Card", "Heading"],
  },
  accessibility: {
    role: "button",
    keyboardInteractions: ["Enter to activate", "Space to activate"],
    focusBehavior: "Receives focus on Tab",
  },
}

const Icon: ComponentMetadata = {
  name: "Icon",
  category: "display",
  description: "Renders a named icon from the design system icon set at a token-defined size. Use the label prop for accessible icons.",
  version: "1.0.0",
  props: {
    name: { type: "string", required: true, description: "Icon identifier from the design system icon set" },
    size: {
      type: "enum",
      description: "Token-driven icon size",
      enumValues: ["xs", "sm", "md", "lg"],
      default: "md",
    },
    color: { type: "string", description: "Semantic color token applied to the icon" },
    label: { type: "string", description: "Accessible label for the icon when not purely decorative" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Button", "Box", "Row", "Text"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "img",
    aria: { hidden: "true" },
    screenReaderDescription: "Use label prop for accessible icons; aria-hidden is applied when label is absent",
  },
}

registerComponent(Text)
registerComponent(Heading)
registerComponent(Label)
registerComponent(Card)
registerComponent(Surface)
registerComponent(Divider)
registerComponent(Button)
registerComponent(Icon)
