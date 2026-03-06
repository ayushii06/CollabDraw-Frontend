import { useState } from "react";
import { ElementWithPosition } from "../utils/elementUtility";
import { elementType } from "../lib/types";

export type Elements = elementType[];


const useHistory = (initialState:elementType[]) => {
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<elementType[][]>([initialState]);

  const setState = (action:Elements | ((prev: Elements) => Elements), overwrite:boolean = false) => {
    const newState = (typeof action === "function" )? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } 
    else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex(prevState => prevState + 1);
    }

  };

  const undo = () => index > 0 && setIndex(prevState => prevState - 1);
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

  const eraser = (selectedElement:elementType|ElementWithPosition) => {
   
    const elements = [...history[index]];
    const elementIndex = elements.findIndex(element => element.id === selectedElement.id);

    if(elementIndex === -1) return;

    else if(elements.length === 1){
      setHistory([[]]);
      setIndex(0);
    }
    else{
      elements.splice(elementIndex, 1);
      setHistory([...history.slice(0, index + 1), elements]);
      setIndex(prevState => prevState + 1);

      
    }

    


  }

  return [history[index], setState, undo, redo, eraser] as const;
};

export {useHistory}