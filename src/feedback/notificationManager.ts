import type { ToastEntry, BannerEntry, NotificationState, NotificationListener, FeedbackVariant } from "./types"

const DEFAULT_TOAST_DURATION = 4000

let state: NotificationState = { toasts: [], banners: [] }
const listeners = new Set<NotificationListener>()

function notify() {
  listeners.forEach((l) => l({ ...state, toasts: [...state.toasts], banners: [...state.banners] }))
}

function generateId() {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const notificationManager = {
  subscribe(listener: NotificationListener): () => void {
    listeners.add(listener)
    listener({ ...state, toasts: [...state.toasts], banners: [...state.banners] })
    return () => listeners.delete(listener)
  },

  addToast(options: {
    title?: string
    description?: string
    variant: FeedbackVariant
    duration?: number
    dismissible?: boolean
  }): string {
    const id = generateId()
    const entry: ToastEntry = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant,
      duration: options.duration ?? DEFAULT_TOAST_DURATION,
      dismissible: options.dismissible ?? true,
      lifecycleState: "entering",
    }
    state = { ...state, toasts: [...state.toasts, entry] }
    notify()

    setTimeout(() => {
      state = {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id ? { ...t, lifecycleState: "visible" } : t
        ),
      }
      notify()
    }, 50)

    setTimeout(() => {
      notificationManager.dismissToast(id)
    }, entry.duration + 50)

    return id
  },

  dismissToast(id: string): void {
    const toast = state.toasts.find((t) => t.id === id)
    if (!toast || toast.lifecycleState === "exiting" || toast.lifecycleState === "removed") return

    state = {
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, lifecycleState: "exiting" } : t
      ),
    }
    notify()

    setTimeout(() => {
      state = { ...state, toasts: state.toasts.filter((t) => t.id !== id) }
      notify()
    }, 300)
  },

  addBanner(options: {
    title: string
    description?: string
    variant: FeedbackVariant
    dismissible?: boolean
  }): string {
    const id = generateId()
    const entry: BannerEntry = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant,
      dismissible: options.dismissible ?? true,
      lifecycleState: "visible",
    }
    state = { ...state, banners: [...state.banners, entry] }
    notify()
    return id
  },

  dismissBanner(id: string): void {
    state = {
      ...state,
      banners: state.banners.map((b) =>
        b.id === id ? { ...b, lifecycleState: "dismissed" } : b
      ),
    }
    notify()

    setTimeout(() => {
      state = { ...state, banners: state.banners.filter((b) => b.id !== id) }
      notify()
    }, 300)
  },

  getState(): NotificationState {
    return { ...state, toasts: [...state.toasts], banners: [...state.banners] }
  },
}
