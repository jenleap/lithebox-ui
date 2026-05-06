import { Box } from "../primitives/Box"
import type { Tokens } from "../tokens/types"

export type CardProps = {
  padding?: keyof Tokens["spacing"]
  children?: React.ReactNode
}

export function Card({ padding, children }: CardProps) {
  return (
    <Box background="surface" radius="md" border padding={padding}>
      {children}
    </Box>
  )
}
