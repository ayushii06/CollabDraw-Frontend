import { elementType, ElementWithPosition, SelectedElement } from "../../models/types";
import { positionWithinElement } from "./positionWithinElement";



// Finds the element at the current position where our cursor is
const getElementAtPosition = (
  x: number,
  y: number,
  elements: Array<elementType> | SelectedElement
): ElementWithPosition | undefined => {

  if (!Array.isArray(elements)) {
    // elements is SelectedElement
    return {
      ...elements,
      position: positionWithinElement(x, y, elements)
    };
  }

  // elements is Array<elementType>
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element)
    }))
    .find((element) => element.position !== null);
};

export {getElementAtPosition}