import type { Tokens } from "../tokens/types"

type DotPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? DotPaths<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`
}[keyof T & string]

export type SemanticSlot = DotPaths<Tokens>

export type LiteralSlot = "transparent" | "none"

export type SlotValue = SemanticSlot | LiteralSlot

export type ContractSlotMap = Record<string, SlotValue>

export type ResolvedContract = Record<string, string>
