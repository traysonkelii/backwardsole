import { WordBank } from "./WordBank";

export const getRandomWord = () => {
  const randomNumber = Math.floor(Math.random() * WordBank.length - 1);
  const newWord = WordBank[randomNumber];
  return newWord;
};

export type BackwardsoleGameObject = {
  guesses: string[]; // empty on new game
  rows: Rows[]; // empty on new game
  voiceIndex: number; // persist
  voiceName: string;
  rate: number; // persist
  successGuessCount: number[]; // persist
  playedFirstListen: boolean;
  currentIndex: number;
  gameOver: boolean;
  answer: string;
  gameWon: boolean;
};

export type Rows = {
  isEnabled: boolean;
  words: string[];
  winningRow: boolean;
};

export const StartingGameObject: BackwardsoleGameObject = {
  guesses: [], // empty this out
  rows: [
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
  ], // reset
  voiceIndex: 0, // keep
  rate: 1, // keep
  successGuessCount: [], // keep
  playedFirstListen: false, // reset
  currentIndex: 0, // reset
  voiceName: "", // keep
  gameOver: false, // reset
  answer: getRandomWord(), //reset
  gameWon: false,
};
