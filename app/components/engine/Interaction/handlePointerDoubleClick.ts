import { getElementAtPosition } from "../../../utils/elementUtility";
import { getMouseCoordinates } from "../../../utils/getMouseCoordinates";
import { pointerDoubleClick } from "./types";

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