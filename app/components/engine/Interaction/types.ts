import { elementType, fillStyle, Options, strokeStyle, ToolBar } from "../../../lib/types";
import { ElementWithPosition } from "../../../utils/elementUtility";
import { SetHistoryState } from "../../UI/DrawingBoard";
import { Offset, SelectedElement } from "../../UI/Home";


interface pointerType {
      e: React.PointerEvent<HTMLCanvasElement>;
      elements: Array<elementType>;
      action: string;

}

export interface pointerDown extends pointerType {
      panOffset: Offset;
      scaleOffset: Offset;
      scale: number;
      setAction: React.Dispatch<React.SetStateAction<string>>;
      tool: string;
      setElements: SetHistoryState;
      setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement>>;
      setStartPanMousePosition: React.Dispatch<React.SetStateAction<Offset>>;
      options:Options;
      ctx:CanvasRenderingContext2D|null;
}

export interface pointerMove extends pointerType {
      startPanMousePosition: Offset;
      selectedElement: SelectedElement;
      tool: string;
      setPanOffset: React.Dispatch<React.SetStateAction<Offset>>;
      setElements: SetHistoryState;
      options:Options;
      panOffset:Offset;
      scaleOffset:Offset;
      scale:number;
}

export interface pointerUp extends pointerType {
      selectedElement: SelectedElement;
      setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement>>;
      setAction: React.Dispatch<React.SetStateAction<string>>;
      options:Options;
      setElements:SetHistoryState;
      panOffset:Offset;
      scaleOffset:Offset;
      scale:number;

}

export interface pointerDoubleClick extends pointerType {
      eraser: (element: elementType | ElementWithPosition) => void;
      panOffset:Offset;
      scaleOffset:Offset;
      scale:number;
}