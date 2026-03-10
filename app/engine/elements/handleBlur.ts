import React from "react";
import { elementType, Offset, SetHistoryState } from "../../models/types";
import { updateElement } from "./updateElement";

interface propsType {
      e: React.FocusEvent<HTMLTextAreaElement>;
      selectedElement: elementType;
      setAction: React.Dispatch<React.SetStateAction<string>>;
      setSelectedElement: React.Dispatch<
            React.SetStateAction<elementType | null>
      >;
      elements:Array<elementType>;
      setElements:SetHistoryState;
      setPanOffset:React.Dispatch<React.SetStateAction<Offset>>;

}

const handleBlur = ({ e, selectedElement, setAction, setSelectedElement ,elements,setElements,setPanOffset}: propsType) => {

      const { tool } = selectedElement;
      if (tool!="text") {
            return;
      }

      const { id, x1, y1 } = selectedElement;
      // console.log(selectedElement);
      setAction("none");
      setSelectedElement(null);
      updateElement({
            id, x1, y1, x2: null, y2: null, tool, options: {
                  text: e.target.value,
                  strokeColor: selectedElement.strokeColor,
                  size: selectedElement.size,
            },elements,setElements,setPanOffset
      });

}

export { handleBlur }