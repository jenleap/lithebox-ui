import type { ComponentMetadata } from "../types"
import { registerComponent } from "../registry"

const AppShell: ComponentMetadata = {
  name: "AppShell",
  category: "navigation",
  description: "Root application layout container. Composes TopBar, Sidebar, and ContentArea into a full-page shell structure.",
  version: "1.0.0",
  props: {
    hasSidebar: { type: "boolean", description: "Whether the shell includes a sidebar region", default: false },
    sidebarPosition: {
      type: "enum",
      description: "Which side the sidebar occupies",
      enumValues: ["left", "right"],
      default: "left",
    },
    sidebarCollapsed: { type: "boolean", description: "Whether the sidebar is in collapsed state", default: false },
  },
  slots: {
    topBar: {
      description: "Top navigation bar region",
      allowedComponents: ["TopBar"],
      required: true,
    },
    sidebar: {
      description: "Optional side navigation panel",
      allowedComponents: ["Sidebar"],
      required: false,
    },
    content: {
      description: "Main content area",
      allowedComponents: ["ContentArea"],
      required: true,
    },
  },
  states: ["default", "sidebarCollapsed"],
  composition: {
    allowedParents: [],
    allowedChildren: ["TopBar", "Sidebar", "ContentArea"],
    disallowedChildren: ["AppShell", "Modal", "Drawer"],
    maxDepth: 1,
  },
  responsive: {
    breakpoints: {
      sm: { sidebarCollapsed: true },
    },
    behavior: { collapse: true, transform: "Sidebar collapses to overlay drawer at sm breakpoint" },
  },
  accessibility: {
    role: "application",
    keyboardInteractions: ["Tab to navigate shell regions"],
  },
  usage: {
    recommended: [
      "Use as the single root layout wrapper for all application pages",
      "Mount ToastContainer inside AppShell for global notification support",
    ],
    discouraged: [
      "Do not nest AppShell inside other page or layout components",
      "Do not render multiple AppShell instances simultaneously",
    ],
  },
}

const TopBar: ComponentMetadata = {
  name: "TopBar",
  category: "navigation",
  description: "Horizontal top-level navigation bar containing brand identity, navigation items, and global actions.",
  version: "1.0.0",
  props: {
    sticky: { type: "boolean", description: "Whether the TopBar sticks to the top of the viewport on scroll", default: true },
    elevation: { type: "enum", description: "Shadow depth applied to the bar", enumValues: ["none", "sm", "md"] },
    height: { type: "string", description: "Token-driven height of the top bar" },
  },
  slots: {
    brand: {
      description: "Brand logo or name area on the leading edge",
      required: true,
    },
    nav: {
      description: "Primary navigation links area",
      required: false,
    },
    actions: {
      description: "Global actions on the trailing edge (user menu, notifications, etc.)",
      required: false,
    },
  },
  states: ["default", "scrolled"],
  composition: {
    allowedParents: ["AppShell"],
    allowedChildren: ["Row", "Button", "Icon", "Text"],
    disallowedChildren: ["AppShell", "Modal", "Drawer", "Card"],
  },
  accessibility: {
    role: "banner",
    aria: { label: "Top navigation" },
    keyboardInteractions: ["Tab to navigate items"],
  },
}

const Sidebar: ComponentMetadata = {
  name: "Sidebar",
  category: "navigation",
  description: "Vertical side navigation panel. Contains navigation links and optional section groupings. Collapses to an overlay on small screens.",
  version: "1.0.0",
  props: {
    collapsed: { type: "boolean", description: "Whether the sidebar is collapsed to icon-only mode", default: false },
    width: { type: "string", description: "Token-driven width of the expanded sidebar" },
    position: {
      type: "enum",
      description: "Which edge of the AppShell the sidebar occupies",
      enumValues: ["left", "right"],
      default: "left",
    },
  },
  slots: {
    header: { description: "Optional top section for logo or workspace switcher" },
    nav: { description: "Primary navigation link list", required: true },
    footer: { description: "Optional bottom section for user profile or settings link" },
  },
  states: ["default", "collapsed", "hovered"],
  composition: {
    allowedParents: ["AppShell"],
    allowedChildren: ["Stack", "Box", "Button", "Text", "Icon", "Divider"],
    disallowedChildren: ["AppShell", "TopBar", "Modal"],
  },
  responsive: {
    breakpoints: {
      sm: { collapsed: true },
    },
    behavior: { collapse: true, transform: "Collapses to full-width overlay drawer at sm breakpoint" },
  },
  accessibility: {
    role: "navigation",
    aria: { label: "Sidebar navigation" },
    keyboardInteractions: ["Tab to navigate links", "Escape to close on mobile"],
  },
}

