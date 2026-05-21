import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"

vi.mock("./useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}))

import { useMotionTransition } from "./useMotionTransition"
import { useReducedMotion } from "./useReducedMotion"
import { ModalMotionContract, BannerMotionContract } from "./contracts"

const mockedUseReducedMotion = vi.mocked(useReducedMotion)

describe("useMotionTransition", () => {
  beforeEach(() => {
    mockedUseReducedMotion.mockReturnValue(false)
  })

  it("active=true returns enter 'to' opacity", () => {
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, true)
    )
    expect(result.current.opacity).toBe(1)
  })

  it("active=false returns exit 'to' opacity", () => {
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, false)
    )
    expect(result.current.opacity).toBe(0)
  })

  it("active=true includes transform for ModalMotionContract", () => {
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, true)
    )
    expect(result.current.transform).toContain("scale(1)")
  })

  it("active=false includes exit transform for ModalMotionContract", () => {
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, false)
    )
    expect(result.current.transform).toContain("scale(0.97)")
  })

  it("transition string contains resolved duration value", () => {
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, true)
    )
    expect(result.current.transition).toContain("200ms")
  })

  it("reduced motion: transition is 'none'", () => {
    mockedUseReducedMotion.mockReturnValue(true)
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, true)
    )
    expect(result.current.transition).toBe("none")
  })

  it("reduced motion: transform is absent", () => {
    mockedUseReducedMotion.mockReturnValue(true)
    const { result } = renderHook(() =>
      useMotionTransition(ModalMotionContract, true)
    )
    expect(result.current.transform).toBeUndefined()
  })

  it("fade-only contract: transition string does not contain 'transform'", () => {
    const { result } = renderHook(() =>
      useMotionTransition(BannerMotionContract, true)
    )
    expect(result.current.transition).not.toContain("transform")
  })

  it("fade-only contract active=true: opacity is 1", () => {
    const { result } = renderHook(() =>
      useMotionTransition(BannerMotionContract, true)
    )
    expect(result.current.opacity).toBe(1)
  })

  it("fade-only contract active=false: opacity is 0", () => {
    const { result } = renderHook(() =>
      useMotionTransition(BannerMotionContract, false)
    )
    expect(result.current.opacity).toBe(0)
  })
})
