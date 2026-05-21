import { describe, it, expect } from "vitest"
import { breakpoints, responsiveDensity } from "../breakpointTokens"

describe("breakpoints", () => {
  it("sm is 640", () => expect(breakpoints.sm).toBe(640))
  it("md is 768", () => expect(breakpoints.md).toBe(768))
  it("lg is 1024", () => expect(breakpoints.lg).toBe(1024))
  it("xl is 1280", () => expect(breakpoints.xl).toBe(1280))
  it("xxl is 1536", () => expect(breakpoints.xxl).toBe(1536))
})

describe("responsiveDensity", () => {
  it("sm maps to compact", () => expect(responsiveDensity.sm).toBe("compact"))
  it("md maps to comfortable", () => expect(responsiveDensity.md).toBe("comfortable"))
  it("lg maps to comfortable", () => expect(responsiveDensity.lg).toBe("comfortable"))
})
