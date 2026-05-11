export let STRICT_MODE = false

export function validateVariant<T extends Record<string, unknown>>(
  slots: T,
  dimension: string,
  value: string | undefined,
  componentName: string
): void {
  if (process.env.NODE_ENV === "production") return
  if (value === undefined) return

  if (!(value in slots)) {
    const allowed = Object.keys(slots).join(", ")
    const message = `[Lithebox] Invalid "${value}" for "${dimension}" in ${componentName}. Allowed: ${allowed}`
    if (STRICT_MODE) throw new Error(message)
    console.warn(message)
  }
}
