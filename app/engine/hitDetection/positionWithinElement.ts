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
      const threshold = 8;

      // In the case, the rectangle is drawn inverted, we need minX and minY.

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const topLeft = nearPoints(x, y, minX, minY, "tl");
      const topRight = nearPoints(x, y, maxX, minY, "tr");
      const bottomLeft = nearPoints(x, y, minX, maxY, "bl");
      const bottomRight = nearPoints(x, y, maxX, maxY, "br");

      // edges
      const top = x > minX && x < maxX && Math.abs(y - minY) < threshold
        ? "top"
        : null;

      const bottom =
        x > minX && x < maxX && Math.abs(y - maxY) < threshold
          ? "bottom"
          : null;

      const left =
        y > minY && y < maxY && Math.abs(x - minX) < threshold
          ? "left"
          : null;

      const right =
        y > minY && y < maxY && Math.abs(x - maxX) < threshold
          ? "right"
          : null;



      const inside = x >= minX && x <= maxX && y >= minY && y <= maxY ? "inside" : null;

      return (
        topLeft ||
        topRight ||
        bottomLeft ||
        bottomRight ||
        top ||
        bottom ||
        left ||
        right ||
        inside
      );

    }

    case "circle": {
      const { x1, y1, x2, y2 } = element;

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const threshold = 6;

      const topLeft = nearPoints(x, y, minX, minY, "tl");
      const topRight = nearPoints(x, y, maxX, minY, "tr");
      const bottomLeft = nearPoints(x, y, minX, maxY, "bl");
      const bottomRight = nearPoints(x, y, maxX, maxY, "br");

      const top =
        x > minX && x < maxX && Math.abs(y - minY) < threshold
          ? "top"
          : null;

      const bottom =
        x > minX && x < maxX && Math.abs(y - maxY) < threshold
          ? "bottom"
          : null;

      const left =
        y > minY && y < maxY && Math.abs(x - minX) < threshold
          ? "left"
          : null;

      const right =
        y > minY && y < maxY && Math.abs(x - maxX) < threshold
          ? "right"
          : null;

      const inside =
        x >= minX && x <= maxX && y >= minY && y <= maxY
          ? "inside"
          : null;

      return (
        topLeft ||
        topRight ||
        bottomLeft ||
        bottomRight ||
        top ||
        bottom ||
        left ||
        right ||
        inside
      );
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

export { positionWithinElement }