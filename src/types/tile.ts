import type { Letter } from "./letter"
import type { Placement } from "./placement"

export type TileState = {
  letter: Letter | null,
  placement: Placement,
  revealed: boolean,
}
