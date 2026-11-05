import { useCallback, useRef, useState, type ReactNode } from "react";

const TOAST_DURATION = 1000

export function useToast() {
  const [text, setText] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  let toast: ReactNode | null = null
  if (text !== null) {
    toast = <div className="bg-black text-white p-3 text-sm font-bold rounded-sm">{text}</div> 
  }

  const popToast = useCallback((toast: string) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    setText(toast)
    timeoutRef.current = setTimeout(() => {
      setText(null) 
    }, TOAST_DURATION)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [setText])

  return {
    toast,
    popToast
  }
}
