import { useCallback, useEffect, useMemo, useState } from "react";
import { createEmptyBoardState, revealRow, updateTileAt, type BoardState } from "@/types/board";
import { isLetter, type Letter } from "@/types/letter";
import { getPlacement } from "@/types/placement";


const ROW_COUNT = 6
const WORD_LENGTH = 5

export function useBoardControls(answer: Letter[], guessList: string[], popToast: (toast: string) => void) {
  // Track board state
  const [board, setBoard] = useState<BoardState>(() => createEmptyBoardState(
    ROW_COUNT,
    WORD_LENGTH,
  ));

  // Track the active row and tile
  const [activeRow, setActiveRow] = useState(0);
  const [activeTile, setActiveTile] = useState(0);

  // Compute a lookup for valid guesses
  const validGuesses = useMemo(() => {
    return new Set(guessList) 
  }, [guessList])

  // Handle backspace
  const onBackspace = useCallback(() => {
    if (activeTile === 0) {
      return
    }

    const newBoard = updateTileAt(board, activeRow, activeTile - 1, {
      letter: null,
      placement: "wrong",
      revealed: false,
    })

    setActiveTile(activeTile - 1)
    setBoard(newBoard)
  }, [board, activeRow, activeTile])

  // Handle submit
  const onSubmit = useCallback(() => {
    const completeRow = board.rows[activeRow].tiles
      .every(t => t.letter !== null)
    
    if (!completeRow) {
      popToast("Not enough letters")
      return
    }

    const guess = board.rows[activeRow].tiles.map(t => t.letter).join("")
    if (!validGuesses.has(guess)) {
      popToast("Not in word list")
      return
    }

    const newBoard = revealRow(board, activeRow) 
    
    setActiveRow(Math.min(activeRow + 1, ROW_COUNT))
    setActiveTile(0)
    setBoard(newBoard)
  }, [board, activeRow, validGuesses, popToast])

  // Handle letters
  const onLetter = useCallback((letter: Letter) => {
    if (activeTile >= WORD_LENGTH) {
      return
    }

    const newBoard = updateTileAt(board, activeRow, activeTile, {
      letter,
      placement: getPlacement(letter, activeTile, answer),
      revealed: false,
    }) 
    
    setActiveTile(Math.min(activeTile + 1, WORD_LENGTH))
    setBoard(newBoard)
  }, [board, activeRow, activeTile, answer])

  // Capture keyboard input to allow keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      if (key === "backspace") {
        onBackspace()
      } else if (key === "enter") {
        onSubmit()
      } else if (isLetter(key)) {
        onLetter(key)
      }
    }

    document.addEventListener("keyup", handleKeyPress)
    return () => { document.removeEventListener("keyup", handleKeyPress) }
  }, [onBackspace, onSubmit, onLetter])

  return {
    board,
    onLetter,
    onBackspace,
    onSubmit,
  }
}
