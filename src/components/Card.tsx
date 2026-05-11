import { Box } from "../primitives/Box"
import { CardContract } from "../contracts/CardContract"
import { validateVariant } from "../contracts/validateContract"

export type CardProps = {
  padding?: keyof typeof CardContract.padding
  children?: React.ReactNode
}

export function Card({ padding, children }: CardProps) {
  validateVariant(CardContract.padding, "padding", padding, "Card")

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
