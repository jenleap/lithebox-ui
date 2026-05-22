import { detectEnvironment } from "../detectEnvironment"

describe("detectEnvironment", () => {
  it("returns isBrowser: true in jsdom", () => {
    const env = detectEnvironment()
    expect(env.isBrowser).toBe(true)
  })

  it("returns all false when window is undefined", () => {
    const original = global.window
    // @ts-expect-error intentional deletion for test
    delete global.window
    const env = detectEnvironment()
    expect(env.isBrowser).toBe(false)
    expect(env.supportsReducedMotion).toBe(false)
    expect(env.supportsHover).toBe(false)
    expect(env.supportsPointer).toBe(false)
    global.window = original
  })
})
