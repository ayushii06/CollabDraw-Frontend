import { PositionType } from "../../models/types";

const resizedCoordinates = (
  clientX: number,
  clientY: number,
  position: PositionType,
  coordinates: { x1: number; y1: number; x2: number; y2: number }
) => {
  const { x1, y1, x2, y2 } = coordinates;

  switch (position) {

    // corners
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };

    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };

    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };

    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };


    // edges
    case "top":
      return { x1, y1: clientY, x2, y2 };

    case "bottom":
      return { x1, y1, x2, y2: clientY };

    case "left":
      return { x1: clientX, y1, x2, y2 };

    case "right":
      return { x1, y1, x2: clientX, y2 };


    default:
      return coordinates;
  }
};

export { resizedCoordinates };