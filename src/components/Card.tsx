import { Box } from "../primitives/Box"
import { CardContract } from "../contracts/CardContract"
import { CardInteractionContract } from "../contracts/CardInteractionContract"
import { validateVariant } from "../contracts/validateContract"
import { useInteractionState } from "../interactions"

export type CardProps = {
  padding?: keyof typeof CardContract.padding
  interactive?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

export function Card({ padding, interactive = false, onClick, children }: CardProps) {
  validateVariant(CardContract.padding, "padding", padding, "Card")

  const isInteractive = interactive || !!onClick
  const { interactionProps, stateStyles } = useInteractionState({
    contract: CardInteractionContract,
  })

  if (isInteractive) {
    const style: React.CSSProperties = {
      background: "var(--color-surface)",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--color-border)",
      cursor: "pointer",
      ...(padding !== undefined && { padding: `var(--spacing-${padding})` }),
      ...stateStyles,
    }

    return (
      <div style={style} onClick={onClick} {...interactionProps}>
        {children}
      </div>
    )
  }

  return (
    <Box
      background={CardContract.base.background}
      radius={CardContract.base.radius}
      border={CardContract.base.border}
      padding={padding}
    >
      {children}
    </Box>
  )
}
