import { describe, it, expect } from "vitest"
import { motionTokens, duration, easing, motionScale } from "./motionTokens"
import {
  ModalMotionContract,
  ToastMotionContract,
  DrawerLeftMotionContract,
} from "./contracts"

describe("motionTokens", () => {
  it("duration.fast is 120ms", () => {
    expect(duration.fast).toBe("120ms")
  })

  it("duration.normal is 200ms", () => {
    expect(duration.normal).toBe("200ms")
  })

  it("duration.slow is 320ms", () => {
    expect(duration.slow).toBe("320ms")
  })

  it("easing values are cubic-bezier strings", () => {
    expect(easing.standard).toContain("cubic-bezier")
    expect(easing.enter).toContain("cubic-bezier")
    expect(easing.exit).toContain("cubic-bezier")
  })

  it("motionScale.none is 0", () => {
    expect(motionScale.none).toBe(0)
  })

  it("motionScale.standard is 2", () => {
    expect(motionScale.standard).toBe(2)
  })

  it("motionTokens aggregates all sub-tokens", () => {
    expect(motionTokens.duration).toBe(duration)
    expect(motionTokens.easing).toBe(easing)
    expect(motionTokens.scale).toBe(motionScale)
  })
})

describe("motion contracts", () => {
  it("ModalMotionContract has enter and exit", () => {
    expect(ModalMotionContract.enter).toBeDefined()
    expect(ModalMotionContract.exit).toBeDefined()
  })

  it("ModalMotionContract.enter.duration is a valid duration key", () => {
    expect(["fast", "normal", "slow"]).toContain(ModalMotionContract.enter.duration)
  })

  it("ModalMotionContract.exit.easing is a valid easing key", () => {
    expect(["standard", "enter", "exit"]).toContain(ModalMotionContract.exit.easing)
  })

  it("ToastMotionContract enter has translateY transform", () => {
    expect(ToastMotionContract.enter.transform.from).toContain("translateY")
    expect(ToastMotionContract.exit.transform.to).toContain("translateY")
  })

  it("DrawerLeftMotionContract enter uses translateX from -100%", () => {
    expect(DrawerLeftMotionContract.enter.transform.from).toBe("translateX(-100%)")
    expect(DrawerLeftMotionContract.enter.transform.to).toBe("translateX(0)")
  })

  it("DrawerLeftMotionContract exit transform reverses direction", () => {
    expect(DrawerLeftMotionContract.exit.transform.from).toBe("translateX(0)")
    expect(DrawerLeftMotionContract.exit.transform.to).toBe("translateX(-100%)")
  })
})
