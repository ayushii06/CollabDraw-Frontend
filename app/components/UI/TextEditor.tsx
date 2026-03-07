import React, { useEffect, useRef } from "react";
import { handleBlur } from "../../engine/elements/handleBlur";
import { elementType, SetHistoryState } from "../../models/types";
import { Offset } from "../../models/types";

interface propsType {
  selectedElement: elementType;
  panOffset: Offset;
  scale: number;
  scaleOffset: Offset;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElement: React.Dispatch<React.SetStateAction<elementType>>;
  action: string;
  elements: Array<elementType>;
  setElements: SetHistoryState;
  setPanOffset: React.Dispatch<React.SetStateAction<Offset>>;
}

/*
---------------------------------------------------------------------------------
-----------------------------x TextEditor x--------------------------------------
*/

function TextEditor({
  selectedElement,
  panOffset,
  scale,
  scaleOffset,
  action,
  setAction,
  setSelectedElement,
  elements,
  setElements,
  setPanOffset,
}: propsType) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  if (selectedElement.tool != "text") {
    return null;
  }

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (action === "write" && textArea && selectedElement) {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement.text;
      }, 0);
    }
  }, [action, selectedElement]);

  return (
    <textarea
      onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
        handleBlur({
          e,
          selectedElement,
          setAction,
          setSelectedElement,
          elements,
          setElements,
          setPanOffset,
        });
      }}
      ref={textAreaRef}
      style={{
        position: "absolute",
        top:
          (selectedElement.y1 - 2) * scale +
          panOffset.y * scale -
          scaleOffset.y,
        left: selectedElement.x1 * scale + panOffset.x * scale - scaleOffset.x,
        font: `${selectedElement.size * scale}px Comic Sans MS`,
        fontWeight: "bold",
        strokeColor: selectedElement.strokeColor,
        resize: "none",
        outline: "none",
        backgroundColor: "transparent",
        zIndex: 2,
      }}
    />
  );
}

export default TextEditor;
