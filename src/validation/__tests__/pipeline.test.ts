import { describe, it, expect, beforeEach } from "vitest"
import { runValidationPipeline, createValidationResult } from "../pipeline"
import { registerValidator, clearValidatorRegistry } from "../registry"

beforeEach(() => {
  clearValidatorRegistry()
})

describe("runValidationPipeline", () => {
  it("runs all stages in order and merges results", () => {
    const order: number[] = []
    const stages = [
      { name: "s1", run: () => { order.push(1); return createValidationResult([]) } },
      { name: "s2", run: () => { order.push(2); return createValidationResult([]) } },
    ]
    runValidationPipeline(stages)
    expect(order).toEqual([1, 2])
  })

  it("returns valid when all stages pass", () => {
    const stages = [
      { name: "s1", run: () => createValidationResult([]) },
    ]
    expect(runValidationPipeline(stages).valid).toBe(true)
  })

  it("returns invalid when a stage fails", () => {
    const stages = [
      { name: "s1", run: () => createValidationResult([{ code: "ERR", severity: "error" as const, message: "fail" }]) },
    ]
    expect(runValidationPipeline(stages).valid).toBe(false)
  })

  it("skips development-only stages in production", () => {
    const ran: string[] = []
    const stages = [
      { name: "prod", run: () => { ran.push("prod"); return createValidationResult([]) } },
      { name: "dev", developmentOnly: true, run: () => { ran.push("dev"); return createValidationResult([]) } },
    ]
    runValidationPipeline(stages, { mode: "production" })
    expect(ran).toEqual(["prod"])
  })

  it("runs development-only stages in development mode", () => {
    const ran: string[] = []
    const stages = [
      { name: "dev", developmentOnly: true, run: () => { ran.push("dev"); return createValidationResult([]) } },
    ]
    runValidationPipeline(stages, { mode: "development" })
    expect(ran).toEqual(["dev"])
  })

  it("stops pipeline on first error in production mode", () => {
    const ran: string[] = []
    const stages = [
      { name: "s1", run: () => { ran.push("s1"); return createValidationResult([{ code: "ERR", severity: "error" as const, message: "fail" }]) } },
      { name: "s2", run: () => { ran.push("s2"); return createValidationResult([]) } },
    ]
    runValidationPipeline(stages, { mode: "production" })
    expect(ran).toEqual(["s1"])
  })

  it("does not stop on error in development mode", () => {
    const ran: string[] = []
    const stages = [
      { name: "s1", run: () => { ran.push("s1"); return createValidationResult([{ code: "ERR", severity: "error" as const, message: "fail" }]) } },
      { name: "s2", run: () => { ran.push("s2"); return createValidationResult([]) } },
    ]
    runValidationPipeline(stages, { mode: "development" })
    expect(ran).toEqual(["s1", "s2"])
  })

  it("runs external registered validators in development mode", () => {
    let externalRan = false
    registerValidator(() => { externalRan = true; return createValidationResult([]) })
    runValidationPipeline([], { mode: "development" })
    expect(externalRan).toBe(true)
  })

  it("does not run external validators in production mode", () => {
    let externalRan = false
    registerValidator(() => { externalRan = true; return createValidationResult([]) })
    runValidationPipeline([], { mode: "production" })
    expect(externalRan).toBe(false)
  })

  it("merges errors from multiple stages", () => {
    const stages = [
      { name: "s1", run: () => createValidationResult([{ code: "E1", severity: "error" as const, message: "e1" }]) },
      { name: "s2", run: () => createValidationResult([{ code: "E2", severity: "error" as const, message: "e2" }]) },
    ]
    const result = runValidationPipeline(stages, { mode: "development" })
    expect(result.errors).toHaveLength(2)
  })
})

describe("createValidationResult", () => {
  it("returns valid true when no errors", () => {
    expect(createValidationResult([]).valid).toBe(true)
  })

  it("returns valid false when errors present", () => {
    expect(createValidationResult([{ code: "X", severity: "error", message: "x" }]).valid).toBe(false)
  })
})
