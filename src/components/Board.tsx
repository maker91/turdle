import { Row } from "./Row"
import type { BoardState } from "@/types/board"


type BoardProps = {
  state: BoardState,
}

export function Board({ state }: BoardProps) {
  return <div className="flex flex-col gap-[5px] items-center">
    {state.rows.map((rowState, idx) => 
      <Row key={idx} state={rowState} />
    )}
  </div>
}
