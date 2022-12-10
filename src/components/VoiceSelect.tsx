import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GameLogicContext from "../hooks/GameLogic/GameLogicContext";
import { BackwardsoleGameObject } from "../model/BackwardsoleGameObject";

const VoiceSelect = () => {
  const { setVoice, voice } = useContext(GameLogicContext);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[] | []>([]);
  const [nameToUse, setNameToUse] = useState("Alex");
  const gameObjectString = localStorage.getItem("backwardsole");
  const gameObject: BackwardsoleGameObject =
    gameObjectString && JSON.parse(gameObjectString)
      ? JSON.parse(gameObjectString)
      : null;

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    if(gameObject && gameObject.voiceName) setNameToUse(gameObject.voiceName);
    loadVoices();
  }, [voice]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedVoice = voices[selectedIndex];
    setVoice(selectedVoice);
    if (gameObject) {
      gameObject.voiceIndex = selectedIndex;
      gameObject.voiceName = voices[selectedIndex].name;
      localStorage.setItem("backwardsole", JSON.stringify(gameObject));
    }
  };

  return (
    <Container>
      <p>Voice Selection</p>
      <SelectorContainer>
        <Selector onChange={handleChange} >
          {voices.map((v, i) => {
            return (
              <option value={v.name} key={i}>
                {v.name}
              </option>
            );
          })}
        </Selector>
      </SelectorContainer>
    </Container>
  );
};

const Container = styled.div`
  text-align: left;

  @media (min-width: 320px) {
    text-align: center;
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Selector = styled.select`
  background-color: #121213;
  border: solid 1px #444;
  color: white;
`;

export default VoiceSelect;
