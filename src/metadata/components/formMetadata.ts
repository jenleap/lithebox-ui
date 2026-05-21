import type { ComponentMetadata } from "../types"
import { registerComponent } from "../registry"

const Input: ComponentMetadata = {
  name: "Input",
  category: "input",
  description: "Single-line text input field. Supports multiple input types, validation states, and size variants.",
  version: "1.0.0",
  props: {
    type: {
      type: "enum",
      description: "HTML input type",
      enumValues: ["text", "email", "password", "number", "search", "tel", "url"],
      default: "text",
    },
    placeholder: { type: "string", description: "Placeholder text shown when the input is empty" },
    disabled: { type: "boolean", description: "Prevents interaction and applies disabled styling", default: false },
    readOnly: { type: "boolean", description: "Allows focus and text selection but prevents editing", default: false },
    value: { type: "string", description: "Controlled value of the input" },
    onChange: { type: "object", description: "Change handler callback" },
    size: {
      type: "enum",
      description: "Size variant of the input",
      enumValues: ["sm", "md", "lg"],
      default: "md",
    },
  },
  states: ["default", "focus", "disabled", "readOnly", "error", "success"],
  composition: {
    allowedParents: ["Field", "Box", "Stack"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "textbox",
    aria: { required: "false", invalid: "false" },
    keyboardInteractions: ["Tab to focus", "Type to enter value"],
  },
  usage: {
    recommended: [
      "Use inside a Field component to get label and error message support",
      "Use type: search for search inputs to get appropriate browser affordances",
    ],
    discouraged: [
      "Do not use as a standalone input without a visible Label — use Field instead",
      "Do not use for multi-line text — use Textarea instead",
    ],
  },
}

const Textarea: ComponentMetadata = {
  name: "Textarea",
  category: "input",
  description: "Multi-line text input for longer form content such as comments, descriptions, and notes.",
  version: "1.0.0",
  props: {
    placeholder: { type: "string", description: "Placeholder text shown when the textarea is empty" },
    disabled: { type: "boolean", description: "Prevents interaction and applies disabled styling", default: false },
    readOnly: { type: "boolean", description: "Allows focus but prevents editing", default: false },
    rows: { type: "number", description: "Initial visible row count", default: 3 },
    resize: {
      type: "enum",
      description: "Controls user resize behavior",
      enumValues: ["none", "vertical", "both"],
      default: "vertical",
    },
  },
  states: ["default", "focus", "disabled", "readOnly", "error"],
  composition: {
    allowedParents: ["Field", "Box", "Stack"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "textbox",
    aria: { multiline: "true" },
    keyboardInteractions: ["Tab to focus", "Enter for new line"],
  },
}

const Select: ComponentMetadata = {
  name: "Select",
  category: "input",
  description: "Dropdown select input for choosing one or more options from a predefined list.",
  version: "1.0.0",
  props: {
    options: { type: "object", required: true, description: "Array of option objects with value and label" },
    value: { type: "string", description: "Currently selected value (controlled)" },
    placeholder: { type: "string", description: "Placeholder text shown when no option is selected" },
    disabled: { type: "boolean", description: "Prevents interaction", default: false },
    multiple: { type: "boolean", description: "Allows selecting multiple options", default: false },
  },
  states: ["default", "focus", "open", "disabled", "error"],
  composition: {
    allowedParents: ["Field", "Box", "Stack"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "combobox",
    aria: { expanded: "false", haspopup: "listbox" },
    keyboardInteractions: [
      "Space or Enter to open",
      "Arrow keys to navigate options",
      "Escape to close",
      "Enter to select highlighted option",
    ],
  },
}

const Checkbox: ComponentMetadata = {
  name: "Checkbox",
  category: "input",
  description: "Binary toggle input for boolean values. Supports indeterminate state for partial selection in tree or group contexts.",
  version: "1.0.0",
  props: {
    checked: { type: "boolean", description: "Whether the checkbox is checked", default: false },
    indeterminate: { type: "boolean", description: "Renders a partial-selection state (neither checked nor unchecked)", default: false },
    disabled: { type: "boolean", description: "Prevents interaction", default: false },
    label: { type: "string", description: "Visible label text rendered beside the checkbox" },
    value: { type: "string", description: "Value submitted with a form when checked" },
  },
  states: ["default", "checked", "indeterminate", "focus", "disabled", "error"],
  composition: {
    allowedParents: ["Field", "Box", "Stack", "Row"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "checkbox",
    aria: { checked: "false" },
    keyboardInteractions: ["Space to toggle"],
  },
}

const Radio: ComponentMetadata = {
  name: "Radio",
  category: "input",
  description: "Single-selection input within a mutually exclusive group. Must be used inside a named group for correct keyboard behavior.",
  version: "1.0.0",
  props: {
    checked: { type: "boolean", description: "Whether this radio option is selected", default: false },
    disabled: { type: "boolean", description: "Prevents interaction", default: false },
    label: { type: "string", description: "Visible label text rendered beside the radio" },
    value: { type: "string", required: true, description: "Value submitted when this option is selected" },
    name: { type: "string", required: true, description: "Group name that links radios for mutual exclusion" },
  },
  states: ["default", "checked", "focus", "disabled", "error"],
  composition: {
    allowedParents: ["Field", "Box", "Stack", "RadioGroup"],
    allowedChildren: [],
    maxDepth: 0,
  },
  accessibility: {
    role: "radio",
    aria: { checked: "false" },
    keyboardInteractions: ["Arrow keys to select within group"],
  },
  usage: {
    recommended: [
      "Always group Radio inputs inside a Field with a shared label describing the group",
      "Use name prop consistently across all radios in a group",
    ],
    discouraged: [
      "Do not use a single standalone Radio without a group — use Checkbox instead",
    ],
  },
}

const Field: ComponentMetadata = {
  name: "Field",
  category: "input",
  description: "Standard form field wrapper that composes a Label, input control, helper text, and error message into a single accessible unit.",
  version: "1.0.0",
  props: {
    label: { type: "string", required: true, description: "Visible label text for the field" },
    helperText: { type: "string", description: "Secondary instructional text shown below the input" },
    errorText: { type: "string", description: "Validation error message shown below the input when in error state" },
    required: { type: "boolean", description: "Marks the field as required and shows a required indicator", default: false },
    disabled: { type: "boolean", description: "Disables all child inputs", default: false },
  },
  slots: {
    label: {
      description: "Label element for the field",
      allowedComponents: ["Label"],
      required: true,
    },
    input: {
      description: "The input control (one of: Input, Textarea, Select, Checkbox, Radio)",
      allowedComponents: ["Input", "Textarea", "Select", "Checkbox", "Radio"],
      required: true,
    },
    helper: {
      description: "Optional helper or error text rendered below the input",
      allowedComponents: ["HelperText"],
      required: false,
    },
  },
  states: ["default", "error", "disabled", "success"],
  composition: {
    allowedParents: ["Box", "Stack", "Form"],
    allowedChildren: ["Label", "Input", "Textarea", "Select", "Checkbox", "Radio", "HelperText"],
    disallowedChildren: ["Card", "Button", "Heading"],
  },
  accessibility: {
    role: "group",
    aria: { labelledby: "field-label" },
    keyboardInteractions: [],
  },
  usage: {
    recommended: [
      "Use Field as the standard wrapper for all form inputs to ensure accessible labeling",
      "Pass errorText to show validation feedback in the error state",
    ],
    discouraged: [
      "Do not nest Field inside another Field",
      "Do not use Field for non-input content display",
    ],
  },
}

registerComponent(Input)
registerComponent(Textarea)
registerComponent(Select)
registerComponent(Checkbox)
registerComponent(Radio)
registerComponent(Field)
