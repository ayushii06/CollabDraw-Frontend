import { getNewId } from "../../../counter";
import { elementType } from "../../../lib/types";
import { getElementAtPosition } from "../../../utils/elementUtility";
import { getMouseCoordinates } from "../../../utils/getMouseCoordinates";
import { createElements } from "../State/createElement";
import { pointerDown } from "./types";

/*
-----------------------------------------------------------------------------------
-----------------------------x HANDLE POINTER DOWN x-------------------------------

This handler is the entry point of all canvas interactions.

1.We firstly find the canvas coordinates ( we convert our current coordinates to canvas coordinates, becuase we have added panning and zooming features, we essentially changes the event co-ordiantes to canvas co-ordinates. )

Workflow - 
            clientX/clientY
                  ↓
            remove pan offset
                  ↓
            remove zoom scale
                  ↓
            true canvas position

2. We check for canvas interactions like panning, erasing, resizing or simply creating a new element.


*/

const handlePointerDown = ({ e, panOffset, scaleOffset, scale, action, setAction, tool, elements, setElements, setSelectedElement, setStartPanMousePosition,options,ctx }: pointerDown) => {

      // If during typing, user has clicked by mistake somewhere, we need to continue typing only.
      if (action === 'write') {
            return;
      }

      // Get the current (x,y).
      const { x, y } = getMouseCoordinates(e, panOffset, scaleOffset, scale);

      console.log("Mouse DOWN Coordinates, ",x,y)


      // Mouse button values:  
      // 0	left click 
      // 1	middle click 
      // 2	right click
      
      if ("button" in e) {
            if (e.button === 1) {
                  setAction("panning");
                  //stores correct mouse position for panning.
                  setStartPanMousePosition({ x: x, y: y });
                  return;
            }
      }
      if (tool === 'pan') {
            setAction("panning");
            setStartPanMousePosition({ x: x, y: y });
            return;
      }
      else if (tool === 'select') {
            //checks if the mouse is over an element and if yes, it returns that element.
            const element = getElementAtPosition(x, y, elements);

            if (element) {
                  // if the selected element was pen, we will points to new point
                  if (element.tool === 'pen') {
                        const xOffsets = element.points.map(point => x - point.x);
                        const yOffsets = element.points.map(point => y - point.y);

                        setSelectedElement({ ...element, xOffsets, yOffsets });
                  }
                  else {

                        const xOffset = x - element.x1;
                        const yOffset = y - element.y1;
                        setSelectedElement({ ...element, xOffset, yOffset });
                  }
                  setElements(prevState => prevState);

                  if (element.position === 'inside') {
                        setAction('move');
                  }
                  else {
                        setAction('resize');
                  }
            }
      }
      else if (tool === 'eraser') {
            const element = getElementAtPosition(x, y, elements);

            if (element) {
                  if (element.tool === 'pen') {
                        const xOffsets = element.points.map(point => x - point.x);
                        const yOffsets = element.points.map(point => y - point.y);

                        setSelectedElement({ ...element, xOffsets, yOffsets });
                  }
                  else {

                        const xOffset = x - element.x1;
                        const yOffset = y - element.y1;
                        setSelectedElement({ ...element, xOffset, yOffset });
                  }
                  setElements(prevState => prevState);

                  setAction('erase');
            }
      }
      // if the tool was neither of these select, pan or eraser, then it would surely be creating a new element.
      else {

            //OPTIMISATION 2 - Earlier, I assigned the elements.length as id. But it becomes risky, if we delete some elements.
            // const id = elements.length;
            
            // I now changed it to a global variable storing the count.
            const id:number = getNewId();

            // as told earlier, the initial x1,x2 would be x and y1, y2 would be y.
            const x1 = x;
            const x2 = x;
            const y1 = y;
            const y2 = y;
            

            const element:elementType = createElements({ id, x1, y1, x2, y2, tool:tool, options,ctx });

            //create the element and add the element to the elements array
            setElements(prevState => [...prevState, element]);

            setSelectedElement(element);

            setAction(tool === 'text' ? 'write' : 'draw');


      }
}

export {handlePointerDown};