
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"] as const;
const letterSet = new Set<string>(letters);

export type Letter = typeof letters[number] | null;

export function isLetter(c: string): c is Letter {
  return letterSet.has(c);
}

export function toLetters(s: string): Letter[] {
  return s.split("").filter(isLetter)
}
