import { useState } from "react";
import { elementType, ElementWithPosition } from "../models/types";

export type Elements = elementType[];

/*
-------------------------------------------------------------------------
-------------------------x UNDO / REDO ----------------------------------

Here, I am implementing the functionality of undo and redo functions.

Undo - Go back to previous state from now.
Redo - Go back to next state from now.

From the definitions itself, it is clear that there is a need to maintain the states.

We will create an array that will store array of element created till now.

history = [     
           0- [],
           1- [element1],
           2- [element1,element2],
           3- [element1,element2,element3],
          ]

As user press undo, the elements array will be now equal to index 2.
Then if user press redo, the elements array will be now equal to index 3.

*/


const useHistory = (initialState: elementType[]) => {
      // index is initially 0 and it will point to the array that is present in elements.
      const [index, setIndex] = useState<number>(0);
      // 2D array storing array of array of elements.
      const [history, setHistory] = useState<elementType[][]>([initialState]);


      const setState = (
        action: Elements | ((prev: Elements) => Elements),
        overwrite: boolean = false
      ) => {

        const prevState = Array.isArray(history[index]) ? history[index] : [];

        const newState =
          typeof action === "function"
            ? action(prevState)
            : action;

        const safeState = Array.isArray(newState) ? newState : [];

        if (overwrite) {
          const historyCopy = [...history];
          historyCopy[index] = safeState;
          setHistory(historyCopy);
        } else {
          const updatedState = history.slice(0, index + 1);
          setHistory([...updatedState, safeState]);
          setIndex(prev => prev + 1);
        }
      };

      // On UNDO, index will reduce by 1;
      const undo = () => index > 0 && setIndex(prevState => prevState - 1);
      
      // On REDO, index will increase by 1;
      const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

      // This is for permanently erasing an element.
      const eraser = (selectedElement: elementType | ElementWithPosition) => {

        const elements = [...history[index]];
        const elementIndex = elements.findIndex(element => element.id === selectedElement.id);

        if (elementIndex === -1) return;

        else if (elements.length === 1) {
          setHistory([[]]);
          setIndex(0);
        }
        else {
          elements.splice(elementIndex, 1);
          setHistory([...history.slice(0, index + 1), elements]);
          setIndex(prevState => prevState + 1);
        }
      }

      // For reseting the canvas, we need to set the history to initial state
      const resetCanvas = () =>{
        setHistory([[]]);
        setIndex(0);
      }

      return [history[index], setState, undo, redo, eraser,resetCanvas] as const;
};

export { useHistory }