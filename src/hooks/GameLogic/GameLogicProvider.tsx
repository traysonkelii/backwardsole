import { useState } from "react";
import { BackwardsoleGameObject } from "../../model/BackwardsoleGameObject";
import GameLogicContext from "./GameLogicContext";

const GameLogicContextProvider = ({ children }: any) => {

  const gameObjectString = localStorage.getItem("backwardsole");
  const gameObject: BackwardsoleGameObject =
    gameObjectString && JSON.parse(gameObjectString)
      ? JSON.parse(gameObjectString)
      : null;

  const emptyRows = [
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
    { words: [], isEnabled: true, winningRow: false },
  ];

  const rowsToUse = gameObject && gameObject.rows ? gameObject.rows : emptyRows;
  const indexToUse = gameObject && gameObject.currentIndex ? gameObject.currentIndex : 0;
  const rateToUse = gameObject && gameObject.rate ? gameObject.rate : 1;
  const voiceToUse = null;
  const voiceIndexToUse = gameObject && gameObject.voiceIndex ? gameObject.voiceIndex : 0;
  const answer = gameObject && gameObject.answer ? gameObject.answer : '';
  const gameIsOver = gameObject && gameObject.gameOver ? gameObject.gameOver : false;

  const [rows, setRows] = useState(rowsToUse);
  const [rate, setRate] = useState(rateToUse);
  const [wordToGuess, setWordToGuess] = useState(answer);
  const [voice, setVoice] = useState<null | SpeechSynthesisVoice>(voiceToUse);
  const [currentIndex, setCurrentIndex] = useState(indexToUse);
  const [gameOver, setGameOver] = useState(gameIsOver);

  return (
    <GameLogicContext.Provider
      value={{
        rate,
        setRate,
        wordToGuess,
        setWordToGuess,
        voice,
        voiceIndex: voiceIndexToUse,
        setVoice,
        rows,
        setRows,
        currentIndex,
        setCurrentIndex,
        gameOver,
        setGameOver
      }}
    >
      {children}
    </GameLogicContext.Provider>
  );
};

export default GameLogicContextProvider;
