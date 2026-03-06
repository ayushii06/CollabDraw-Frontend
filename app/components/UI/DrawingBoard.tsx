import React from "react";
import { ElementWithPosition } from "../../utils/elementUtility";
import { Elements } from "../../hooks/useHistory";
import { SelectedElement } from "./Home";
import { handlePointerDown } from "../engine/Interaction/handlePointerDown";
import { useAppSelector } from "../../hooks/reduxHooks";
import { elementType, Options } from "../../lib/types";
import { handlePointerUp } from "../engine/Interaction/handlePointerUp";
import { handlePointerMove } from "../engine/Interaction/handlePointerMove";
import { handlePointerDoubleClick } from "../engine/Interaction/handlePointerDoubleClick";

type Offset = {
  x: number;
  y: number;
};

export type SetHistoryState = (
  action: Elements | ((prev: Elements) => Elements),
  overwrite?: boolean,
) => void;

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
  ctx:CanvasRenderingContext2D|null;
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
  ctx
}: PropsType) {
  const tool = useAppSelector((state)=>state.toolbar.tool);
  const color = useAppSelector((state) => state.menu[tool]?.color || "black");
  const size = useAppSelector((state) => state.menu[tool]?.size || 5);
  const thinning = useAppSelector((state) => state.menu[tool]?.thinning || 0.5);
  const smoothing = useAppSelector(
    (state) => state.menu[tool]?.smoothing || 0.5,
  );
  const streamline = useAppSelector(
    (state) => state.menu[tool]?.streamline || 0.5,
  );
  const fill = useAppSelector((state) => state.menu[tool]?.fill || "white");
  const style = useAppSelector((state) => state.menu[tool]?.style || "solid");
  const fillStyle = useAppSelector(
    (state) => state.menu[tool]?.fillStyle || "solid",
  );
  // const text = useAppSelector((state) => state.menu[text]);

  const options: Options = {
    color: color,
    size: size,
    thinning: thinning,
    smoothing: smoothing,
    streamline: streamline,
    fill: fill,
    fillStyle: fillStyle,
    style: style,
    // text: text,
  };

  return (
    <canvas
      id="canvas"
      style={{
        backgroundColor: canvaBg,
        cursor:
          tool === "pan"
            ? "grab"
            : tool === "select"
              ? " move"
              : tool === "eraser"
                ? "crosshair"
                : tool === "text"
                  ? "text"
                  : tool === "rectangle"
                    ? "crosshair"
                    : tool === "circle"
                      ? "crosshair"
                      : tool === "line"
                        ? "crosshair"
                        : tool === "pen"
                          ? "crosshair"
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
          ctx
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
          scale 
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
          scale 
        });
      }}
      onPointerMoveCapture={(e) =>
        handlePointerDoubleClick({
          e,
          action,
          elements,
          eraser,
          panOffset,
          scaleOffset,
          scale 
        })
      }
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
  );
}

export default DrawingBoard;
