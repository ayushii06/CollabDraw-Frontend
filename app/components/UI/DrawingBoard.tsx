import React from "react";
import { handlePointerDown } from "../../engine/interaction/handlePointerDown";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { elementType, Options,Offset, ElementWithPosition } from "../../models/types";
import { handlePointerUp } from "../../engine/interaction/handlePointerUp";
import { handlePointerMove } from "../../engine/interaction/handlePointerMove";
import { SetHistoryState } from "../../models/history/history";
import { SelectedElement } from "../../models/element/setSelectedElement";



interface PropsType {
  canvaBg: string;
  panOffset: Offset;
  scaleOffset: Offset;
  scale: number;
  elements: Array<elementType>;
  action: string;
  selectedElement: SelectedElement;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  setElements: SetHistoryState;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement>>;
  setStartPanMousePosition: React.Dispatch<React.SetStateAction<Offset>>;
  startPanMousePosition: Offset;
  setPanOffset: React.Dispatch<React.SetStateAction<Offset>>;
  eraser: (element: elementType | ElementWithPosition) => void;
  windowSize: {
    width: number;
    height: number;
  };
canvasRef: React.RefObject<HTMLCanvasElement>
}

function DrawingBoard({
  canvaBg,
  selectedElement,
  panOffset,
  scale,
  scaleOffset,
  action,
  elements,
  setElements,
  setSelectedElement,
  setPanOffset,
  setAction,
  setStartPanMousePosition,
  startPanMousePosition,
  eraser,
  windowSize,
  canvasRef
}: PropsType) {
  const settings = useAppSelector((state) => state.menu);
  // console.log("ebgfbfrg",settings);
  const tool = useAppSelector((state) => state.toolbar.tool);
  const dispatch = useAppDispatch();
  const canvas = canvasRef.current;
  const options: Options = {
    strokeColor: settings.strokeColor,
    size: settings.size,
    thinning: settings.thinning,
    smoothing: settings.smoothing,
    streamline: settings.streamline,
    fillColor: settings.fillColor,
    strokeStyle: settings.strokeStyle,
  };

  // console.log(options);

  return (
    <>
    
    <canvas
    ref={canvasRef}
      id="canvas"
      style={{
        backgroundColor: canvaBg,
        cursor:
          tool === "pan"
            ? "grab"
            : tool === "select"
              ? " move"
              : tool === "eraser"
                ? "none"
                : tool === "text"
                  ? "text"
                  : tool === "rectangle"
                    ? "crosshair"
                    : tool === "circle"
                      ? "crosshair"
                      : tool === "line"
                        ? "crosshair"
                        : tool === "pen"
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
          tool,
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
          dispatch
        });
      }}
      onPointerMove={(e) => {
        handlePointerMove({
          e,
          action,
          tool,
          startPanMousePosition,
          setPanOffset,
          elements,
          setElements,
          selectedElement,
          options,
          panOffset,
          scaleOffset,
          scale,
          canvas
        });
      }}
      // onPointerLeave={(e) => {
      //   handlePointerUp({
      //     e,
      //     action,
      //     setAction,
      //     setElements,
      //     setSelectedElement,
      //     selectedElement,
      //     elements,
      //     options,
      //     panOffset,
      //     scaleOffset,
      //     scale
      //   });
      // }}
    ></canvas>
    </>
  );
}

export default DrawingBoard;
