"use client";
import React from "react";
import { handlePointerDown } from "../../engine/interaction/handlePointerDown";
import { handlePointerUp } from "../../engine/interaction/handlePointerUp";
import { handlePointerMove } from "../../engine/interaction/handlePointerMove";
import { useCanvas } from "../../context/canvasContext/useCanvas";
import { useTool } from "../../context/toolContext/useTool";
import { elementType } from "../../models/types";
import { useRoom } from "../../context/roomContext/useRoom";

interface PropsType {
  elements:Array<elementType>;
  setElements: (
  action: Array<elementType> | ((prev: Array<elementType> ) => Array<elementType> ),
  overwrite?: boolean
) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

function DrawingBoard({ canvasRef,elements,setElements }: PropsType) {
  const {
    canvaBg,
    selectedElement,
    panOffset,
    scale,
    scaleOffset,
    action,
    setSelectedElement,
    setPanOffset,
    setAction,
    setStartPanMousePosition,
    startPanMousePosition,
    windowSize,
  } = useCanvas();

  const {roomId} = useRoom();
  const {selectedTool,setSelectedTool,options} = useTool();
  const canvas = canvasRef.current;

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          backgroundColor: canvaBg,
          cursor:
            selectedTool === "pan"
              ? "grab"
              : selectedTool === "select"
              ? " move"
              : selectedTool === "eraser"
              ? "none"
              : selectedTool === "text"
              ? "text"
              : selectedTool === "rectangle"
              ? "crosshair"
              : selectedTool === "circle"
              ? "crosshair"
              : selectedTool === "line"
              ? "crosshair"
              : selectedTool === "pen"
              ? "none"
              : "default",
          position: "absolute",
          zIndex: 1,
        }}
        width={windowSize.width}
        height={windowSize.height}
        onPointerDown={(e) => {
          handlePointerDown({
            e,
            panOffset,
            scaleOffset,
            scale,
            action,
            setAction,
            selectedTool,
            elements,
            setElements,
            setSelectedElement,
            setStartPanMousePosition,
            options,
          });
        }}
        onPointerUp={(e) => {
          handlePointerUp({
            e,
            action,
            setAction,
            setElements,
            setSelectedElement,
            selectedElement,
            elements,
            options,
            panOffset,
            scaleOffset,
            scale,
            setSelectedTool,
            roomId
          });
        }}
        onPointerMove={(e) => {
          handlePointerMove({
            e,
            action,
            selectedTool,
            startPanMousePosition,
            setPanOffset,
            elements,
            setElements,
            selectedElement,
            options,
            panOffset,
            scaleOffset,
            scale,
            canvas,
            roomId
            
          });
        }}
      ></canvas>
    </>
  );
}

export default DrawingBoard;
