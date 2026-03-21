import { createContext, useState } from "react";
import { Options, ToolBar } from "../../models/types";
import { fillColor, strokeColor } from "../../utils/constants/colors";

export const ToolContext = createContext(null);

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
      const [selectedTool, setSelectedTool] = useState<ToolBar>("pen");

      const initialState: Options = {
            strokeColor: strokeColor.BLACK,
            size: 4,
            fillColor: fillColor.TRANSPARENT,
            strokeStyle: "Solid",
           
      };

      const [options, setOptions] = useState<Options>(initialState);

      return (
      <ToolContext.Provider value={{ selectedTool, setSelectedTool,options,setOptions }}>
            {children}
      </ToolContext.Provider>
      );
};
