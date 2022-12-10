import React, { useContext } from "react";
import styled from "styled-components";
import PopUpLogicContext from "../hooks/PopUpLogic/PopUpLogicContext";

const PopUp = () => {
  const { title, body, isOpen, setIsOpen, hideCloseButton } = useContext(PopUpLogicContext);

  return isOpen ? (
    <ModalContainer>
      <Modal>
        <h1>{title}</h1>
        {body}
        {hideCloseButton ? null : <CloseButton onClick={() => setIsOpen(false)} hidden={hideCloseButton}>Close</CloseButton>}
      </Modal>
    </ModalContainer>
  ) : null;
};

export const CloseButton = styled.button`
  background-color: green;
  color: white;
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  position: fixed;
  transition: 2s all;
  z-index: 2;
`;

export const Modal = styled.div`
  text-align: center;
  border: 1px solid #444;
  z-index: 1;
  background-color: #121213;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  padding: 20px;
  border-radius: 5px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  transition: 2s all;

  @media (min-width: 320px) {
    display: block;
    text-align: center;
    padding: 10px 20px;
    border-radius: 5px;
    width: 300px;
    /* add styles that will only be applied when the screen is at least 768px wide */
  }
`;

export default PopUp;
