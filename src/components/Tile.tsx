import type { Placement } from "@/types/placement"
import type { TileState } from "@/types/tile"



type TileProps = {
  state: TileState
}

const tileStyle: Record<Placement, string> = {
  wrong: "bg-gray-500 text-white",
  misplaced: "bg-yellow-500 text-white",
  placed: "bg-green-500 text-white",
}

function getTileStyle(state: TileState): string {
  if (state.letter === null) {
    return "border-2 border-gray-300"
  }

  if (!state.revealed) {
    return "border-2 border-gray-500 text-black"
  }

  return tileStyle[state.placement]
}

export function Tile({ state }: TileProps) {
  const style = getTileStyle(state) 

  return <div className={`w-[62px] h-[62px] grid place-content-center font-bold text-3xl uppercase select-none ${style}`}>
    {state.letter} 
  </div>
}

