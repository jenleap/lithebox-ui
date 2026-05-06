export type DividerProps = {
  orientation?: "horizontal" | "vertical"
}

export function Divider({ orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        style={{
          border: "none",
          borderLeft: "1px solid var(--color-border)",
          margin: 0,
          height: "100%",
          alignSelf: "stretch",
        }}
      />
    )
  }

  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--color-border)",
        margin: 0,
        width: "100%",
      }}
    />
  )
}
