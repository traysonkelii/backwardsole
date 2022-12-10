import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import styled from "styled-components";
import GameLogicContext from "../hooks/GameLogic/GameLogicContext";
import { BackwardsoleGameObject } from "../model/BackwardsoleGameObject";

const FirstListenButton = () => {
  return (
    <Container>
      <StartButton />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 5px;
  margin-top: 15px;
  @media (min-width: 320px) {
    display: block;
    text-align: center;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px auto 0px auto;
    /* add styles that will only be applied when the screen is at least 768px wide */
  }
`;

const StartButton = () => {
  const { voice, rate, wordToGuess } = useContext(GameLogicContext);
  const [isVisible, setIsVisible] = useState(true);
  const gameObjectString = localStorage.getItem("backwardsole");
  const gameObject: BackwardsoleGameObject =
    gameObjectString && JSON.parse(gameObjectString)
      ? JSON.parse(gameObjectString)
      : null;

  useEffect(() => {
    if (gameObject && gameObject.playedFirstListen) setIsVisible(false);
  });

  const handleClick = () => {
    const msg = new SpeechSynthesisUtterance();
    setIsVisible(false);
    msg.rate = rate;
    msg.voice = voice;
    msg.text = wordToGuess.split("").reverse().join("");
    window.speechSynthesis.speak(msg);
    gameObject.playedFirstListen = true;
    localStorage.setItem("backwardsole", JSON.stringify(gameObject));
  };

  return (
    <StartButtonStyled visible={isVisible} onClick={() => handleClick()}>
      <FaPlayCircle size={24} /> &nbsp; START &nbsp;
    </StartButtonStyled>
  );
};

type StartButtonProps = {
  visible: boolean;
};
const StartButtonStyled = styled.button<StartButtonProps>`
  /* padding: 6px 12px; */
  background-color: green;
  color: black;
  border-radius: 5px;
  border: 1px solid #444;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  display: ${(props) => (props.visible ? "" : "none")};

  @media (min-width: 320px) {
    margin: 10px auto 0px auto;
  }

`;
export default FirstListenButton;
