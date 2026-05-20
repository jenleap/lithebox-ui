import { focusManager } from "./focusManager"

export function useFocusManager() {
  return {
    push: focusManager.push,
    pop: focusManager.pop,
    getCurrent: focusManager.getCurrent,
  }
}
