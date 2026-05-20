import { useState, useCallback } from "react"

type KeyboardNavigationOptions = {
  itemCount: number
  onSelect: (index: number) => void
  onEscape?: () => void
  loop?: boolean
}

type ItemProps = {
  tabIndex: number
  "aria-selected": boolean
  onKeyDown: (e: React.KeyboardEvent) => void
}

type KeyboardNavigationResult = {
  activeIndex: number
  setActiveIndex: (index: number) => void
  getItemProps: (index: number) => ItemProps
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  onEscape,
  loop = false,
}: KeyboardNavigationOptions): KeyboardNavigationResult {
  const [activeIndex, setActiveIndex] = useState(0)

  const getItemProps = useCallback(
    (index: number): ItemProps => ({
      tabIndex: index === activeIndex ? 0 : -1,
      "aria-selected": index === activeIndex,
      onKeyDown: (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault()
            setActiveIndex(prev => {
              if (prev >= itemCount - 1) return loop ? 0 : prev
              return prev + 1
            })
            break
          }
          case "ArrowUp": {
            e.preventDefault()
            setActiveIndex(prev => {
              if (prev <= 0) return loop ? itemCount - 1 : prev
              return prev - 1
            })
            break
          }
          case "Enter":
          case " ": {
            e.preventDefault()
            onSelect(activeIndex)
            break
          }
          case "Escape": {
            e.preventDefault()
            onEscape?.()
            break
          }
        }
      },
    }),
    [activeIndex, itemCount, loop, onSelect, onEscape]
  )

  return { activeIndex, setActiveIndex, getItemProps }
}
