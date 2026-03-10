import { PositionType } from "../../models/types";

const positionCursorMap: Record<PositionType, string> = {
  // line endpoints
  start: "pointer",
  end: "pointer",

  // corners
  tl: "nwse-resize",
  br: "nwse-resize",
  tr: "nesw-resize",
  bl: "nesw-resize",

  // edges
  top: "ns-resize",
  bottom: "ns-resize",
  left: "ew-resize",
  right: "ew-resize",

  // moving
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

  // resize or move cursor when hovering element
  if (position) {
    return positionCursorMap[position] ?? "default";
  }

  // cursor based on tool
  return toolCursorMap[tool] ?? "default";
};