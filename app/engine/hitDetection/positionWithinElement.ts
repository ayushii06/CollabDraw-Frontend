import { nearPoints, onLine } from "./LineDetection";
import { distance } from "../math/mathFunction";
import { elementType, PositionType } from "../../models/types";

// It tells whether the cursor is interacting with the element (inside it OR near its boundary OR near control points)

const positionWithinElement = (
  x: number,
  y: number,
  element: elementType
): PositionType | null => {

  switch (element.tool) {

        // for line, we will use perpendicular distance of (x,y) to the line

        case "line": {
          const { x1, y1, x2, y2 } = element;

          const on = onLine(x1, y1, x2, y2, x, y);
          const start = nearPoints(x, y, x1, y1, "start");
          const end = nearPoints(x, y, x2, y2, "end");

          return start || end || on;
        }

        // for rect

        case "rectangle": {
          const { x1, y1, x2, y2 } = element;

          const topLeft = nearPoints(x, y, x1, y1, "tl");
          const topRight = nearPoints(x, y, x2, y1, "tr");
          const bottomLeft = nearPoints(x, y, x1, y2, "bl");
          const bottomRight = nearPoints(x, y, x2, y2, "br");

          const inside =
            x >= x1 && x <= x2 && y >= y1 && y <= y2
              ? "inside"
              : null;

          return topLeft || topRight || bottomLeft || bottomRight || inside;
        }

        case "circle": {
          const { x1, y1, x2, y2 } = element;

          const center = {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2,
          };

          const radius = distance(center, { x: x1, y: y1 });

          const insideCircle =
            distance(center, { x, y }) < radius;

          return insideCircle ? "inside" : null;
        }

        case "pen": {
          const betweenAnyPoint = element.points.some(
            (point, index) => {
              const nextPoint = element.points[index + 1];
              if (!nextPoint) return false;

              return (
                onLine(
                  point.x,
                  point.y,
                  nextPoint.x,
                  nextPoint.y,
                  x,
                  y,
                  5
                ) != null
              );
            }
          );

          return betweenAnyPoint ? "inside" : null;
        }

        case "text": {
          const { x1, y1, x2, y2 } = element;

          return x >= x1 && x <= x2 && y >= y1 && y <= y2
            ? "inside"
            : null;
        }
  }
};

export {positionWithinElement}