// overlayStack tracks the currently focused overlay elements
// restoreStack tracks what to restore focus to when each overlay closes
const overlayStack: (HTMLElement | null)[] = []
const restoreStack: (HTMLElement | null)[] = []

function push(el: HTMLElement | null): void {
  const previous = document.activeElement as HTMLElement | null
  restoreStack.push(previous)
  overlayStack.push(el)
  if (el && document.contains(el)) {
    el.focus()
  }
}

function pop(): void {
  if (overlayStack.length === 0) return
  overlayStack.pop()
  const restore = restoreStack.pop() ?? null
  if (restore && document.contains(restore)) {
    restore.focus()
  }
}

function getCurrent(): HTMLElement | null {
  return overlayStack.length > 0 ? overlayStack[overlayStack.length - 1] : null
}

// Returns the element focus will be restored to on the next pop
function peek(): HTMLElement | null {
  return restoreStack.length > 0 ? restoreStack[restoreStack.length - 1] : null
}

export const focusManager = { push, pop, getCurrent, peek }
