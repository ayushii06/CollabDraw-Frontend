import { elementType, Options, ToolBar } from "../../models/types";

interface CreateElementProps {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tool: ToolBar;
  options: Options;
}

/*
--------------------------------------------------------------------------
------------------------x CREATE ELEMENTS x-------------------------------

This engine handles with creating element that will be pushed in the elements array,
which will be drawn during rendering.

It's a type of utility that returns all the info required to draw the element.

Workflow -  
          Find the element type -> return relevant info;
      
1. For 'line' , 'rect', 'circle' , we are using canvas rendering context, 
so we need x1,x2,y1,y2

2. For 'pen', we are using perfect freehand, so we need collection of points

3. For 'text', we are using simply textarea, so we need text,font color and size.

Color and size are common properties, needed in all.

*/

const createElement = ({
  id,
  x1,
  y1,
  x2,
  y2,
  tool,
  options,
}: CreateElementProps): elementType => {

  switch (tool) {
    case "line":
    case "rectangle":
    case "circle":
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        tool,
        strokeColor: options.strokeColor,
        size: options.size,
        strokeStyle: options.strokeStyle,
        fillColor: options.fillColor,
      };

    case "pen":
      return {
        id,
        tool,
        points: [{ x: x1, y: y1 }],
        strokeColor: options.strokeColor,
        size: options.size,
        thinning: options.thinning,
        smoothing: options.smoothing,
        streamline: options.streamline,
      };

    case "text":
      return {
        id,
        tool,
        x1,
        y1,
        x2,
        y2,
        strokeColor: options.strokeColor,
        size: options.size,
        text: "",
      };

    default:
      throw new Error("Unknown tool");
  }
};

export { createElement };