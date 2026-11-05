import { useCallback, useMemo, type PropsWithChildren } from 'react'
import { Delete } from 'lucide-react'
import { type Letter } from '@/types/letter'
import type { BoardState } from '@/types/board'
import { getBestPlacement, type Placement } from '@/types/placement'

type ActionKey = "enter" | "backspace"
type KeyCharacter = Letter | ActionKey


const LAYOUT: KeyCharacter[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
]


type KeyboardProps = {
  board: BoardState,
  onBackspace: () => void,
  onEnter: () => void,
  onLetter: (letter: Letter) => void,
}

export function Keyboard({ board, onBackspace, onEnter, onLetter }: KeyboardProps) {
  // Map revealed letters to their highest placement
  const placementMap = useMemo(() => {
    const placements = new Map<Letter, Placement>

    for (const row of board.rows) {
      for (const tile of row.tiles) {
        if (tile.letter === null || !tile.revealed) {
          continue
        }

        let placement = tile.placement
        const existingPlacement = placements.get(tile.letter);

        if (existingPlacement !== undefined) {
          placement = getBestPlacement(placement, existingPlacement)
        }

        placements.set(tile.letter, placement)
      }
    } 

    return placements
  }, [board])

  return <div className="flex flex-col gap-[8px]">
    {
      LAYOUT.flatMap((row, rowIdx) => {
        return <div key={rowIdx} className="flex gap-[6px] justify-center">
          {row.map((c, tileIdx) => {
            if (c === "backspace") {
              return <BackspaceKey key={tileIdx} onBackspace={onBackspace} />
            }

            if (c === "enter") {
              return <EnterKey key={tileIdx} onEnter={onEnter} />
            }

            return <LetterKey 
              key={tileIdx}
              letter={c}
              placement={placementMap.get(c) ?? null}
              onLetter={onLetter}
            />
          })}
        </div>
      })
    }
  </div>
}

type KeyboardKeyProps = PropsWithChildren<{
  className: string,
  action: () => void,
}>

function KeyboardKey({ children, className, action }: KeyboardKeyProps) {
  return <div 
    className={`grid place-content-center w-[43px] h-[58px] rounded-[4px] select-none cursor-pointer ${className}`}
    onClick={action}
  >
    {children}
  </div>
}


function getLetterKeyStyle(placement: Placement): string {
  if (placement === "placed") {
    return "bg-green-500"
  }

  if (placement === "misplaced") {
    return "bg-yellow-500"
  }

  if (placement === "wrong") {
    return "bg-gray-500"
  }

  return "bg-gray-300"
}

type LetterKeyProps = {
  letter: Letter,
  placement: Placement | null,
  onLetter: (letter: Letter) => void,
}

function LetterKey({ letter, placement, onLetter }: LetterKeyProps) {
  const action = useCallback(() => {
    onLetter(letter)
  }, [onLetter, letter])

  const style = getLetterKeyStyle(placement)

  return <KeyboardKey 
    className={`text-xl font-bold uppercase ${style}`} 
    action={action}
  >
    {letter}
  </KeyboardKey>
}


type EnterKeyProps = {
  onEnter: () => void,
}

function EnterKey({ onEnter }: EnterKeyProps) {
  return <KeyboardKey 
    className="w-[65px] text-xs font-bold uppercase bg-gray-300"
    action={onEnter}
  >
    Enter
  </KeyboardKey>
}


type BackspaceKeyProps = {
  onBackspace: () => void,
}

function BackspaceKey({ onBackspace }: BackspaceKeyProps) {
  return <KeyboardKey 
    className="w-[65px] text-sm font-bold bg-gray-300"
    action={onBackspace}
  >
    <Delete />
  </KeyboardKey>
}
