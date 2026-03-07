import { pointerUp } from "../../models/interaction/interaction";
import { adjustElementCoordinates, adjustmentRequired } from "../elements/adjustElementCoordinates";
import { updateElement } from "../elements/updateElement";
import { getMouseCoordinates } from "../math/getMouseCoordinates";

/*
-------------------------------------------------------------------------
--------------------x Handle Pointer Up *--------------------------------

As the pointer goes up, it means now you can reset back to normal conditions,
as the task must have been finished by the user.

*/

const handlePointerUp = ({ e, action, setAction, setSelectedElement, selectedElement, elements,options,setElements,panOffset,scaleOffset,scale }: pointerUp) => {
      const { x, y } = getMouseCoordinates(e,panOffset,scaleOffset,scale);

      // console.log(" Mouse Up - ",x,y);

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
                  const index = selectedElement.id
                  if (index === null) return;


                  const { id, tool } = elements[index];
                  if ((action === "draw" || action === "resize") && adjustmentRequired(tool)) {

                        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
                        updateElement({id:id, x1:x1, y1:y1, x2:x2, y2:y2, tool:tool,elements:elements,options:options,setElements:setElements});


                  }
            }
            if (action === 'write') {
                  return;
            }


            setAction('none');
            setSelectedElement(null);
      }
}

export {handlePointerUp}