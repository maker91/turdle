import { Tile } from "./Tile"
import type { RowState } from "@/types/row"



type RowProps = {
  state: RowState,
}

export function Row({ state }: RowProps) {
  return <div className="flex gap-[5px]">
    {state.tiles.map((tileState, idx) => 
      <Tile key={idx} state={tileState} />
    )}
  </div>
}
