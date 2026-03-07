import { elementType } from "./element";

export type SelectedElement = elementType & {
  xOffsets?: Array<number>;
  yOffsets?: Array<number>;
  xOffset?: number;
  yOffset?: number;
};