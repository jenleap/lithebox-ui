import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LitheboxProvider } from 'lithebox-ui'
import AppRoutes from './routes'

export default function App() {
  return (
    <LitheboxProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LitheboxProvider>
  )
}
