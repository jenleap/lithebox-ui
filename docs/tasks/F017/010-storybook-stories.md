# Task 010: Storybook Stories

## Feature
F017 - Theme Mode System (Light/Dark + Semantic Theme Resolution)

## Description
Write Storybook stories that demonstrate the F017 theme mode system. Stories must show: light/dark mode side-by-side, interactive mode toggle, system preference auto-detection behavior, and persistence across remounts.

## Files
- `src/theme/ThemeMode.stories.tsx` (create)

## Implementation Steps

1. Create `src/theme/ThemeMode.stories.tsx`:

   ```tsx
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
         <div style={{ marginBottom: "16px", fontSize: tokens.typography.size.lg, fontWeight: tokens.typography.weight.bold }}>
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
           {(["background", "surface", "primary", "secondary", "error", "border"] as const).map(key => (
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
               <span style={{ fontSize: tokens.typography.size.sm, color: tokens.color.text.secondary }}>
                 {key}
               </span>
             </div>
           ))}
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
   ```

## Constraints
- Do not import from `src/index.ts` — import directly from theme module files
- Stories must be self-contained — no external data or API calls
- The `SideBySide` story must render both modes simultaneously without interference
- Do not use Storybook decorators to set the theme — use `ThemeProvider` directly in each story

## Acceptance Criteria
- `LightMode` story renders with light color palette and `data-theme="light"` on wrapper
- `DarkMode` story renders with dark color palette and `data-theme="dark"` on wrapper
- `InteractiveToggle` story defaults to system preference and allows toggle
- `SideBySide` story shows both palettes simultaneously with no style bleed between them
- Storybook loads without console errors

## Test Steps
1. Run `npm run storybook` and navigate to `Theme/ThemeMode`
2. Verify all four stories render without errors
3. In `InteractiveToggle`, click Toggle — verify colors update immediately
4. In `SideBySide`, verify the two panels have visually distinct colors

## Notes
The `ThemeSwatch` component is a story-local helper — it is not exported as a library component.
