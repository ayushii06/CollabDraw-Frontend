
import { elementType } from "../element/element";
import { Options } from "../options/options";
import { ToolBar } from "../toolbar/tool";
import { ElementWithPosition, Offset, SelectedElement, SetHistoryState } from "../types";


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
      selectedTool: ToolBar;
      setElements: SetHistoryState;
      setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElement>>;
      setStartPanMousePosition: React.Dispatch<React.SetStateAction<Offset>>;
      options:Options;
}

export interface pointerMove extends pointerType {
      startPanMousePosition: Offset;
      selectedElement: SelectedElement;
      selectedTool: ToolBar;
      setPanOffset: React.Dispatch<React.SetStateAction<Offset>>;
      setElements: SetHistoryState;
      options:Options;
      panOffset:Offset;
      scaleOffset:Offset;
      scale:number;
      canvas:HTMLCanvasElement|null;
      roomId:string
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
      setSelectedTool:React.Dispatch<React.SetStateAction<ToolBar>>;
      roomId:string

}

export interface pointerDoubleClick extends pointerType {
      eraser: (element: elementType | ElementWithPosition) => void;
      panOffset:Offset;
      scaleOffset:Offset;
      scale:number;
}