import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LitheboxProvider } from 'lithebox-ui'
import { TokenEditorProvider, useTokenEditor } from './token-editor/TokenEditorContext'
import { TokenEditorPanel } from './token-editor/TokenEditorPanel'
import AppRoutes from './routes'

function AppContent() {
  const { tokens } = useTokenEditor()
  return (
    <>
      <LitheboxProvider tokens={tokens}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LitheboxProvider>
      <TokenEditorPanel />
    </>
  )
}

export default function App() {
  return (
    <TokenEditorProvider>
      <AppContent />
    </TokenEditorProvider>
  )
}
