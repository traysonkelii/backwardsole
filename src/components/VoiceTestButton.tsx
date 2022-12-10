import React, { MouseEventHandler, useContext } from "react";
import { FaPlay } from "react-icons/fa";
import styled from "styled-components";
import GameLogicContext from "../hooks/GameLogic/GameLogicContext";

const VoiceTestButton = () => {
  const { voice, rate } = useContext(GameLogicContext);

  const testVoice = () => {
    const msg = new SpeechSynthesisUtterance();
    if(voice) msg.voice = voice;
    msg.rate = rate
    msg.text = "I will be your voice";
    window.speechSynthesis.speak(msg);
  };

  return (
    <Container>
      <p>Test Voice</p>
      <PlayButton handleClick={testVoice} />
    </Container>
  );
};

export default VoiceTestButton;

const Container = styled.div`
  text-align: center;
`

type PlayButtonProps = {
  handleClick: MouseEventHandler<SVGElement>;
};

const PlayButton = (props: PlayButtonProps) => {
  return (
    <PlayButtonContainer>
      <FaPlay size={12} onClick={props.handleClick} />
    </PlayButtonContainer>
  );
};

const PlayButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
