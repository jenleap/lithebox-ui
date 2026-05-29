# Task 009: Overlay Validation Screen

## Feature
F024 — Playground Application & Integration Validation System

## Description
Implement the Overlays page — a dedicated validation screen for all Lithebox overlay components: Modal, Drawer, Dropdown Menu, Context Menu, and Tooltip. This screen stress-tests z-index stacking, focus management, and overlay coordination under real application conditions.

## Files
- `apps/playground/src/pages/OverlaysPage.tsx` (create)

## Implementation Steps
1. **Page structure**:
   - Page heading: "Overlay Validation" via Lithebox Heading.
   - Subheading/description: Text explaining this is a system validation page.
   - Grid of demonstration sections — each section is a Lithebox Card/Surface with:
     - Section title
     - Description of what is being validated
     - Trigger button(s)

2. **Modal section**:
   - Trigger: "Open Modal" Button.
   - Modal content: title, body text, Cancel + Confirm buttons.
   - Validate: modal renders above all other content, backdrop present, Escape key closes, focus trapped inside modal, Tab cycles through Cancel/Confirm only.
   - Second trigger: "Open Nested Modal" — opens a modal that itself contains a "Open Inner Modal" button. Tests z-index stacking.

3. **Drawer section**:
   - Two triggers: "Open Right Drawer", "Open Bottom Drawer" (if Lithebox supports placement variants).
   - Drawer content: a short form (name field + save button).
   - Validate: drawer overlays main content, closes on Escape and backdrop click, focus trapped.

4. **Dropdown Menu section**:
   - Trigger: "Open Dropdown" Button.
   - Menu items: Edit, Duplicate, Archive, Delete (destructive).
   - Validate: menu opens below trigger, arrow-key navigation, Enter selects, Escape closes, clicking outside closes.

5. **Context Menu section**:
   - A Box with dashed border and text "Right-click this area".
   - On right-click: context menu with options (Open, Copy Link, Delete).
   - Validate: positions at cursor, arrow-key navigation, Escape closes.

6. **Tooltip section**:
   - Three buttons, each with a Tooltip: top, right, bottom placement.
   - Validate: tooltip appears on hover/focus, disappears on blur/mouseout, does not clip viewport edges.

7. **Stacking test section**:
   - Trigger: "Open Modal with Dropdown" — opens a Modal that contains a Dropdown trigger inside it.
   - Validate: Dropdown renders above the Modal (correct z-index stacking via overlay manager).

## Constraints
- Use only Lithebox Modal, Drawer, Dropdown, Tooltip components from public API
- No custom z-index CSS — stacking must be managed by Lithebox overlay system
- All focus management validated manually per test steps
- Context menu uses Lithebox ContextMenu component if available; otherwise document as not yet implemented

## Acceptance Criteria
- All overlay types render and close correctly
- Escape key closes the frontmost overlay only (not all overlays)
- Focus is trapped inside Modal while open
- Tab navigation in Drawer is confined to Drawer content
- Dropdown arrow-key navigation works
- Tooltip appears on hover and keyboard focus
- Nested Modal z-index is correct (inner modal above outer)
- Dropdown inside Modal renders above the Modal backdrop

## Test Steps
1. Visit `/overlays` — page renders all sections
2. Open Modal — focus moves to modal; Tab cycles Cancel/Confirm; Escape closes
3. Open Nested Modal — inner modal appears above outer; close inner (Escape) → outer remains
4. Open Drawer — closes on backdrop click and Escape; Tab confined to drawer
5. Open Dropdown — arrow keys navigate; Enter selects; Escape closes
6. Right-click context area — context menu at cursor; Escape closes
7. Hover tooltip triggers — tooltips appear and disappear correctly
8. "Open Modal with Dropdown" — Dropdown inside Modal renders above Modal backdrop

## Notes
This screen is the primary validation of the overlay coordination system and z-index management under real application conditions. The stacking test (step 8) is the most critical validation.
