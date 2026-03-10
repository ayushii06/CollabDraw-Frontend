import { pointerUp } from "../../models/interaction/interaction";
import { socket } from "../../socket/socketClient";
import { setTool } from "../../store/slice/toolbarSlice";
import { AppDispatch } from "../../store/store";
import { adjustElementCoordinates, adjustmentRequired } from "../elements/adjustElementCoordinates";
import { createElement } from "../elements/createElement";
import { updateElement } from "../elements/updateElement";
import { getMouseCoordinates } from "../math/getMouseCoordinates";

/*
-------------------------------------------------------------------------
--------------------x Handle Pointer Up *--------------------------------

As the pointer goes up, it means now you can reset back to normal conditions,
as the task must have been finished by the user.

*/

const handlePointerUp = ({ e, action, setAction, setSelectedElement, selectedElement, elements, options, setElements, panOffset, scaleOffset, scale, dispatch }: pointerUp & { dispatch: AppDispatch }) => {

      const { x, y } = getMouseCoordinates(e, panOffset, scaleOffset, scale);
      if (action === 'erase') {
            setAction('none');
            setSelectedElement(null);
            return;
      } else {
            if (selectedElement) {
                  if (selectedElement.tool === "text" &&
                        x - selectedElement.x2 === selectedElement.x1 &&
                        y - selectedElement.y2 === selectedElement.y1
                  ) {
                        setAction("write");
                        return;
                  }

                  const index = elements.findIndex(el => el.id === selectedElement.id)

                  if (index === -1) return;
                  if (index === null) return;

                  const element = elements[index];
                  // console.log("element for update is ", element)

                  const { id, tool } = elements[index];

                  if (tool === "pen") {
                        socket.emit("draw-element", element);
                        setAction("none");
                        return;
                  }

                  if ((action === "draw" || action === "resize") && adjustmentRequired(tool)) {

                        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);

                        const updatedElement = createElement({
                              id,
                              x1,
                              y1,
                              x2,
                              y2,
                              tool,
                              options
                        });


                        updateElement({
                              id,
                              x1,
                              y1,
                              x2,
                              y2,
                              tool,
                              elements,
                              options,
                              setElements
                        });


                        socket.emit("draw-element", updatedElement);
                        // updateElement({ id: id, x1: x1, y1: y1, x2: x2, y2: y2, tool: tool, elements: elements, options: options, setElements: setElements });

                        // socket.emit("draw-element", elements[index]);
                        dispatch(setTool("select"))

                  }
            }
            if (action === 'write') {
                  return;
            }


            setAction('none');

            // Update 1 -- This was not needed, because the selectedElement will be null,
            // only when user has clicked outside the shape or delted that element.
            // setSelectedElement(null);
      }
}

export { handlePointerUp }