import { Options } from "../../models/types";
import { pointerMove } from "../../models/interaction/interaction";
import { getCursor } from "../../utils/cursor/cursorStyle";
import { resizedCoordinates } from "../elements/resizeElement";
import { updateElement } from "../elements/updateElement";
import { getMouseCoordinates } from "../math/getMouseCoordinates";
import { getElementAtPosition } from "../hitDetection/getElementAtPosition";
import { socket } from "../../socket/socketClient";
import { createElement } from "../elements/createElement";
import { positionWithinElement } from "../hitDetection/positionWithinElement";

/*
---------------------------------------------------------------------
------------------x Handling the actual action x---------------------

Uptil now, the pointer was just down, so it creates a new element. 
Now, the user will be actually drawing the element, that will be handled here.

As the user moves the cursor, the (x2,y2) will change based on currentMouseCoordinates (We already know - (x1,y1) stays the same.)

*/

const handlePointerMove = ({ e, action, tool, startPanMousePosition, panOffset, scaleOffset, scale, setPanOffset, elements, setElements, selectedElement, options, canvas }: pointerMove) => {

      // get the current mouse coordinate
      const { x, y } = getMouseCoordinates(e, panOffset, scaleOffset, scale);

      // console.log("Current Mouse Coodinates ",x,y);

      // if the action is panning, update the panOffset.
      if (action === "panning") {
            const deltaX = x - startPanMousePosition.x;
            const deltaY = y - startPanMousePosition.y;
            setPanOffset(prevStats => ({
                  x: prevStats.x + deltaX,
                  y: prevStats.y + deltaY,
            }));
            return;
      }


      if (tool === 'select') {
            const element = getElementAtPosition(x, y, elements);

            if (element) {
                  const cursor = getCursor(tool, element.position);
                  canvas.style.cursor = cursor;
            } else {
                  canvas.style.cursor = "default";
            }
      }

      // (This runs when the user is actively drawing.
      // Tool selected - Line,Rect or Circle

      if (action === "draw") {

            // the active element is the latest created one - That we have already set as selectedElement.

            const element = selectedElement;

            // If there is no selectedElement, then return.
            if (!element) return;

            // console.log(elements, id, element);

            if (element.tool === "pen") {

                  updateElement({
                        id: element.id,
                        x1: x,
                        y1: y,
                        x2: x,
                        y2: y,
                        tool: element.tool,
                        options: options,
                        elements: elements,
                        setElements: setElements,
                        setPanOffset: setPanOffset,
                        canvas,
                  })


            } else {

                  updateElement({
                        id: element.id,
                        x1: element.x1,
                        y1: element.y1,
                        x2: x,
                        y2: y,
                        tool: element.tool,
                        options: options,
                        elements: elements,
                        setElements: setElements,
                        setPanOffset: setPanOffset,
                        canvas

                  })

            }
      }

      else if (action === 'move') {
            if (selectedElement.tool === 'pen') {
                  const newPoints = selectedElement.points.map((point, index) => {
                        return {
                              x: x - selectedElement.xOffsets[index],
                              y: y - selectedElement.yOffsets[index]
                        }
                  });

                  const elementCopy = [...elements];

                  const index = elementCopy.findIndex(el => el.id === selectedElement.id)
                  if (index === -1) return

                  const selectedElementCopy = elementCopy[index]
                  if (selectedElementCopy.tool === "pen") {
                        elementCopy[index] = {
                              ...selectedElementCopy,
                              points: newPoints
                        }
                  }

                  setElements(elementCopy, true);

                  socket.emit("move-element", elementCopy[index]);


            }
            else {
                  const { id, x1, y1, x2, y2, tool, xOffset, yOffset } = selectedElement;

                  const width = x2 - x1;
                  const height = y2 - y1;

                  const newX1 = x - xOffset;
                  const newY1 = y - yOffset;

                  let newOptions: Options;

                  if (tool == "text") {
                        newOptions = {
                              text: selectedElement.text,
                              strokeColor: selectedElement.strokeColor,
                              size: selectedElement.size
                        };
                  } else {
                        newOptions = {
                              strokeColor: selectedElement.strokeColor,
                              size: selectedElement.size,
                              fillColor: selectedElement.fillColor,
                              strokeStyle: selectedElement.strokeStyle
                        };
                  }

                  /* 1️⃣ Build updated element */
                  const updatedElement = createElement({
                        id,
                        x1: newX1,
                        y1: newY1,
                        x2: newX1 + width,
                        y2: newY1 + height,
                        tool,
                        options: newOptions
                  });

                  /* 2️⃣ Update local state */
                  updateElement({
                        id,
                        x1: newX1,
                        y1: newY1,
                        x2: newX1 + width,
                        y2: newY1 + height,
                        tool,
                        options: newOptions,
                        elements,
                        setElements,
                        setPanOffset
                  });

                  /* 3️⃣ Emit to other users */
                  socket.emit("update-element", updatedElement);
            }
      }
      else if (action === 'resize') {
            const { id, tool } = selectedElement;
            if(tool=="pen"){
                  return;
            }
            
const { position } = selectedElement;
            const {...coordinates} = selectedElement;
            
            const { x1, y1, x2, y2 } = resizedCoordinates(x, y, position, coordinates);
            let options: Options;
            if (tool == "circle" || tool == "rectangle" || tool == "line") {
                  options = {
                        strokeColor: selectedElement.strokeColor,
                        size: selectedElement.size,
                        fillColor: selectedElement.fillColor,
                        strokeStyle: selectedElement.strokeStyle,
                  }
            }
            else {
                  options = {
                        strokeColor: selectedElement.strokeColor,
                        size: selectedElement.size,
                  }
            }

            /* 1️⃣ Build updated element */
                  const updatedElement = createElement({
                        id,
                        x1,
                        y1,
                        x2,
                        y2,
                        tool,
                        options
                  });

                  updateElement({ id, x1, y1, x2, y2, tool, options, elements, setElements: setElements, setPanOffset: setPanOffset });
                  socket.emit("update-element", updatedElement);
      }
      
      else if (action === 'erase') {
            // Find the element user has clicked on to remove and then remove that element

            const element = getElementAtPosition(x, y, elements);

            if (element) {

                  setElements(prev =>
                        prev.filter(el => el.id !== element.id)
                  );

            }
      }



}

export { handlePointerMove };