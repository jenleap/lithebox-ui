# Task 008: Storybook Stories

## Feature
F011 — Feedback System (Toast & Banner)

## Description
Write Storybook stories for the Toast and Banner systems. Stories must demonstrate: all four variants, auto-dismiss behavior, manual dismissal, and the `useToast` imperative API via interactive controls.

## Files
- `src/stories/Toast.stories.tsx` (create)
- `src/stories/Banner.stories.tsx` (create)

## Implementation Steps

1. Check existing stories directory path by looking at one existing story file for the exact import pattern and `ThemeProvider` usage before writing. The pattern from F010 stories should be followed exactly.

2. Create `src/stories/Toast.stories.tsx`:
   ```tsx
   import type { Meta, StoryObj } from "@storybook/react"
   import React, { useState } from "react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { NotificationManagerProvider } from "../feedback/NotificationManagerProvider"
   import { useToast } from "../feedback/useToast"
   import { notificationManager } from "../feedback/notificationManager"

   function ToastDemo({ variant }: { variant: "success" | "error" | "info" | "warning" }) {
     const toast = useToast()
     return (
       <ThemeProvider>
         <NotificationManagerProvider>
           <div style={{ padding: "24px" }}>
             <button onClick={() => toast[variant](`${variant} notification`, { description: "This is the description." })}>
               Show {variant} toast
             </button>
           </div>
         </NotificationManagerProvider>
       </ThemeProvider>
     )
   }

   const meta: Meta = {
     title: "Feedback/Toast",
     parameters: { layout: "fullscreen" },
   }
   export default meta

   export const Success: StoryObj = {
     render: () => <ToastDemo variant="success" />,
   }

   export const Error: StoryObj = {
     render: () => <ToastDemo variant="error" />,
   }

   export const Info: StoryObj = {
     render: () => <ToastDemo variant="info" />,
   }

   export const Warning: StoryObj = {
     render: () => <ToastDemo variant="warning" />,
   }

   function MultiToastDemo() {
     const toast = useToast()
     return (
       <ThemeProvider>
         <NotificationManagerProvider>
           <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px", maxWidth: "200px" }}>
             <button onClick={() => toast.success("Saved successfully")}>Success</button>
             <button onClick={() => toast.error("Something went wrong")}>Error</button>
             <button onClick={() => toast.info("Update available")}>Info</button>
             <button onClick={() => toast.warning("Low disk space")}>Warning</button>
           </div>
         </NotificationManagerProvider>
       </ThemeProvider>
     )
   }

   export const AllVariants: StoryObj = {
     name: "All Variants (Interactive)",
     render: () => <MultiToastDemo />,
   }

   function PersistentToastDemo() {
     const toast = useToast()
     return (
       <ThemeProvider>
         <NotificationManagerProvider>
           <div style={{ padding: "24px" }}>
             <button
               onClick={() =>
                 toast.info("Background sync complete", {
                   description: "All changes saved.",
                   duration: 60000,
                   dismissible: true,
                 })
               }
             >
               Show persistent toast (60s)
             </button>
           </div>
         </NotificationManagerProvider>
       </ThemeProvider>
     )
   }

   export const Persistent: StoryObj = {
     render: () => <PersistentToastDemo />,
   }
   ```

3. Create `src/stories/Banner.stories.tsx`:
   ```tsx
   import type { Meta, StoryObj } from "@storybook/react"
   import React from "react"
   import { ThemeProvider } from "../theme/ThemeProvider"
   import { NotificationManagerProvider } from "../feedback/NotificationManagerProvider"
   import { Banner } from "../components/Banner"

   const meta: Meta<typeof Banner> = {
     title: "Feedback/Banner",
     component: Banner,
     parameters: { layout: "fullscreen" },
   }
   export default meta

   type Story = StoryObj<typeof Banner>

   function Wrapper({ children }: { children: React.ReactNode }) {
     return (
       <ThemeProvider>
         <NotificationManagerProvider>
           <div style={{ padding: "0" }}>{children}</div>
         </NotificationManagerProvider>
       </ThemeProvider>
     )
   }

   export const Success: Story = {
     render: () => (
       <Wrapper>
         <Banner
           banner={{
             id: "b1",
             variant: "success",
             title: "Changes saved",
             description: "Your profile has been updated successfully.",
             dismissible: true,
             lifecycleState: "visible",
           }}
         />
       </Wrapper>
     ),
   }

   export const Warning: Story = {
     render: () => (
       <Wrapper>
         <Banner
           banner={{
             id: "b2",
             variant: "warning",
             title: "Scheduled maintenance",
             description: "System will be down on Friday at 2 AM.",
             dismissible: true,
             lifecycleState: "visible",
           }}
         />
       </Wrapper>
     ),
   }

   export const Error: Story = {
     render: () => (
       <Wrapper>
         <Banner
           banner={{
             id: "b3",
             variant: "error",
             title: "Service disruption",
             description: "We are experiencing issues. Please try again later.",
             dismissible: false,
             lifecycleState: "visible",
           }}
         />
       </Wrapper>
     ),
   }

   export const Info: Story = {
     render: () => (
       <Wrapper>
         <Banner
           banner={{
             id: "b4",
             variant: "info",
             title: "New features available",
             description: "Check the release notes for what's new.",
             dismissible: true,
             lifecycleState: "visible",
           }}
         />
       </Wrapper>
     ),
   }

   export const NonDismissible: Story = {
     name: "Non-Dismissible",
     render: () => (
       <Wrapper>
         <Banner
           banner={{
             id: "b5",
             variant: "warning",
             title: "Read-only mode",
             dismissible: false,
             lifecycleState: "visible",
           }}
         />
       </Wrapper>
     ),
   }
   ```

## Constraints
- All stories must wrap in `<ThemeProvider>` and `<NotificationManagerProvider>`
- Toast stories must use `useToast` hook — never call `notificationManager.addToast` directly in stories
- Banner stories can use `Banner` directly with a static `BannerEntry` (no manager needed for rendering tests)
- Follow exact same story file structure/patterns as existing stories in `src/stories/`

## Acceptance Criteria
- `Toast.stories.tsx` has stories: Success, Error, Info, Warning, AllVariants, Persistent
- `Banner.stories.tsx` has stories: Success, Warning, Error, Info, NonDismissible
- All stories render without errors in Storybook
- Interactive toast stories show toasts that animate in and auto-dismiss
- Banner stories show persistent messages with correct variant styling

## Test Steps
1. Run `npm run storybook` — Storybook loads without errors
2. Open Toast → All Variants and click each button; verify correct variant color and auto-dismiss
3. Open Banner stories and verify each variant renders with correct border color

## Notes
Check the exact import paths for `ThemeProvider` and existing story patterns before writing — look at `src/stories/Page.stories.tsx` or similar for the F010 story pattern.
