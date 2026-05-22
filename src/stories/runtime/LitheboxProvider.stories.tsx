import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { LitheboxProvider } from "../../runtime/LitheboxProvider"
import { useRuntime } from "../../runtime/RuntimeContext"
import { Button } from "../../components/Button"
import { Text } from "../../components/Text"
import { Stack } from "../../primitives/Stack"
import type { Tokens } from "../../tokens/types"

function RuntimeInspector() {
  const { config, environment } = useRuntime()
  return (
    <Stack gap="sm">
      <Text size="sm">isBrowser: {String(environment.isBrowser)}</Text>
      <Text size="sm">supportsReducedMotion: {String(environment.supportsReducedMotion)}</Text>
      <Text size="sm">config: {JSON.stringify(config, null, 2)}</Text>
    </Stack>
  )
}

const meta: Meta<typeof LitheboxProvider> = {
  title: "Runtime/LitheboxProvider",
  component: LitheboxProvider,
}
export default meta

type Story = StoryObj<typeof LitheboxProvider>

export const MinimalSetup: Story = {
  render: () => (
    <LitheboxProvider>
      <Stack gap="md">
        <Text>Lithebox runtime initialized with defaults.</Text>
        <Button>Default Button</Button>
      </Stack>
    </LitheboxProvider>
  ),
}

export const WithRuntimeInspector: Story = {
  render: () => (
    <LitheboxProvider>
      <Stack gap="md">
        <Text>Runtime context values:</Text>
        <RuntimeInspector />
      </Stack>
    </LitheboxProvider>
  ),
}

export const WithReducedMotionConfig: Story = {
  render: () => (
    <LitheboxProvider config={{ motion: { reducedMotion: true } }}>
      <Stack gap="md">
        <Text>Reduced motion mode enabled via runtime config.</Text>
        <RuntimeInspector />
      </Stack>
    </LitheboxProvider>
  ),
}

export const WithCustomTokens: Story = {
  render: () => (
    <LitheboxProvider tokens={{ color: { primary: "#7c3aed" } } as Partial<Tokens>}>
      <Stack gap="md">
        <Text>Custom primary color token applied at runtime.</Text>
        <Button>Custom Color Button</Button>
      </Stack>
    </LitheboxProvider>
  ),
}

export const WithCustomPortalRootId: Story = {
  render: () => (
    <LitheboxProvider config={{ overlays: { portalRootId: "my-app-portal" } }}>
      <Stack gap="md">
        <Text>Custom portal root ID: my-app-portal</Text>
        <RuntimeInspector />
      </Stack>
    </LitheboxProvider>
  ),
}
