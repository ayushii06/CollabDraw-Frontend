import { pointerDown } from "../../models/interaction/interaction";
import { elementType, ElementWithPosition } from "../../models/types";
import { getNewId } from "../../utils/constants/counter";
import { createElement } from "../elements/createElement";
import { getElementAtPosition } from "../hitDetection/getElementAtPosition";
import { getMouseCoordinates } from "../math/getMouseCoordinates";

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

3. If we are creating new element, we will call createElement function, that will return the element and then we push it into the elements array. Now sicne the elements array got changed, useLayoutEffect will be called and the element will be rendered.
Also, we will set the action also based on the type of tool selected! 

4. If the tool was select tool, it means we are moving the element or resizing the element.


*/

const handlePointerDown = ({ e, panOffset, scaleOffset, scale, action, setAction, tool, elements, setElements, setSelectedElement, setStartPanMousePosition,options }: pointerDown) => {


      // If during typing, user has clicked by mistake somewhere, we need to continue typing only.
      if (action === 'write') {
            return;
      }

      // Get the current (x,y).
      const { x, y } = getMouseCoordinates(e, panOffset, scaleOffset, scale);

      // console.log("Mouse DOWN Coordinates, ",x,y)


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

      // Check the tool!

      if (tool === 'pan') {
            setAction("panning");
            setStartPanMousePosition({ x: x, y: y });
            return;
      }
      // User wants to resize or move the element.
      else if (tool === 'select') {
            //checks if the mouse is over an element and if yes, it returns that element with the position where our cursor was at (inside? , top-left? , start? etc)

            const element:ElementWithPosition = getElementAtPosition(x, y, elements);
            console.log("The element selected by select tool - ", element);
            

            if (element) {
                  // if the selected element was pen, we will map new point with respect to current mous coordinates
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
            

            const element:elementType = createElement({ id, x1, y1, x2, y2, tool:tool, options });

            console.log("actual element",element);

            //create the element and add the element to the elements array
            setElements(prevState => [...prevState, element]);

            // We set the selectedElement as this element, because we will be performing the action on this element.
            setSelectedElement(element);

            // Now set the action based on tool
            setAction(tool === 'text' ? 'write' : 'draw');


      }
}

export {handlePointerDown};