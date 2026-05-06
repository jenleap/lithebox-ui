# Lithebox UI — Overview

## Overview

**Lithebox UI** is a **token-first, design-system-driven React component library** that unifies two modes of UI creation:

### 1. Application Mode (Primary)
A production-ready component library for building real applications (similar in usage to Material UI or Chakra UI).

### 2. Prototyping Mode (Secondary)
A deterministic rendering system that converts structured UI specifications (including LLM-generated output) into consistent, production-quality interfaces.

---

## Core Idea

> **Design tokens define the system. Components are a deterministic projection of those tokens.**

Lithebox UI ensures:

- The same design tokens power both applications and prototypes
- The same components are used across both modes
- UI output is consistent, predictable, and theme-driven
- There is no divergence between “generated UI” and “production UI”

---

## High-Level Architecture

```text
Design Tokens
      │
      ▼
Token Compiler
      │
      ▼
Component Token Contracts
      │
      ▼
Component Library
      │
 ┌────┴───────────┐
 │                │
Application   Prototyping Renderer
```

## Key Concepts

### 1. Design Tokens
Design tokens define the foundational visual system (color, spacing, typography, etc.). They are the single source of truth for all styling decisions.


### 2. Token Compiler
A deterministic system that transforms raw tokens into:
- semantic tokens
- component-specific contracts
- resolved runtime values

This ensures tokens are usable at both design and runtime levels.


### 3. Component Token Contracts
Each component consumes a strict, pre-defined set of semantic tokens rather than raw design tokens.

This creates a stable contract between:
- design system intent
- component behavior
- runtime UI output


### 4. Component Library
A deterministic set of React components that:
- consume only contract-defined tokens
- expose predictable APIs
- remain consistent across application and prototyping modes

### 5. Prototyping Renderer
A system that converts structured UI specifications into valid component trees using the same underlying library as production applications.

This ensures:
- no “prototype-only” UI
- no styling divergence
- full consistency with production output

---

## Core Principles

### 1. Token-Driven System 
All visual decisions originate from design tokens.

### 2. Deterministic UI
Given the same tokens and inputs, the system always produces the same output.

### 3. Contract-Based Components
Components do not interpret raw tokens; they consume structured semantic contracts.

### 4. Dual-Mode Consistency
Application UI and generated UI are powered by the same system with no divergence.

### 5. No Styling Leakage
Styling logic is fully isolated in the token compiler and contract layer.

---

## Modes of Operation

### Application Mode
- Direct usage of components in React applications
- Fully typed, predictable API surface
- Developer-controlled UI construction

### Prototyping Mode
Structured UI specs (potentially LLM-generated)
Converted into component trees
Rendered using the same component library as production

---

## Goals

### System Goals
- Establish a production-grade component library
- Make design tokens the single source of truth
- Ensure consistent UI across all environments
- Support runtime theming and token overrides

### Developer Experience Goals
- Familiar API (similar to existing UI libraries)
- Strong defaults with flexible customization
- Usable without any LLM tooling

### AI / Prototyping Goals
- Predictable, composable component generation
- Strictly valid component outputs
- No ambiguity in UI structure generation

---

## Non-Goals (MVP)

- Advanced animation systems
- Full accessibility compliance (iterative)
- Backend/data orchestration
- Feature parity with mature UI ecosystems

---

## System Guarantees
- UI is fully derived from tokens
- Components are deterministic and contract-bound
- Prototyping output is identical to production UI
- Styling cannot be defined outside the token system

---

## Success Criteria

### System
- Tokens fully control visual output
- Component contracts remain consistent and stable
- UI output is deterministic across environments

### Developer Experience
- Library feels familiar and intuitive
- No dependency on LLM tooling for core usage

### AI Reliability
- Structured UI generation is always valid
- No invalid component combinations

### Output Quality
- Production-ready UI by default
- Minimal manual styling required
