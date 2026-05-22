import type { CompatibilityReport, CompatibilityIssue } from "./types"

export type PropSnapshot = {
  name: string
  required: boolean
}

export type ContractSnapshot = {
  props: PropSnapshot[]
  slots: string[]
  allowedChildren: string[]
}

export function validateContractCompatibility(
  previous: ContractSnapshot,
  current: ContractSnapshot
): CompatibilityReport {
  const issues: CompatibilityIssue[] = []

  const currentPropMap = new Map(current.props.map((p) => [p.name, p]))
  for (const prev of previous.props) {
    const curr = currentPropMap.get(prev.name)
    if (!curr) {
      issues.push({
        code: "LBX_CONTRACT_PROP_REMOVED",
        severity: "error",
        message: `Prop "${prev.name}" was removed. This is a breaking change.`,
        layer: "contracts",
      })
    }
  }

  const previousPropNames = new Set(previous.props.map((p) => p.name))
  for (const curr of current.props) {
    if (!previousPropNames.has(curr.name) && curr.required) {
      issues.push({
        code: "LBX_CONTRACT_PROP_REQUIRED_ADDED",
        severity: "error",
        message: `Prop "${curr.name}" was added as required. This is a breaking change.`,
        layer: "contracts",
      })
    }
  }

  const currentSlots = new Set(current.slots)
  for (const slot of previous.slots) {
    if (!currentSlots.has(slot)) {
      issues.push({
        code: "LBX_CONTRACT_SLOT_REMOVED",
        severity: "error",
        message: `Slot "${slot}" was removed. This is a breaking change.`,
        layer: "contracts",
      })
    }
  }

  const currentChildren = new Set(current.allowedChildren)
  for (const child of previous.allowedChildren) {
    if (!currentChildren.has(child)) {
      issues.push({
        code: "LBX_CONTRACT_CHILD_REMOVED",
        severity: "error",
        message: `Allowed child "${child}" was removed. This is a breaking change.`,
        layer: "contracts",
      })
    }
  }

  const errors = issues.filter((i) => i.severity === "error")
  return { compatible: errors.length === 0, issues }
}
