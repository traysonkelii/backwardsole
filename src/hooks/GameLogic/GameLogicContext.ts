import { createContext } from "react";
import { Rows } from "../../model/BackwardsoleGameObject";

type GameLogicContextType = {
  rate: number;
  setRate: Function;
  wordToGuess: string;
  setWordToGuess: Function;
  voice: SpeechSynthesisVoice | null;
  setVoice: Function;
  voiceIndex: number;
  rows: Rows[];
  setRows: Function;
  currentIndex: number;
  setCurrentIndex: Function;
  gameOver: boolean;
  setGameOver: Function;
}

const initialObject: GameLogicContextType = {
  rate: 1,
  setRate: (rate: number) => {},
  wordToGuess: 'guess',
  setWordToGuess: (word: string) => {},
  voice: null,
  voiceIndex: 0,
  setVoice: (voice: SpeechSynthesisVoice) => {},
  rows: [],
  setRows: ([]) => {},
  currentIndex: 0,
  setCurrentIndex: (index: number) => {},
  gameOver: false,
  setGameOver: () => {}
}

const GameLogicContext = createContext(initialObject);

export default GameLogicContext;
