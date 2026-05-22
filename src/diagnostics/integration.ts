import type { IntrospectionSnapshot } from "./types"
import type { ComponentTreeInput } from "./componentTree"
import type { RawTokenInput } from "./tokenResolution"
import type { ThemeIntrospectionInput } from "./themeIntrospection"
import type { SystemHealthInput } from "./systemHealth"
import type { ComponentMetadata } from "../metadata/types"
import type { ValidationResult } from "../validation/types"

import { buildComponentTreeSnapshot } from "./componentTree"
import { buildTokenResolutionSnapshot } from "./tokenResolution"
import { buildThemeSnapshot } from "./themeIntrospection"
import { buildValidationSnapshot } from "./validationIntrospection"
import { buildMetadataSnapshot } from "./metadataIntrospection"
import { buildSystemHealthSnapshot } from "./systemHealth"

export type DiagnosticsInput = {
  componentTree: ComponentTreeInput
  tokens: RawTokenInput[]
  theme: ThemeIntrospectionInput
  validation: ValidationResult
  metadataRegistry: Record<string, ComponentMetadata>
  systemHealth: SystemHealthInput
}

export function buildFullIntrospectionSnapshot(
  input: DiagnosticsInput
): IntrospectionSnapshot {
  return {
    components: buildComponentTreeSnapshot(input.componentTree),
    tokens: buildTokenResolutionSnapshot(input.tokens),
    theme: buildThemeSnapshot(input.theme),
    validation: buildValidationSnapshot(input.validation),
    metadata: buildMetadataSnapshot(input.metadataRegistry),
    system: buildSystemHealthSnapshot(input.systemHealth),
  }
}
