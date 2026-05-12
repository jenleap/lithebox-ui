import { notificationManager } from "./notificationManager"

export function useToast() {
  return {
    success(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
      return notificationManager.addToast({ variant: "success", title, ...options })
    },
    error(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
      return notificationManager.addToast({ variant: "error", title, ...options })
    },
    info(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
      return notificationManager.addToast({ variant: "info", title, ...options })
    },
    warning(title: string, options?: { description?: string; duration?: number; dismissible?: boolean }) {
      return notificationManager.addToast({ variant: "warning", title, ...options })
    },
    dismiss(id: string) {
      notificationManager.dismissToast(id)
    },
  }
}
