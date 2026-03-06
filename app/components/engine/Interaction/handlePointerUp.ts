import { Options } from "../../../lib/types";
import { getMouseCoordinates } from "../../../utils/getMouseCoordinates";
import { adjustElementCoordinates, adjustmentRequired } from "../State/createElement";
import { updateElement } from "../State/updateElement";
import { pointerUp } from "./types";


const handlePointerUp = ({ e, action, setAction, setSelectedElement, selectedElement, elements,options,setElements,panOffset,scaleOffset,scale }: pointerUp) => {
      const { x, y } = getMouseCoordinates(e,panOffset,scaleOffset,scale);

      console.log(" Mouse Up - ",x,y);

      if (action === 'erase') {
            setAction('none');
            setSelectedElement(null);
            return;
      } else {
            if (selectedElement) {
                  if (
                        selectedElement.tool === "text" &&
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

                        // const options:Options = {
                        //       color: elements[index].color, 
                        //       size: elements[index].size, 
                        //       fill: elements[index].fill, 
                        //       style: elements[index].style, 
                        //       fillStyle: elements[index].fillStyle, thinning: elements[index].thinning, smoothing: elements[index].smoothing, streamline: elements[index].streamline, elements: elements
                        // }



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