import React from "react";
import styled from "styled-components";
import VoiceRateSelector from "./VoiceRateSelector";
import VoiceSelect from "./VoiceSelect";
import VoiceTestButton from "./VoiceTestButton";

const ControlPanel = () => {

  return (  
    <ControlPanelContainer>
      <VoiceTestButton />
      <VoiceSelect />
      <VoiceRateSelector />
    </ControlPanelContainer>
  );
};

const ControlPanelContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 2%;

  @media (min-width: 320px) {
    display: block;
    text-align: center;
  }
`

export default ControlPanel;
