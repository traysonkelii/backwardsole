import { useState } from "react";
import PopUpLogicContext from "./PopUpLogicContext";

const PopUpLogicContextProvider = ({ children }: any) => {
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [hideCloseButton, setHideCloseButton] = useState(false);
  

  return (
    <PopUpLogicContext.Provider
      value={{
        title,
        body,
        isOpen,
        setBody,
        setIsOpen,
        setTitle,
        hideCloseButton,
        setHideCloseButton
      }}
    >
      {children}
    </PopUpLogicContext.Provider>
  );
};

export default PopUpLogicContextProvider;
