import React, { useContext } from "react";
import styled from "styled-components";
import { FaChartBar, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
import PopUpLogicContext from "../hooks/PopUpLogic/PopUpLogicContext";

const Header = () => {
  const { setIsOpen, setTitle, setBody } = useContext(PopUpLogicContext);
  return (
    <Container>
      <HeaderContainer>
        <Icon
          onClick={() => {
            setIsOpen(true);
            setBody(
              <ul>
                <li>
                  First set the voice with the accent and rate that you hear
                  best
                </li>
                <li>
                  Click Start and listen for the 5 letter word being read in
                  reverse
                </li>
                <li>
                  You can guess as many times as you would like, but you only
                  have six chances to hear the word
                </li>
                <li>After your sixth listen you lose</li>
                <li>If you can guess the word before then you win</li>
              </ul>
            );
            setTitle("How To Play");
          }}
        >
          <FaInfoCircle size={24} />
        </Icon>
        <HeaderText>Backwordsle</HeaderText>
        <Icon
          onClick={() => {
            setIsOpen(true);
            setTitle("Coming soon!");
            setBody(<p>The application is currently in Beta. Full release will have more features!</p>);
          }}
        >
          <FaChartBar size={24} />
        </Icon>
        <Icon
          onClick={() => {
            setIsOpen(true);
            setTitle("Coming soon!");
            setBody(<p>The application is currently in Beta. Full release will have more features!</p>);
          }}
        >
          <FaQuestionCircle size={24} />
        </Icon>
      </HeaderContainer>
    </Container>
  );
};

const HeaderText = styled.h1`
  padding: 0px;
  margin: 0px;
  text-align: center;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.04em;
`;

const Container = styled.div`
  padding: 0px;
  height: 57px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  border-bottom: 1px solid rgb(136, 136, 136);
`;

const HeaderContainer = styled.div`
  width: 768px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 8px 4px;
`;

const Icon = styled.button`
  background: none;
  border: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: white;
  margin: 0px;
  padding: 0px 12px;
  cursor: pointer;
  border-radius: 2px;
`;

export default Header;
