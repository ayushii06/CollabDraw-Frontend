import { createContext, useState } from "react";
import { Offset, SelectedElement } from "../../models/types";
import { CanvaBg } from "../../utils/constants/colors";

export const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
      const [panOffset, setPanOffset] = useState<Offset>({ x: 0, y: 0 });
      const [scale, setScale] = useState<number>(1);
      const [scaleOffset, setScaleOffset] = useState<Offset>({ x: 0, y: 0 });
      const [selectedElement, setSelectedElement] = useState<SelectedElement>(null);
      const [cursors, setCursors] = useState({});
      const [action, setAction] = useState<string>("none");
      const [startPanMousePosition, setStartPanMousePosition] = useState<Offset>({
      x: 0,
      y: 0,
      });
      const [windowSize, setWindowSize] = useState<{
      width: number;
      height: number;
      }>({ width: 0, height: 0 });
      const [canvaBg,setCanvaBg]=useState<string>(CanvaBg.WHITE);
      const [isReset,setIsReset] = useState<boolean>(false);
      const [isDownload,setIsDownload] = useState<boolean>(false);
        
      return (
      <CanvasContext.Provider value={{panOffset,setPanOffset,scale,setScale,scaleOffset,setScaleOffset,selectedElement,setSelectedElement,cursors,setCursors,action,setAction,startPanMousePosition,setStartPanMousePosition,windowSize,setWindowSize,canvaBg,setCanvaBg,isReset,setIsReset,isDownload,setIsDownload}}>
            {children}
      </CanvasContext.Provider>
      );
};
