import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ThemeProvider } from "./ThemeProvider"
import { useThemeMode } from "./ThemeModeContext"
import { useTheme } from "./ThemeProvider"

function ThemeSwatch() {
  const tokens = useTheme()
  const { mode, toggleMode, setMode } = useThemeMode()

  return (
    <div
      style={{
        padding: "24px",
        background: tokens.color.background,
        color: tokens.color.text.primary,
        border: `1px solid ${tokens.color.border}`,
        borderRadius: tokens.radius.md,
        fontFamily: tokens.typography.fontFamily,
        minWidth: "320px",
      }}
    >
      <div
        style={{
          marginBottom: "16px",
          fontSize: tokens.typography.size.lg,
          fontWeight: tokens.typography.weight.bold,
        }}
      >
        Mode: {mode}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <button
          onClick={() => setMode("light")}
          style={{
            padding: "8px 16px",
            background: mode === "light" ? tokens.color.primary : tokens.color.surface,
            color: mode === "light" ? "#fff" : tokens.color.text.primary,
            border: `1px solid ${tokens.color.border}`,
            borderRadius: tokens.radius.sm,
            cursor: "pointer",
          }}
        >
          Light
        </button>
        <button
          onClick={() => setMode("dark")}
          style={{
            padding: "8px 16px",
            background: mode === "dark" ? tokens.color.primary : tokens.color.surface,
            color: mode === "dark" ? "#fff" : tokens.color.text.primary,
            border: `1px solid ${tokens.color.border}`,
            borderRadius: tokens.radius.sm,
            cursor: "pointer",
          }}
        >
          Dark
        </button>
        <button
          onClick={toggleMode}
          style={{
            padding: "8px 16px",
            background: tokens.color.secondary,
            color: "#fff",
            border: "none",
            borderRadius: tokens.radius.sm,
            cursor: "pointer",
          }}
        >
          Toggle
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {(["background", "surface", "primary", "secondary", "error", "border"] as const).map(
          (key) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "4px",
                  background: tokens.color[key] as string,
                  border: `1px solid ${tokens.color.border}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: tokens.typography.size.sm,
                  color: tokens.color.text.secondary,
                }}
              >
                {key}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  )
}

const meta: Meta = {
  title: "Theme/ThemeMode",
  parameters: { layout: "centered" },
}

export default meta

export const LightMode: StoryObj = {
  render: () => (
    <ThemeProvider mode="light">
      <ThemeSwatch />
    </ThemeProvider>
  ),
}

export const DarkMode: StoryObj = {
  render: () => (
    <ThemeProvider mode="dark">
      <ThemeSwatch />
    </ThemeProvider>
  ),
}

export const InteractiveToggle: StoryObj = {
  render: () => (
    <ThemeProvider>
      <ThemeSwatch />
    </ThemeProvider>
  ),
}

export const SideBySide: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: "24px" }}>
      <ThemeProvider mode="light">
        <ThemeSwatch />
      </ThemeProvider>
      <ThemeProvider mode="dark">
        <ThemeSwatch />
      </ThemeProvider>
    </div>
  ),
}
