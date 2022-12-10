import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import "./App.css";
import ControlPanel from "./components/ControlPanel";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import PopUp from "./components/PopUp";
import SubmissionPanel from "./components/SubmissionPanel";
import Timer from "./components/Timer";
import GameLogicContext from "./hooks/GameLogic/GameLogicContext";
import PopUpLogicContext from "./hooks/PopUpLogic/PopUpLogicContext";
import {
  BackwardsoleGameObject,
  StartingGameObject,
} from "./model/BackwardsoleGameObject";

function App() {
  const { setWordToGuess } = useContext(GameLogicContext);
  const { setTitle, setBody, setIsOpen, isOpen, setHideCloseButton } =
    useContext(PopUpLogicContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textToCopy, setTextToCopy] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    console.log('Use effect called')

    const gameObjectString = localStorage.getItem("backwardsole");
    const gameObject: BackwardsoleGameObject =
      gameObjectString && JSON.parse(gameObjectString)
        ? JSON.parse(gameObjectString)
        : null;
    if (!gameObject) {
      setTitle("Welcome to Backwardsole");
      setBody(
        <>
          <p>
            A 5 letter word will be read in reverse and
            you must guess the word
          </p>
          <p>
            You have unlimited guesses, but you can only hear the
            word 6 times
          </p>
          <p>
            If you cannot figure out the word you lose
          </p>
        </>
      );
      setIsOpen(true);
      const toStore = StartingGameObject;
      setWordToGuess(toStore.answer);
      localStorage.setItem("backwardsole", JSON.stringify(toStore));
    } else if (gameObject.gameOver) {
      const copyToClipboard = async () => {
        if (textAreaRef.current !== null) {
          try {
            setTextCopied(true);
            await navigator.clipboard.writeText(textToCopy);
            await navigator.share({ title: textToCopy });
          } catch (err) {
            // Fallback for older browsers that do not support the clipboard API
            textAreaRef.current.select();
            document.execCommand("copy");
          }
        }
      };

      let toShare = "#Backwardsole: \n\n";
      gameObject.rows.forEach((row) => {
        if (row && row !== undefined && !row.isEnabled) toShare += "⬛";
        else if (row.winningRow) toShare += "🟩";
        else toShare += "⬜";
      });
      setTextToCopy(toShare);
      setTitle(gameObject.gameWon ? "Congrats you win" : "Sorry you lose");
      setHideCloseButton(true);
      setBody(
        <>
          <p>The next backwardsole will be posted in: </p>
          <Timer hide={false} />
          <p>Today's Answer: {gameObject.answer}</p>
          <textarea
            ref={textAreaRef}
            defaultValue={toShare}
            style={{ display: "none" }}
          />
          <ModalButton
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard();
            }}
          >
            Share your results
          </ModalButton>
        </>
      );
      setIsOpen(true);
    }
  }, [isOpen, textCopied, gameOver]);

  return (
    <Container>
      <Header />
      <ControlPanel />
      <GameBoard />
      <SubmissionPanel gameIsOver={setGameOver} />
      <PopUp />
      <TextCopiedToast isVisible={textCopied} setIsVisible={setTextCopied}/>
    </Container>
  );
}

const TextCopiedToast = ({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: Function }) => {

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }
  }, [isVisible]);

  return isVisible ? (
    <TextCopiedToastContainer>Text Copied</TextCopiedToastContainer>
  ) : null;
};

const TextCopiedToastContainer = styled.div`
  z-index: 4;
  background-color: black;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 8px;
  border-radius: 5px;
  transition: 2s all;
`;

const Container = styled.div`
  margin-bottom: 3%;
`;

const ModalButton = styled.div`
  padding: 12px 8px;
  background-color: green;
  border-radius: 5px;
  width: 200px;
  margin: 10px auto 0px auto;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default App;
