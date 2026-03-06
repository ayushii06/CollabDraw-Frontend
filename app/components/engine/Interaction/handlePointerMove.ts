import { getLatestCount } from "../../../counter";
import { Options } from "../../../lib/types";
import { cursorForPosition } from "../../../utils/cursorStyle";
import { ElementWithPosition, getElementAtPosition } from "../../../utils/elementUtility";
import { getMouseCoordinates } from "../../../utils/getMouseCoordinates";
import { resizedCoordinates } from "../../../utils/resizeElement";
import { updateElement } from "../State/updateElement";
import { pointerMove } from "./types";

const handlePointerMove = ({ e, action, tool, startPanMousePosition,panOffset,scaleOffset,scale, setPanOffset, elements, setElements, selectedElement, options }: pointerMove) => {

      // get the current mouse coordinate
      const { x, y } = getMouseCoordinates(e,panOffset,scaleOffset,scale);

      console.log("Current Mouse Coodinates ",x,y);

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
            const element: ElementWithPosition | undefined = getElementAtPosition(x, y, elements)
            if (element) {
                  document.body.style.cursor = cursorForPosition(element.position);
            }
            else {
                  document.body.style.cursor = 'default';
            }
      }

      // This runs when the user is actively drawing
      if (action === "draw") {

            // the active element is the latest created one.
            // but this was previous implementation. Now we are using the counter approach.
            // const index = elements.length - 1;

            const id = getLatestCount();
            const element = elements[id - 1];

            if (!element) return;
            console.log(elements, id, element);
            // console.log("Tool is - ",element.tool);

            if (element.tool === "pen") {

                  updateElement({
                        id: id-1,
                        x1: x,
                        y1: y,
                        x2: x,
                        y2: y,
                        tool: element.tool,
                        options: options,
                        elements: elements,
                        setElements: setElements,
                        setPanOffset: setPanOffset
                  })

            } else {

                  updateElement({
                        id: id-1,
                        x1: element.x1,
                        y1: element.y1,
                        x2: x,
                        y2: y,
                        tool: element.tool,
                        options: options,
                        elements: elements,
                        setElements: setElements,
                        setPanOffset: setPanOffset

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

                  const selectedElementCopy = elementCopy[selectedElement.id];

                  if (selectedElementCopy.tool === "pen") {
                        elementCopy[selectedElement.id] = {
                              ...selectedElementCopy,
                              points: newPoints,
                        };
                  }

                  setElements(elementCopy, true);

            }
            else {

                  const { id, x1, y1, x2, y2, tool, xOffset, yOffset } = selectedElement;



                  const width = x2 - x1;
                  const height = y2 - y1;

                  const newX1 = x - xOffset;
                  const newY1 = y - yOffset;

                  let newOptions: Options;

                  if (tool == "text") {
                        newOptions = { text: selectedElement.text, color: selectedElement.color, size: selectedElement.size };
                  }
                  else {
                        newOptions = {
                              color: selectedElement.color,
                              size: selectedElement.size,
                              fill: selectedElement.fill,
                              style: selectedElement.style,
                              fillStyle: selectedElement.fillStyle,
                        }
                  }



                  updateElement({ id, x1: newX1, y1: newY1, x2: newX1 + width, y2: newY1 + height, tool: tool, options: newOptions, elements: elements, setElements: setElements, setPanOffset: setPanOffset });
            }
      }
      else if (action === 'resize') {
            const { id, tool, position, ...coordinates } = selectedElement;


            const { x1, y1, x2, y2 } = resizedCoordinates(x, y, position, coordinates);

            let options: Options;
            if (tool == "pen") {
                  options = {
                        color: selectedElement.color,
                        size: selectedElement.size,
                        thinning: selectedElement.thinning,
                        smoothing: selectedElement.smoothing,
                        streamline: selectedElement.streamline
                  }
            }
            else if (tool == "circle" || tool == "rectangle" || tool == "line") {
                  options = {
                        color: selectedElement.color,
                        size: selectedElement.size,
                        fill: selectedElement.fill,
                        style: selectedElement.style,
                        fillStyle: selectedElement.fillStyle,
                  }
            }
            else {
                  options = {
                        color: selectedElement.color,
                        size: selectedElement.size,
                  }
            }

            updateElement({ id, x1, y1, x2, y2, tool, options: options, elements: elements, setElements: setElements, setPanOffset: setPanOffset });
      }
      else {
            return;
      }



}

export { handlePointerMove };