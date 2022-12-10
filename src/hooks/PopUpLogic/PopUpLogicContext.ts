import { createContext } from "react";

type PopUpLogicContextType = {
  title: string;
  setTitle: Function
  body: any;
  setBody: Function
  isOpen: boolean;
  setIsOpen: Function;
  setHideCloseButton: Function;
  hideCloseButton: boolean;
}

const initialObject: PopUpLogicContextType = {
  title: '',
  setTitle: () => {},
  body: '',
  setBody: () => {},
  isOpen: false,
  setIsOpen: () => {},
  setHideCloseButton: () => {},
  hideCloseButton: true
}

const PopUpLogicContext = createContext(initialObject);

export default PopUpLogicContext;
