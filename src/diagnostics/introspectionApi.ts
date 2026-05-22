import { useRef } from "react"
import type { IntrospectionSnapshot } from "./types"
import { detectIntrospectionEnvironment, guardIntrospection } from "./environmentGating"

export type IntrospectionConfig = {
  snapshot: IntrospectionSnapshot
}

const emptySnapshot: IntrospectionSnapshot = {
  components: { id: "", type: "", props: {} },
  tokens: { tokens: {} },
  theme: { mode: "light", systemPreference: null, overridden: false },
  validation: { valid: true, issues: [] },
  metadata: { components: {} },
  system: { driftDetected: false, contractViolations: 0, metadataWarnings: 0 },
}

export function getIntrospectionSnapshot(config: IntrospectionConfig): IntrospectionSnapshot {
  const env = detectIntrospectionEnvironment()
  return guardIntrospection(env, () => config.snapshot, emptySnapshot)
}

export function useIntrospection(config: IntrospectionConfig): IntrospectionSnapshot {
  const env = detectIntrospectionEnvironment()
  const snapshotRef = useRef<IntrospectionSnapshot>(
    guardIntrospection(env, () => config.snapshot, emptySnapshot)
  )
  return snapshotRef.current
}
