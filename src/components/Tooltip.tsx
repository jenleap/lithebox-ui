import React, { useId, useLayoutEffect, useRef, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { LAYER_Z_INDEX } from "../layers/layerStack"
import { useOverlay } from "../layers/useOverlay"
import { TooltipA11yContract } from "../a11y/ariaContracts"
import { useMotionTransition } from "../motion/useMotionTransition"
import { TooltipMotionContract } from "../motion/contracts"
import { duration } from "../motion/motionTokens"

export type TooltipPlacement = "top" | "right" | "bottom" | "left"

export type TooltipProps = {
  content: React.ReactNode
  placement?: TooltipPlacement
  children: React.ReactElement
}

const GAP = 6

export function Tooltip({ content, placement = "top", children }: TooltipProps) {
  const id = useId()
  const tooltipId = `tooltip-${id.replace(/:/g, "")}`
  const { portalRoot } = useOverlay({ id: tooltipId, layer: "dropdown" })
  const triggerRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (open) {
      setMounted(true)
    } else {
      const delay = parseInt(duration.fast, 10)
      const timer = setTimeout(() => setMounted(false), delay)
      return () => clearTimeout(timer)
    }
  }, [open])

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    switch (placement) {
      case "top":
        setPosition({
          top: rect.top + scrollY - GAP,
          left: rect.left + scrollX + rect.width / 2,
          transform: "translate(-50%, -100%)",
        })
        break
      case "bottom":
        setPosition({
          top: rect.bottom + scrollY + GAP,
          left: rect.left + scrollX + rect.width / 2,
          transform: "translateX(-50%)",
        })
        break
      case "right":
        setPosition({
          top: rect.top + scrollY + rect.height / 2,
          left: rect.right + scrollX + GAP,
          transform: "translateY(-50%)",
        })
        break
      case "left":
        setPosition({
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX - GAP,
          transform: "translate(-100%, -50%)",
        })
        break
    }
  }, [open, placement])

  const motionStyles = useMotionTransition(TooltipMotionContract, open)

  const trigger = React.cloneElement(children, {
    ref: triggerRef,
    "aria-describedby": tooltipId,
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e)
      setOpen(true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e)
      setOpen(false)
    },
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e)
      setOpen(true)
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e)
      setOpen(false)
    },
  })

  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: LAYER_Z_INDEX.dropdown,
    background: "var(--color-text)",
    color: "var(--color-background)",
    borderRadius: "var(--radius-sm)",
    padding: "var(--spacing-xs) var(--spacing-sm)",
    fontSize: "var(--font-size-sm)",
    fontFamily: "var(--font-family-base)",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    ...position,
    ...motionStyles,
  }

  return (
    <>
      {trigger}
      {mounted && portalRoot &&
        ReactDOM.createPortal(
          <div id={tooltipId} role={TooltipA11yContract.role} style={tooltipStyle}>
            {content}
          </div>,
          portalRoot
        )
      }
    </>
  )
}
