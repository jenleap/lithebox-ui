import React, { useMemo } from "react"
import { defaultTokens } from "../tokens/defaultTokens"
import { mergeTokens } from "../tokens/mergeTokens"
import { ThemeProvider } from "../theme/ThemeProvider"
import { ResponsiveProvider } from "../responsive/ResponsiveProvider"
import { OverlayManagerProvider } from "../layers/OverlayManager"
import { NotificationManagerProvider } from "../feedback/NotificationManagerProvider"
import { RuntimeContext } from "./RuntimeContext"
import { detectEnvironment } from "./detectEnvironment"
import { injectTokens } from "./injectTokens"
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"
import type { LitheboxRuntimeConfig, RuntimeContextValue } from "./types"
import type { Tokens } from "../tokens/types"

export type LitheboxProviderProps = {
  tokens?: Partial<Tokens>
  config?: LitheboxRuntimeConfig
  children: React.ReactNode
}

export function LitheboxProvider({
  tokens,
  config = {},
  children,
}: LitheboxProviderProps) {
  const resolvedTokens = useMemo(
    () => mergeTokens(defaultTokens, tokens),
    [tokens]
  )

  const environment = useMemo(() => detectEnvironment(), [])

  const contextValue = useMemo<RuntimeContextValue>(
    () => ({ config, environment }),
    [config, environment]
  )

  useIsomorphicLayoutEffect(() => {
    return injectTokens(resolvedTokens)
  }, [resolvedTokens])

  return (
    <RuntimeContext.Provider value={contextValue}>
      <ThemeProvider tokens={tokens}>
        <ResponsiveProvider>
          <OverlayManagerProvider portalRootId={config.overlays?.portalRootId}>
            <NotificationManagerProvider>
              {children}
            </NotificationManagerProvider>
          </OverlayManagerProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </RuntimeContext.Provider>
  )
}
