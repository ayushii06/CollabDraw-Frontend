import React from "react";
import { updateElement } from "../components/engine/State/updateElement";
import { elementType } from "../lib/types";

interface propsType{
      e: React.FocusEvent<HTMLTextAreaElement>;
  selectedElement: elementType;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<elementType | null>
  >;

}

const handleBlur = ({ e, selectedElement, setAction, setSelectedElement}:propsType) => {

      const { tool } = selectedElement;
      if(tool=="pen"){
            return ;
      }

      const {id,x1,y1} = selectedElement;
      setAction("none");
      setSelectedElement(null);
      updateElement({id, x1, y1, x2:null, y2:null, tool, options:{
            text: e.target.value,
            color: selectedElement.color,
            size: selectedElement.size,
}});

}

export { handleBlur }