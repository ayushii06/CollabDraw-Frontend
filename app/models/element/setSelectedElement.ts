import { elementType } from "./element";
import { PositionType } from "./elementWithPos";

export type SelectedElement = elementType & {
  xOffsets?: Array<number>;
  yOffsets?: Array<number>;
  xOffset?: number;
  yOffset?: number;
  position?:PositionType;
};