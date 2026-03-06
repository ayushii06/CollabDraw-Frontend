import { SelectedElement } from "../components/UI/Home";
import { elementType } from "../lib/types";
import { average } from "./mathFunction";
import { PositionType, positionWithinElement } from "./posElement";

// Finds the distance of (x,y) from (x1,y1) and if it's less than 5 px, we say that the point is near.
const nearPoints = (x: number, y: number, x1: number, y1: number, name: PositionType): PositionType | null => {
      return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
}

// Finds whether the point (x,y) is within the line (x1,y1) and (x2,y2);
// OPTIMISATION 1 - Instead of using triangle inequality, we will use perpendicular distance for it.
// const onLine = (x1:number,y1:number,x2:number,y2:number,x:number,y:number,maxDistance:number = 1 ):string|null =>{
//       const a = {x:x1,y:y1};
//       const b = {x:x2,y:y2};
//       const c = {x,y};

//       const offset = distance(a,b) - (distance(a,c) + distance(b,c));
//       return Math.abs(offset) < maxDistance ? "inside" : null;
// }

const onLine = (x1: number, y1: number, x2: number, y2: number, x: number, y: number, maxDistance: number = 1): PositionType | null => {
      const A = { x: x1, y: y1 };
      const B = { x: x2, y: y2 };
      const C = { x, y };

      const ABx = B.x - A.x;
      const ABy = B.y - A.y;

      const lengthSquared = ABx * ABx + ABy * ABy;

      const t = ((C.x - A.x) * ABx + (C.y - A.y) * ABy) / lengthSquared;

      if (t < 0 || t > 1) return null;

      const closestX = A.x + t * ABx;
      const closestY = A.y + t * ABy;

      const dx = C.x - closestX;
      const dy = C.y - closestY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      return distance <= maxDistance ? "inside" : null;
}

export type ElementWithPosition = elementType & {
  position: PositionType | null;
};

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

const getSvgPathFromStroke = (points:number[][], closed:boolean = true):string => {
      const len = points.length

      if (len < 4) {
            return ``
      }

      let a = points[0]
      let b = points[1]
      const c = points[2]

      let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
            2
      )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
            b[1],
            c[1]
      ).toFixed(2)} T`

      for (let i = 2, max = len - 1; i < max; i++) {
            a = points[i]
            b = points[i + 1]
            result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(
                  2
            )} `
      }

      if (closed) {
            result += 'Z'
      }

      return result
}

export { nearPoints, onLine, getElementAtPosition,getSvgPathFromStroke }