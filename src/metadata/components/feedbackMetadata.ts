import type { ComponentMetadata } from "../types"
import { registerComponent } from "../registry"

const Toast: ComponentMetadata = {
  name: "Toast",
  category: "feedback",
  description: "Ephemeral notification message that auto-dismisses after a timeout. Used for transient feedback that does not require user action.",
  version: "1.0.0",
  props: {
    variant: {
      type: "enum",
      required: true,
      description: "Semantic color variant of the toast",
      enumValues: ["default", "success", "warning", "error", "info"],
    },
    message: { type: "string", required: true, description: "Primary text content of the toast" },
    duration: {
      type: "number",
      description: "Auto-dismiss duration in milliseconds",
      default: 4000,
    },
    dismissible: { type: "boolean", description: "Whether the user can manually close the toast", default: true },
    action: { type: "object", description: "Optional action button rendered inside the toast" },
  },
  states: ["default", "success", "warning", "error", "info", "dismissing"],
  composition: {
    allowedParents: ["ToastContainer"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "alert",
    aria: { live: "polite", atomic: "true" },
    screenReaderDescription: "Live region announcement on mount",
  },
  usage: {
    recommended: [
      "Use for non-blocking status feedback such as save confirmations and copy actions",
      "Use the error variant for recoverable errors that don't block the workflow",
    ],
    discouraged: [
      "Do not use for critical errors requiring user action — use Modal or Banner instead",
      "Do not render Toast directly — use the useToast hook via ToastContainer",
    ],
  },
}

const ToastContainer: ComponentMetadata = {
  name: "ToastContainer",
  category: "feedback",
  description: "Viewport-anchored container that stacks and manages Toast positioning and lifecycle. Should be rendered once at the application root.",
  version: "1.0.0",
  props: {
    position: {
      type: "enum",
      description: "Corner or edge of the viewport where toasts appear",
      enumValues: ["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"],
      default: "bottom-right",
    },
    maxToasts: {
      type: "number",
      description: "Maximum number of toasts visible simultaneously before oldest is dismissed",
      default: 5,
    },
  },
  states: ["default", "hasToasts"],
  composition: {
    allowedParents: ["AppShell", "Box"],
    allowedChildren: ["Toast"],
    disallowedChildren: ["Modal", "Drawer", "Banner", "Card"],
  },
  accessibility: {
    role: "region",
    aria: { live: "polite", label: "Notifications" },
  },
  usage: {
    recommended: [
      "Mount once at the application root inside AppShell",
      "Use the useToast hook to imperatively trigger toasts from anywhere in the tree",
    ],
    discouraged: [
      "Do not render multiple ToastContainer instances simultaneously",
      "Do not add Toast children directly — use the hook API instead",
    ],
  },
}

const Banner: ComponentMetadata = {
  name: "Banner",
  category: "feedback",
  description: "Persistent inline feedback message anchored to a page region. Used for warnings, alerts, or informational messages that require user awareness.",
  version: "1.0.0",
  props: {
    variant: {
      type: "enum",
      required: true,
      description: "Semantic color and icon variant of the banner",
      enumValues: ["info", "success", "warning", "error"],
    },
    title: { type: "string", description: "Optional bold heading above the message" },
    message: { type: "string", required: true, description: "Primary message content" },
    dismissible: { type: "boolean", description: "Whether the user can close the banner", default: false },
    action: { type: "object", description: "Optional call-to-action rendered inside the banner" },
    icon: { type: "boolean", description: "Whether to render the semantic icon beside the message", default: true },
  },
  slots: {
    icon: { description: "Optional override for the default semantic icon" },
    action: { description: "Optional action button rendered inside the banner" },
  },
  states: ["info", "success", "warning", "error", "dismissed"],
  composition: {
    allowedParents: ["Box", "Stack", "ContentArea", "Page", "Section"],
    allowedChildren: ["Text", "Button", "Icon"],
    disallowedChildren: ["Card", "Modal", "Toast", "ToastContainer", "Heading"],
  },
  accessibility: {
    role: "alert",
    aria: { live: "assertive" },
    keyboardInteractions: ["Escape to dismiss if dismissible"],
    screenReaderDescription: "Role is alert for error/warning variants and status for info/success variants",
  },
  usage: {
    recommended: [
      "Use for page-level warnings or persistent system status messages",
      "Place at the top of the ContentArea or Section it applies to",
    ],
    discouraged: [
      "Do not use for transient notifications — use Toast instead",
      "Do not render inside Table cells or ListItems",
    ],
  },
}

registerComponent(Toast)
registerComponent(ToastContainer)
registerComponent(Banner)
