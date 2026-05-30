# F025 — Token Editor Playground

## Overview

A live token editor panel in the playground that lets users load a full token JSON and then edit individual token values to see components update in real time.

## Goals

- Paste or type a full `Partial<Tokens>` JSON to load a token set
- Edit individual token values (colors, radius, spacing, typography, shadow) with live preview
- JSON and visual editing are bidirectional — switching tabs reflects current state
- Reset to defaults at any time

## Components

- `TokenEditorContext` — holds `tokens` and `isOpen` state at App level
- `TokenEditorPanel` — fixed right-side panel with tab switcher
- `JsonEditorTab` — textarea + Apply + validation
- `VisualEditorTab` — grouped controls for each token category
- `PlaygroundShell` TopBar button to toggle panel

## Token Categories

- **Colors** (8): primary, secondary, background, surface, text.primary, text.secondary, border, error
- **Radius** (3): sm, md, lg
- **Spacing** (5): xs, sm, md, lg, xl
- **Typography**: fontFamily, size (sm/md/lg/xl), weight (regular/medium/bold)
- **Shadow** (2): sm, md
