import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { Keyboard } from "./components/Keyboard"
import { toLetters, type Letter } from "./types/letter"
import { useBoardControls } from "./hooks/useBoardControls"
import { useToast } from "./hooks/useToast"
import guesslist from "./guesslist"
import wordlist from "./wordlist"


function getRandomWord(): Letter[] {
  return toLetters(wordlist[Math.floor(Math.random() * wordlist.length)])
}


export function App() {
  const { toast, popToast } = useToast()
  const [answer] = useState<Letter[]>(getRandomWord);
  const {
    board,
    onLetter,
    onBackspace,
    onSubmit,
  } = useBoardControls(answer, guesslist, popToast)

  useEffect(() => {
    console.log(`Answer is ${answer.join("")}`)
  }, [answer])

  return <div className="grid w-screen h-screen place-content-center">
    <div className="relative flex flex-col gap-6">
      <Board state={board} /> 
      <Keyboard 
        board={board}
        onBackspace={onBackspace}
        onEnter={onSubmit}
        onLetter={onLetter} 
      />
      <div className="absolute -top-6 w-full flex justify-center">
        {toast}
      </div>
    </div>
  </div>
}

