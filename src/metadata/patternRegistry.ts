import type { UIPattern } from "./types"

const _patternRegistry: Record<string, UIPattern> = {}

export function registerPattern(pattern: UIPattern): void {
  _patternRegistry[pattern.name] = pattern
}

export function getPattern(name: string): UIPattern | undefined {
  return _patternRegistry[name]
}

export function getAllPatterns(): Readonly<Record<string, UIPattern>> {
  return _patternRegistry
}

export function exportPatternsAsJSON(): string {
  return JSON.stringify(_patternRegistry, null, 2)
}

registerPattern({
  name: "AnalyticsKPIRow",
  description: "A horizontal row of KPI metric cards displaying key business indicators. Cards are equal-width and collapse to a 2-column grid at medium breakpoints and a single column at small.",
  structure: [
    "Row (gap: lg, wrap: true)",
    "  Card × N (variant: flat, equal-width)",
    "    Stack",
    "      Text (overline) — metric label",
    "      Heading (level: 2) — metric value",
    "      Row — delta indicator + StatusIndicator",
  ],
  components: ["Row", "Card", "Stack", "Text", "Heading", "StatusIndicator"],
  usage: [
    "Use at the top of dashboard pages to surface key metrics",
    "Limit to 4–6 KPI cards per row for readability",
    "Each card must display exactly one metric value with a label",
  ],
  constraints: [
    "Cards must be equal-width within the row",
    "Maximum 6 cards before wrapping to a second row",
    "Metric value must use Heading, not Text",
    "Do not mix KPI cards with action cards in the same row",
  ],
})

registerPattern({
  name: "SettingsFormLayout",
  description: "A two-column settings page layout with a category sidebar on the left and a sectioned form panel on the right. Collapses to a single column with a tab bar on small screens.",
  structure: [
    "Row (align: start)",
    "  Stack (width: 240px) — category navigation",
    "    Button × N (variant: ghost) — nav items",
    "  Box (flex: 1) — form panel",
    "    Stack (gap: xl)",
    "      Section × N",
    "        Heading (level: 3) — section title",
    "        Divider",
    "        Stack (gap: md)",
    "          Field × N — form inputs",
  ],
  components: ["Row", "Stack", "Button", "Box", "Heading", "Divider", "Field", "Input", "Select", "Checkbox"],
  usage: [
    "Use for multi-section settings or preference pages",
    "Group related fields inside named sections with a Heading and Divider",
    "Use a sticky category nav for pages with more than 4 sections",
  ],
  constraints: [
    "Category nav must use ghost Button variant only",
    "Each section must have a Heading and Divider",
    "All form inputs must be wrapped in Field components",
    "Do not use Card wrappers around individual fields",
  ],
})

registerPattern({
  name: "DashboardHeader",
  description: "Top-of-page header for dashboard views. Contains a page title, optional breadcrumb trail, a description, and a primary action group aligned to the trailing edge.",
  structure: [
    "Row (justify: space-between, align: center)",
    "  Stack (gap: xs)",
    "    Row (gap: xs) — optional breadcrumb",
    "      Text × N (caption) — breadcrumb segments",
    "    Heading (level: 1) — page title",
    "    Text (body) — optional description",
    "  Row (gap: sm) — action group",
    "    Button (variant: secondary) × N — secondary actions",
    "    Button (variant: primary) — primary action",
  ],
  components: ["Row", "Stack", "Heading", "Text", "Button"],
  usage: [
    "Use as the first element inside ContentArea on dashboard-type pages",
    "Always include a primary Heading at level 1",
    "Limit action group to 1 primary and up to 2 secondary buttons",
  ],
  constraints: [
    "Only one primary Button allowed in the action group",
    "Breadcrumb is optional but must use Text caption variant when present",
    "Do not use Card or Surface as the header wrapper",
    "Header must span full content width",
  ],
})

registerPattern({
  name: "DataTableToolbar",
  description: "A toolbar row positioned above a Table component. Contains search input, filter controls, and bulk action buttons. Bulk actions appear only when rows are selected.",
  structure: [
    "Row (justify: space-between, align: center, gap: md)",
    "  Row (gap: sm) — left controls",
    "    Input (type: search, size: sm) — search",
    "    Button × N (variant: ghost, size: sm) — filter toggles",
    "  Row (gap: sm) — right actions",
    "    [conditional] Row — bulk actions (visible when selection > 0)",
    "      Text (caption) — 'N selected'",
    "      Button × N (variant: secondary, size: sm)",
    "    Button (variant: primary, size: sm) — primary table action",
  ],
  components: ["Row", "Input", "Button", "Text"],
  usage: [
    "Position directly above the Table component with no spacing gap between",
    "Show bulk action controls only when table rows are selected",
    "Use sm size for all inputs and buttons in the toolbar",
  ],
  constraints: [
    "Search input must use type: search",
    "All toolbar buttons must use size: sm",
    "Bulk action group must be conditional on selection state",
    "Toolbar must not contain Heading components",
    "Do not place Dropdown menus as the primary action",
  ],
})
