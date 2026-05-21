import type { ComponentMetadata } from "../types"
import { registerComponent } from "../registry"

const List: ComponentMetadata = {
  name: "List",
  category: "data",
  description: "Vertical list of homogeneous items with token-driven spacing and optional dividers or borders.",
  version: "1.0.0",
  props: {
    variant: {
      type: "enum",
      description: "Visual treatment of the list container",
      enumValues: ["default", "bordered", "divided"],
      default: "default",
    },
    density: {
      type: "enum",
      description: "Vertical spacing density between items",
      enumValues: ["compact", "comfortable"],
      default: "comfortable",
    },
    selectable: { type: "boolean", description: "Enables keyboard navigation and selection interactions", default: false },
  },
  slots: {
    items: {
      description: "Collection of ListItem children",
      allowedComponents: ["ListItem"],
      required: true,
    },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Stack", "Card", "ContentArea"],
    allowedChildren: ["ListItem"],
    disallowedChildren: ["Table", "Card", "Heading"],
  },
  responsive: {
    breakpoints: {
      sm: { density: "compact" },
    },
  },
  accessibility: {
    role: "list",
    keyboardInteractions: ["Arrow keys to navigate when selectable"],
  },
}

const ListItem: ComponentMetadata = {
  name: "ListItem",
  category: "data",
  description: "Single item within a List. Supports leading icon or avatar, primary content, and trailing action or status.",
  version: "1.0.0",
  props: {
    selected: { type: "boolean", description: "Marks this item as selected", default: false },
    disabled: { type: "boolean", description: "Prevents interaction on this item", default: false },
    interactive: { type: "boolean", description: "Enables hover, focus, and click states", default: false },
  },
  slots: {
    leading: { description: "Optional leading element such as an icon or avatar" },
    content: { description: "Primary text content of the item", required: true },
    trailing: { description: "Optional trailing element such as a badge or action button" },
  },
  states: ["default", "selected", "hover", "disabled", "focus"],
  composition: {
    allowedParents: ["List"],
    allowedChildren: ["Text", "Icon", "Button", "Badge"],
    disallowedChildren: ["List", "Table", "Card"],
  },
  accessibility: {
    role: "listitem",
    keyboardInteractions: ["Enter to select if interactive"],
  },
}

const Table: ComponentMetadata = {
  name: "Table",
  category: "data",
  description: "Structured tabular data display with header and body rows. Supports striped rows, sticky header, and row selection.",
  version: "1.0.0",
  props: {
    striped: { type: "boolean", description: "Applies alternating row background colors", default: false },
    bordered: { type: "boolean", description: "Applies border to all cells", default: false },
    density: {
      type: "enum",
      description: "Cell padding density",
      enumValues: ["compact", "comfortable"],
      default: "comfortable",
    },
    stickyHeader: { type: "boolean", description: "Pins the header row during vertical scroll", default: false },
    selectable: { type: "boolean", description: "Enables row selection with checkboxes", default: false },
  },
  slots: {
    header: {
      description: "Header row section containing column labels",
      allowedComponents: ["TableRow"],
      required: true,
    },
    body: {
      description: "Data row section",
      allowedComponents: ["TableRow"],
      required: true,
    },
  },
  states: ["default", "loading", "empty"],
  composition: {
    allowedParents: ["Box", "Stack", "ContentArea", "Card"],
    allowedChildren: ["TableRow"],
    disallowedChildren: ["List", "Card", "Modal"],
  },
  responsive: {
    breakpoints: {
      sm: {},
    },
    behavior: { transform: "Collapses to card/list view at sm via responsive contract" },
  },
  accessibility: {
    role: "table",
    aria: { label: "Data table" },
    keyboardInteractions: ["Arrow keys to navigate cells", "Tab to focus rows"],
  },
}

const TableRow: ComponentMetadata = {
  name: "TableRow",
  category: "data",
  description: "A single row within a Table body or header section.",
  version: "1.0.0",
  props: {
    selected: { type: "boolean", description: "Marks this row as selected", default: false },
    disabled: { type: "boolean", description: "Prevents interaction on this row", default: false },
  },
  states: ["default", "selected", "hover", "disabled"],
  composition: {
    allowedParents: ["Table"],
    allowedChildren: ["TableCell"],
    disallowedChildren: ["TableRow", "List", "Card"],
  },
  accessibility: {
    role: "row",
    keyboardInteractions: ["Enter to select if selectable"],
  },
}

