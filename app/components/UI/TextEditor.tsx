import React, { useEffect, useRef } from "react";
import { Offset } from "./Home";
import { handleBlur } from "../../utils/handleBlur";
import { elementType } from "../../lib/types";

interface propsType {
  selectedElement: elementType;
  panOffset: Offset;
  scale: number;
  scaleOffset: Offset;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<elementType>
  >;
  action: string;
}

function TextEditor({
  selectedElement,
  panOffset,
  scale,
  scaleOffset,
  action,
  setAction,
  setSelectedElement,
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
        });
      }}
      ref={textAreaRef}
      style={{
        position: "relative",
        top:
          (selectedElement.y1 - 2) * scale +
          panOffset.y * scale -
          scaleOffset.y,
        left: selectedElement.x1 * scale + panOffset.x * scale - scaleOffset.x,
        font: `${selectedElement.size * scale}px Comic Sans MS`,
        fontWeight: "bold",
        color: selectedElement.color,
        resize: "none",
        outline: "none",
        backgroundColor: "transparent",
        zIndex: 2,
      }}
    />
  );
}

export default TextEditor;
