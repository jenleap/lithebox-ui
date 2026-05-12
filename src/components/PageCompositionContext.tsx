import React, { createContext, useContext } from "react"

type PageCompositionContextValue = {
  insidePage: boolean
  insidePageContent: boolean
}

const PageCompositionContext = createContext<PageCompositionContextValue>({
  insidePage: false,
  insidePageContent: false,
})

export function usePageCompositionContext() {
  return useContext(PageCompositionContext)
}

export function PageCompositionProvider({
  value,
  children,
}: {
  value: PageCompositionContextValue
  children: React.ReactNode
}) {
  return (
    <PageCompositionContext.Provider value={value}>
      {children}
    </PageCompositionContext.Provider>
  )
}
