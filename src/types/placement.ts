import type { Letter } from "./letter";


export type Placement = "wrong" | "misplaced" | "placed"

export function getPlacement(guess: Letter, index: number, answer: Letter[]): Placement {
  if (guess === answer[index]) {
    return "placed"
  }

  if (answer.includes(guess)) {
    return "misplaced"
  }

  return "wrong"
}

const PLACEMENT_PRIORITY: Placement[] = ["placed", "misplaced", "wrong"];

/**
 * Returns the placement with the highest priority
 */
export function getBestPlacement(p1: Placement, p2: Placement): Placement {
  const i1 = PLACEMENT_PRIORITY.indexOf(p1)
  const i2 = PLACEMENT_PRIORITY.indexOf(p2)

  return i1 < i2 ? p1 : p2
}
