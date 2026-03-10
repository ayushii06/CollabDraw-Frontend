import { elementType, Tool } from "../../models/types";

const adjustmentRequired = (tool: Tool) =>
  ["line", "rectangle","circle",].includes(tool);

const adjustElementCoordinates = (
  element: elementType
): { x1: number; y1: number; x2: number; y2: number } | undefined => {
  const { tool } = element;

  if (tool === "pen" || tool === "text") return;

  const { x1, y1, x2, y2 } = element;

  if (tool === "rectangle") {
    return {
      x1: Math.min(x1, x2),
      y1: Math.min(y1, y2),
      x2: Math.max(x1, x2),
      y2: Math.max(y1, y2),
    };
  }

  if (x1 < x2 || (x1 === x2 && y1 < y2)) {
    return { x1, y1, x2, y2 };
  }

  return { x1: x2, y1: y2, x2: x1, y2: y1 };
};

export {adjustElementCoordinates,adjustmentRequired}