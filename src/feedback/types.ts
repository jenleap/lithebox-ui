export type FeedbackVariant = "success" | "error" | "info" | "warning"

export type ToastLifecycleState = "entering" | "visible" | "exiting" | "removed"

export type BannerLifecycleState = "visible" | "dismissed"

export type ToastEntry = {
  id: string
  title?: string
  description?: string
  variant: FeedbackVariant
  duration: number
  dismissible: boolean
  lifecycleState: ToastLifecycleState
}

export type BannerEntry = {
  id: string
  title: string
  description?: string
  variant: FeedbackVariant
  dismissible: boolean
  lifecycleState: BannerLifecycleState
}

export type NotificationState = {
  toasts: ToastEntry[]
  banners: BannerEntry[]
}

export type NotificationListener = (state: NotificationState) => void
