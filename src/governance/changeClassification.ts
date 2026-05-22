import type { ChangeClassification, SystemChange } from "./types"

export type ClassificationRule = {
  id: string
  description: string
  applies: (change: SystemChange) => boolean
  classification: ChangeClassification
}

const _classificationRules: ClassificationRule[] = []

export function registerClassificationRule(rule: ClassificationRule): void {
  _classificationRules.push(rule)
}

export function getClassificationRules(): readonly ClassificationRule[] {
  return _classificationRules
}

export function classifyChange(change: SystemChange): ChangeClassification {
  const matched: ChangeClassification[] = []
  for (const rule of _classificationRules) {
    if (rule.applies(change)) {
      matched.push(rule.classification)
    }
  }
  if (matched.includes("breaking")) return "breaking"
  if (matched.includes("sensitive")) return "sensitive"
  return "safe"
}

export function classifyChanges(changes: SystemChange[]): Map<string, ChangeClassification> {
  const result = new Map<string, ChangeClassification>()
  for (const change of changes) {
    result.set(change.id, classifyChange(change))
  }
  return result
}

export function clearClassificationRules(): void {
  _classificationRules.length = 0
}

export function registerDefaultClassificationRules(): void {
  registerClassificationRule({
    id: "breaking-token-removal",
    description: "Removing a token is a breaking change",
    applies: change => change.scope === "token" && change.description.startsWith("remove"),
    classification: "breaking",
  })
  registerClassificationRule({
    id: "breaking-contract-prop-removal",
    description: "Removing a contract prop is a breaking change",
    applies: change => change.scope === "contract" && change.description.startsWith("remove"),
    classification: "breaking",
  })
  registerClassificationRule({
    id: "sensitive-metadata-update",
    description: "Updating metadata is a sensitive change",
    applies: change => change.scope === "metadata" && change.description.startsWith("update"),
    classification: "sensitive",
  })
}
