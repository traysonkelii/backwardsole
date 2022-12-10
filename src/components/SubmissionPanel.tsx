import React, { useContext, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import styled from "styled-components";
import GameLogicContext from "../hooks/GameLogic/GameLogicContext";
import PopUpLogicContext from "../hooks/PopUpLogic/PopUpLogicContext";
import { BackwardsoleGameObject, Rows } from "../model/BackwardsoleGameObject";

const SubmissionPanel = ({gameIsOver} : {gameIsOver: Function}) => {
  const {
    voice,
    rate,
    wordToGuess,
    currentIndex,
    setCurrentIndex,
    rows,
    setRows,
  } = useContext(GameLogicContext);

  const { setTitle, setBody, setIsOpen } = useContext(PopUpLogicContext);

  const msg = new SpeechSynthesisUtterance();
  const [guess, setGuess] = useState("");
  const gameObjectString = localStorage.getItem("backwardsole");
  const gameObject: BackwardsoleGameObject =
    gameObjectString && JSON.parse(gameObjectString)
      ? JSON.parse(gameObjectString)
      : null;

  const gameState =
    gameObject && gameObject.gameOver ? gameObject.gameOver : false;
  const [gameOver, setGameOver] = useState(gameState);

  const handleClick = () => {
    if (currentIndex >= 5) {
      setGameOver(true);
      gameIsOver(true);
      gameObject.gameOver = gameOver;
      gameObject.gameWon = false;
      localStorage.setItem("backwardsole", JSON.stringify(gameObject));
    }

    msg.rate = rate;
    msg.voice = voice;
    msg.text = wordToGuess.split("").reverse().join("");
    if (currentIndex < 5) window.speechSynthesis.speak(msg);

    rows[currentIndex].isEnabled = false;
    const newRows: { words: string[]; isEnabled: boolean; winningRow: boolean }[] = [];
    rows.forEach((row) => newRows.push(row));
    if (gameObject) {
      gameObject.rows = newRows;
      gameObject.currentIndex = currentIndex + 1;
    }
    setRows(newRows);
    setCurrentIndex(currentIndex + 1);
    localStorage.setItem("backwardsole", JSON.stringify(gameObject));
  };

  const handleSubmit = () => {
    const gameObjectString = localStorage.getItem("backwardsole");
    const gameObject: BackwardsoleGameObject =
      gameObjectString && JSON.parse(gameObjectString)
        ? JSON.parse(gameObjectString)
        : null;

    setGuess("");
    if (guess.toLowerCase() === wordToGuess.toLowerCase()) {
      setGameOver(true);
      gameIsOver(true);
      gameObject.gameOver = true;
      gameObject.gameWon = true;
      gameObject.rows[gameObject.currentIndex].winningRow = true;
      localStorage.setItem("backwardsole", JSON.stringify(gameObject));
    } else {
      rows[currentIndex].words.push(guess);
      const newRows: Rows[] = [];
      rows.forEach((row) => newRows.push(row));
      if (gameObject) gameObject.rows = newRows;
      setRows(newRows);
      localStorage.setItem("backwardsole", JSON.stringify(gameObject));
    }
  };

  return (
    <SubmissionContainer hide={gameOver}>
      <ListenButton handleClick={handleClick} />
      <Submission
        placeholder="Guess Here"
        maxLength={5}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <SubmitButton onClick={() => handleSubmit()}>Submit</SubmitButton>
    </SubmissionContainer>
  );
};

const SubmitButton = styled.button`
  padding: 6px 12px;
  background-color: green;
  color: black;
  border-radius: 5px;
  border: 1px solid #444;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

type ListenButtonProps = {
  handleClick: Function;
};

const ListenButton = (props: ListenButtonProps) => {
  return (
    <ListenButtonContainer>
      <FaRegPlayCircle onClick={() => props.handleClick()} size={48} />
    </ListenButtonContainer>
  );
};

const ListenButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

type SubmissionContainerProps = {
  hide: boolean;
};

const SubmissionContainer = styled.div<SubmissionContainerProps>`
  display: ${(props) => (props.hide ? "none" : "flex")};
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 2%;
`;

const Submission = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid #444;
  padding: 12px 0px;
  color: white;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  ::placeholder {
    color: gray;
  }
  &:focus {
    border: none;
    outline-style: none;
    box-shadow: none;
    border-bottom: 1px solid #444;
  }
`;

export default SubmissionPanel;
