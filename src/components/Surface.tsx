import { Box } from "../primitives/Box"

export type SurfaceProps = {
  variant?: "base" | "raised" | "sunken"
  children?: React.ReactNode
}

export function Surface({ variant = "base", children }: SurfaceProps) {
  if (variant === "raised") {
    return <Box background="surface">{children}</Box>
  }

  if (variant === "sunken") {
    return <Box background="background" border>{children}</Box>
  }

  return <Box background="background">{children}</Box>
}
