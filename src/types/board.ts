import type { RowState } from "./row"
import type { TileState } from "./tile"

export type BoardState = {
  rows: RowState[],
}

export function createEmptyBoardState(numRows: number, wordLength: number): BoardState {
  const state = {
    rows: []
  } 

  for (let row = 0; row < numRows; row += 1) {
    const rowState: RowState = {
      tiles: []
    }

    for (let tile = 0; tile < wordLength; tile += 1) {
      rowState.tiles.push({
        letter: null,
        placement: "wrong",
        revealed: false,
      })
    }

    state.rows.push(rowState)
  }

  return state
}

export function updateTileAt(
  boardState: BoardState,
  rowIndex: number,
  tileIndex: number,
  newTileState: TileState
): BoardState {
  // Create a new board state which is a copy of the old state
  const newState: BoardState = {
    rows: [...boardState.rows]
  } 

  // Update the row at the specified row index
  const newRow: RowState = {
    tiles: [...boardState.rows[rowIndex].tiles]
  }

  newRow.tiles[tileIndex] = newTileState
  newState.rows[rowIndex] = newRow
  return newState
}

export function revealRow(
  boardState: BoardState,
  rowIndex: number,
): BoardState {
  // Create a new board state which is a copy of the old state
  const newState: BoardState = {
    rows: [...boardState.rows]
  } 

  // Update the row at the specified row index
  const newRow: RowState = {
    tiles: boardState.rows[rowIndex].tiles.map(tile => ({
      letter: tile.letter,
      placement: tile.placement,
      revealed: true
    }))
  }

  newState.rows[rowIndex] = newRow
  return newState
}
