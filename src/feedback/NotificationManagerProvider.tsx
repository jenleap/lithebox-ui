import React from "react"
import { ToastContainer } from "../components/ToastContainer"
import { BannerContainer } from "../components/BannerContainer"

type NotificationManagerProviderProps = {
  children: React.ReactNode
}

export function NotificationManagerProvider({ children }: NotificationManagerProviderProps) {
  return (
    <>
      {children}
      <BannerContainer />
      <ToastContainer />
    </>
  )
}
