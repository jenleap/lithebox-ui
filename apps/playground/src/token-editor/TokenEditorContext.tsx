import React, { createContext, useContext, useState } from 'react'
import type { Tokens } from 'lithebox-ui'

type TokenEditorContextValue = {
  tokens: Partial<Tokens>
  setTokens: (tokens: Partial<Tokens>) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const TokenEditorContext = createContext<TokenEditorContextValue | null>(null)

export function TokenEditorProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Partial<Tokens>>({})
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TokenEditorContext.Provider value={{ tokens, setTokens, isOpen, setIsOpen }}>
      {children}
    </TokenEditorContext.Provider>
  )
}

export function useTokenEditor(): TokenEditorContextValue {
  const ctx = useContext(TokenEditorContext)
  if (!ctx) throw new Error('useTokenEditor must be used within TokenEditorProvider')
  return ctx
}
