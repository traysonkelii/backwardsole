import React, { useContext } from "react";
import styled from "styled-components";
import GameLogicContext from "../hooks/GameLogic/GameLogicContext";
import { BackwardsoleGameObject } from "../model/BackwardsoleGameObject";

const VoiceRateSelector = () => {
  const { setRate, rate } = useContext(GameLogicContext);
  const gameObjectString = localStorage.getItem("backwardsole");
  const gameObject: BackwardsoleGameObject =
    gameObjectString && JSON.parse(gameObjectString)
      ? JSON.parse(gameObjectString)
      : null;

  const handleOnChange = (e:any) => {

    const rate = e.target.value;
    if (gameObject) gameObject.rate = rate;
    setRate(rate);
    localStorage.setItem("backwardsole", JSON.stringify(gameObject));
  }

  return (
    <Container>
      <p>Playback Speed: {rate}x</p>
      <Slider
        type="range" min="0.1" max="2.0" step="0.1"
        value={rate}
        onChange={handleOnChange}
      />
    </Container>
  );
};

const Container = styled.div`
  text-align:left;
  @media (max-width: 320px) {
    text-align: center;
    /* add styles that will only be applied when the screen is at least 768px wide */
  }
`

const Slider = styled.input`
  background-color: #444;
  color: white;
  accent-color: #444;
`

export default VoiceRateSelector;
