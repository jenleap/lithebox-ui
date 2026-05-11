function tokenPathToCSSVar(path: string): string {
  if (path === "typography.fontFamily") return "font-family"
  if (path.startsWith("typography.size.")) return `font-size-${path.slice("typography.size.".length)}`
  if (path.startsWith("typography.weight.")) return `font-weight-${path.slice("typography.weight.".length)}`
  return path.replace(/\./g, "-")
}

export function resolveSlot(slot: string): string {
  if (slot === "transparent" || slot === "none") return slot
  if (slot.includes(" ")) return slot.split(" ").map(resolveSlot).join(" ")
  return `var(--${tokenPathToCSSVar(slot)})`
}
