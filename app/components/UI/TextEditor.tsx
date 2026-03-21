import React, { useEffect, useRef } from "react";
import { handleBlur } from "../../engine/elements/handleBlur";
import { useCanvas } from "../../context/canvasContext/useCanvas";

/*
---------------------------------------------------------------------------------
-----------------------------x TextEditor x--------------------------------------
*/

function TextEditor() {
  const {selectedElement, panOffset, scale, scaleOffset, action, setAction, setSelectedElement, elements, setElements, setPanOffset,} = useCanvas();
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