const TableCell: ComponentMetadata = {
  name: "TableCell",
  category: "data",
  description: "A single cell within a TableRow. Renders as a header cell (th) or data cell (td) based on the isHeader prop.",
  version: "1.0.0",
  props: {
    align: {
      type: "enum",
      description: "Horizontal alignment of cell content",
      enumValues: ["left", "center", "right"],
      default: "left",
    },
    isHeader: { type: "boolean", description: "Renders as a th element with column header semantics", default: false },
    truncate: { type: "boolean", description: "Truncates overflowing text with ellipsis", default: false },
    width: { type: "string", description: "Fixed or minimum width of the cell column" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["TableRow"],
    allowedChildren: ["Text", "Badge", "Button", "Icon", "StatusIndicator"],
    disallowedChildren: ["Table", "List", "Card", "Heading"],
    maxDepth: 1,
  },
  accessibility: {
    role: "cell",
  },
}

const Badge: ComponentMetadata = {
  name: "Badge",
  category: "display",
  description: "Short status or count label using semantic color tokens. Used for categorical labels, counts, and status indicators inline with content.",
  version: "1.0.0",
  props: {
    variant: {
      type: "enum",
      description: "Semantic color variant of the badge",
      enumValues: ["default", "success", "warning", "error", "info"],
      default: "default",
    },
    size: {
      type: "enum",
      description: "Size of the badge",
      enumValues: ["sm", "md"],
      default: "md",
    },
    count: { type: "number", description: "Numeric value displayed inside the badge" },
    label: { type: "string", description: "Text label rendered inside the badge" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Row", "TableCell", "ListItem", "Button", "Card"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "status",
    aria: { label: "Badge" },
  },
}

const StatusIndicator: ComponentMetadata = {
  name: "StatusIndicator",
  category: "display",
  description: "Visual indicator dot or icon representing a live or derived status value. Used inline in tables, lists, and cards.",
  version: "1.0.0",
  props: {
    status: {
      type: "enum",
      required: true,
      description: "The status value to display",
      enumValues: ["active", "inactive", "pending", "error", "warning"],
    },
    label: { type: "string", description: "Accessible label describing the status" },
    showLabel: { type: "boolean", description: "Whether to render the label text beside the indicator", default: false },
  },
  states: ["active", "inactive", "pending", "error", "warning"],
  composition: {
    allowedParents: ["Box", "Row", "TableCell", "ListItem", "Card"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "img",
    aria: { label: "Status: active" },
  },
}

const EmptyState: ComponentMetadata = {
  name: "EmptyState",
  category: "display",
  description: "Placeholder displayed when a data collection has no items. Communicates zero-state clearly with an optional icon, message, and call-to-action.",
  version: "1.0.0",
  props: {
    title: { type: "string", required: true, description: "Primary heading of the empty state" },
    description: { type: "string", description: "Secondary explanatory text below the title" },
    icon: { type: "string", description: "Icon name from the design system icon set" },
    action: { type: "object", description: "Optional call-to-action button config" },
  },
  slots: {
    icon: { description: "Optional illustration or icon above the title" },
    action: { description: "Optional primary action button" },
  },
  states: ["default"],
  composition: {
    allowedParents: ["Box", "Stack", "ContentArea", "Card"],
    allowedChildren: ["Heading", "Text", "Button", "Icon"],
    disallowedChildren: ["Table", "List", "Card"],
  },
  accessibility: {
    role: "status",
    screenReaderDescription: "No content available",
  },
  usage: {
    recommended: [
      "Use to replace an empty Table or List body",
      "Always provide a title and optionally a call-to-action to guide next steps",
    ],
    discouraged: [
      "Do not use inside a Table body row — render outside the Table instead",
      "Do not use for loading states — use LoadingState instead",
    ],
  },
}

const LoadingState: ComponentMetadata = {
  name: "LoadingState",
  category: "display",
  description: "Skeleton or spinner placeholder displayed while data is being fetched. Communicates a busy state to users and screen readers.",
  version: "1.0.0",
  props: {
    lines: { type: "number", description: "Number of skeleton lines to render", default: 3 },
    showSpinner: { type: "boolean", description: "Renders a spinner instead of skeleton lines", default: false },
    label: { type: "string", description: "Accessible label announcing the loading activity" },
  },
  states: ["loading"],
  composition: {
    allowedParents: ["Box", "Stack", "ContentArea", "Card", "Table"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "status",
    aria: { live: "polite", busy: "true" },
    screenReaderDescription: "Loading content",
  },
}

registerComponent(List)
registerComponent(ListItem)
registerComponent(Table)
registerComponent(TableRow)
registerComponent(TableCell)
registerComponent(Badge)
registerComponent(StatusIndicator)
registerComponent(EmptyState)
registerComponent(LoadingState)
