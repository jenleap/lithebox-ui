import { Text } from "./Text"

export type LabelProps = {
  children: React.ReactNode
}

export function Label({ children }: LabelProps) {
  return (
    <Text size="sm" weight="medium">
      {children}
    </Text>
  )
}
