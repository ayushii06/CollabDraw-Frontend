import { pointerDoubleClick } from "../../models/interaction/interaction";
import { getElementAtPosition } from "../hitDetection/LineDetection";
import { getMouseCoordinates } from "../math/getMouseCoordinates";


const handlePointerDoubleClick = ({ e, action, elements, eraser,panOffset,scaleOffset,scale }: pointerDoubleClick) => {
      const { x, y } = getMouseCoordinates(e,panOffset,scaleOffset,scale);

      if (action === 'erase') {
            const element = getElementAtPosition(x, y, elements);


            if (element) {
                  eraser(element);
            }
      } else {
            return;
      }
}

export {handlePointerDoubleClick}