import { elementType, Options, penType, SetHistoryState, ToolBar,Offset } from "../../models/types";
import { createElement } from "./createElement";


interface propsType {
      id: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      tool: ToolBar;
      elements?: Array<elementType>;
      setElements?: SetHistoryState;
      setPanOffset?: React.Dispatch<React.SetStateAction<Offset>>;
      options: Options;
}

/*
--------------------------------------------------------------------------
----------------------------x UPDATE ELEMENT x----------------------------

Our drawn elements are stores in the elements array identified by the id. 
Whenver we updates any of the element, we will search it through the id and then replace it with the updated element.

The update could be through using pen tool, line tool, rectangle tool, circle tool, eraser tool, pan tool, text tool, select tool.

The eraser and select tool logic is in another file. Here, we have logic of updation of coordinates (x2,y2) of the element we are currently drawing.

1. In case of pen tool, we are adding new (x2,y2) as new points in the array points of pen tool;

2. In case of line, rect & circle tool, we are updating the (x2,y2).

3. In case of text tool, we are updating it's size.

4. If the tool is pan tool, we are updating the panOffset.
To get detailed knowledge of panning, it's logic is stored in another file.

And, at the end, we are using setElements(), to store the elements in the array.
*/

const updateElement = ({ id, x1, y1, x2, y2, tool, options, elements, setElements, setPanOffset }: propsType) => {

      // To maintain immutability, instead of modifying elements[id], we created a copy:
      // elementsCopy and update that.
      // console.log(elements, " id ", id);

      if (!elements) {
            console.log("Error! Elements is undefined");
            return;
      }

      const elementsCopy = [...elements];

      switch (tool) {
            case 'pen':
                  (elementsCopy[id] as penType).points = [
                        ...(elementsCopy[id] as penType).points,
                        { x: x2, y: y2 }
                  ];
                  break;
            case 'line':
            case 'rectangle':
            case 'circle':

                  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
                  const ctx = canvas.getContext("2d"); //get the context of the canvas
                  // recreates the new element
                  elementsCopy[id] = createElement({ id, x1, y1, x2, y2, tool, options });
                  console.log("elemennt is ", elementsCopy[id]);
                  break;


            case 'text':

                  const textWidth = ctx.measureText(options.text).width;

                  const textHeight = options.size;


                  elementsCopy[id] = { ...elementsCopy[id], tool, x1: x1, y1: y1, x2: x1 + textWidth, y2: y1 + textHeight, text: options.text, strokeColor: options.strokeColor, size: options.size };

                  break;

            // Pan moves the viewport, not elements.
            case 'pan':
                  setPanOffset(prevState => ({
                        x: prevState.x + x1 - x2,
                        y: prevState.y + y1 - y2,
                  }));


            default:
                  break;
      }

      setElements(elementsCopy, true);
}

export { updateElement }