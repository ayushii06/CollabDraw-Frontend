import { elementType } from "./element";

// returns the element where our cursor is at and also it's position
export type PositionType =
  | "start"
  | "end"
  | "tl"
  | "tr"
  | "bl"
  | "br"
  | "inside"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | null;

export type ElementWithPosition = elementType & {
  position: PositionType | null;
};