const ContentArea: ComponentMetadata = {
  name: "ContentArea",
  category: "layout",
  description: "Main content region of the AppShell. Manages scroll context and provides a padded container for page-level content.",
  version: "1.0.0",
  props: {
    padding: { type: "string", description: "Token-driven inner spacing applied to the content region" },
    scrollable: { type: "boolean", description: "Whether the content area scrolls independently of the shell", default: true },
    maxWidth: { type: "string", description: "Optional max-width constraint for content within the area" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["AppShell"],
    allowedChildren: ["Page", "Section", "Box", "Stack", "Container"],
    disallowedChildren: ["AppShell", "TopBar", "Sidebar"],
  },
  responsive: {
    breakpoints: {
      sm: { padding: "sm" },
      md: { padding: "md" },
    },
  },
  accessibility: {
    role: "main",
    aria: { label: "Main content" },
  },
}

const Modal: ComponentMetadata = {
  name: "Modal",
  category: "overlay",
  description: "Blocking overlay dialog for confirmations, forms, or critical messages. Traps focus when open.",
  version: "1.0.0",
  props: {
    open: { type: "boolean", required: true, description: "Controls whether the modal is visible", default: false },
    size: {
      type: "enum",
      description: "Width preset of the modal dialog",
      enumValues: ["sm", "md", "lg", "fullscreen"],
      default: "md",
    },
    dismissible: { type: "boolean", description: "Whether clicking the backdrop or pressing Escape closes the modal", default: true },
    title: { type: "string", description: "Accessible title for the dialog, rendered in the header" },
  },
  slots: {
    header: { description: "Optional title and close button area" },
    body: { description: "Primary content area of the modal", required: true },
    footer: { description: "Optional action buttons area" },
  },
  states: ["open", "closed", "loading"],
  composition: {
    allowedParents: [],
    allowedChildren: ["Stack", "Box", "Button", "Row", "Text", "Heading"],
    disallowedChildren: ["AppShell", "Modal", "Drawer"],
  },
  accessibility: {
    role: "dialog",
    aria: { modal: "true", labelledby: "modal-title" },
    keyboardInteractions: ["Escape to dismiss if dismissible", "Tab cycles focus within modal"],
    focusBehavior: "Focus is trapped inside modal when open; focus returns to trigger on close",
  },
  usage: {
    recommended: [
      "Use for blocking confirmation dialogs and multi-step forms",
      "Use the title prop to ensure the dialog is announced correctly by screen readers",
    ],
    discouraged: [
      "Do not use for non-critical information — use Toast or Banner instead",
      "Do not nest modals inside other modals",
    ],
  },
}

const Drawer: ComponentMetadata = {
  name: "Drawer",
  category: "overlay",
  description: "Slide-in panel overlay from a screen edge. Used for secondary actions, filters, or detail panels that do not require full blocking.",
  version: "1.0.0",
  props: {
    open: { type: "boolean", required: true, description: "Controls whether the drawer is visible", default: false },
    position: {
      type: "enum",
      description: "Edge from which the drawer slides in",
      enumValues: ["left", "right", "bottom"],
      default: "right",
    },
    size: { type: "string", description: "Width (for left/right) or height (for bottom) of the drawer" },
    dismissible: { type: "boolean", description: "Whether clicking outside or pressing Escape closes the drawer", default: true },
  },
  slots: {
    header: { description: "Title and close button area" },
    body: { description: "Primary content area of the drawer", required: true },
    footer: { description: "Optional action buttons area" },
  },
  states: ["open", "closed"],
  composition: {
    allowedParents: [],
    allowedChildren: ["Stack", "Box", "Button", "Row", "Text"],
    disallowedChildren: ["AppShell", "Modal"],
  },
  accessibility: {
    role: "dialog",
    aria: { modal: "false" },
    keyboardInteractions: ["Escape to close", "Tab cycles within drawer"],
    focusBehavior: "Focus is trapped inside drawer when open",
  },
}

const Dropdown: ComponentMetadata = {
  name: "Dropdown",
  category: "overlay",
  description: "Positioned floating panel anchored to a trigger element. Used for context menus and option lists.",
  version: "1.0.0",
  props: {
    open: { type: "boolean", description: "Controls whether the dropdown panel is visible", default: false },
    placement: {
      type: "enum",
      description: "Preferred position of the panel relative to the trigger",
      enumValues: ["bottom", "top", "left", "right", "bottom-start", "bottom-end"],
      default: "bottom-start",
    },
    trigger: { type: "object", description: "The trigger element that anchors the dropdown" },
  },
  slots: {
    trigger: { description: "The element that opens the dropdown on interaction", required: true },
    content: { description: "The floating panel content (menu items, options, etc.)", required: true },
  },
  states: ["open", "closed"],
  composition: {
    allowedParents: ["Box", "Row", "Stack", "TopBar", "Card"],
    allowedChildren: ["Box", "Stack", "Button", "Text"],
    disallowedChildren: ["AppShell", "Modal", "Drawer"],
  },
  accessibility: {
    role: "menu",
    aria: { haspopup: "true", expanded: "false" },
    keyboardInteractions: [
      "Escape to close",
      "Arrow keys to navigate menu items",
      "Enter to select highlighted item",
    ],
    focusBehavior: "Focus moves to first menu item on open",
  },
}

registerComponent(AppShell)
registerComponent(TopBar)
registerComponent(Sidebar)
registerComponent(ContentArea)
registerComponent(Modal)
registerComponent(Drawer)
registerComponent(Dropdown)
