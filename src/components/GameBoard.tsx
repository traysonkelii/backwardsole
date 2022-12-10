import React, { useContext } from "react";
import styled from "styled-components";
import GameLogicContext from "../hooks/GameLogic/GameLogicContext";
import FirstListenButton from "./FirstListenButton";

const GameBoard = () => {
  const { rows } = useContext(GameLogicContext);

  return (
    <Container>
      <FirstListenButton />
      <GameBoardContainer>
        {rows.map((row, i) => (
          <Row key={i} words={row.words} isEnabled={row.isEnabled} winningRow={row.winningRow} />
        ))}
      </GameBoardContainer>
    </Container>
  );
};

type RowProps = {
  words: string[];
  isEnabled: boolean;
  winningRow: boolean;
};
const Row = (props: RowProps) => {
  return (
    <RowStyle isEnabled={props.isEnabled}>
      {props.words.map((word, i) => (
        <RowItem key={i}>❌{word}</RowItem>
      ))}
    </RowStyle>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  flex-direction: column;
  @media (min-width: 320px) {
    display: block;
    text-align: center;
    /* add styles that will only be applied when the screen is at least 768px wide */
  }
`;

const GameBoardContainer = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  max-width: 640px;
  overflow-y: scroll;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 320px) {
    display: block;
    text-align: center;
    max-width: 320px;
    /* add styles that will only be applied when the screen is at least 768px wide */
  }
`;

type RowStyleProps = { isEnabled: boolean };
const RowStyle = styled.div<RowStyleProps>`
  display: flex;
  height: 40px;
  border: solid 1px #444;
  background-color: ${(props) => (props.isEnabled ? "#FFFFFF00" : "#444")};
  gap: 10px;
  align-items: flex-start;
  float: left;
  width: 100%;
  padding-left: 10px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 320px) {
    display: block;
    height: 25px;
    /* add styles that will only be applied when the screen is at least 768px wide */
  }
`;

const RowItem = styled.div`
  margin: auto 0;
  text-transform: uppercase;
  opacity: 0.7;
`;

export default GameBoard;