import React from "react"
import type { PageLayout } from "../components/Page"

export function getLayoutBodyStyle(layout: PageLayout): React.CSSProperties {
  switch (layout) {
    case "standard":
      return { flex: 1, display: "flex", overflow: "hidden" }

    case "dashboard":
      return { flex: 1, display: "flex", overflow: "hidden" }

    case "detail":
      return { flex: 1, display: "flex", flexDirection: "row", overflow: "hidden" }

    case "form":
      return {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        padding: "0",
      }

    default:
      return { flex: 1, display: "flex", overflow: "hidden" }
  }
}

export function getLayoutContentStyle(layout: PageLayout): React.CSSProperties {
  if (layout === "form") {
    return { maxWidth: "640px", width: "100%", alignSelf: "flex-start" }
  }
  return {}
}
