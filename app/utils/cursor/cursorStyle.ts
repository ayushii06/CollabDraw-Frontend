import { PositionType } from "../../models/types";

const positionCursorMap: Record<PositionType, string> = {
  start: "nesw-resize",
  end: "nesw-resize",
  tl: "nwse-resize",
  br: "nwse-resize",
  tr: "nesw-resize",
  bl: "nesw-resize",
  inside: "move",
};

const toolCursorMap: Record<string, string> = {
  pen: "crosshair",
  rectangle: "crosshair",
  circle: "crosshair",
  line: "crosshair",
  text: "text",
  select: "default",
};

export const getCursor = (
  tool: string,
  position?: PositionType
): string => {

  if (position) {
    return positionCursorMap[position] ?? "default";
  }

  // tool cursors
  return toolCursorMap[tool] ?? "default";
};
