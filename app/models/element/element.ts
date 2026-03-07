import { strokeStyle } from "../toolbar/tool";

interface canvasElementType {
  id: number;
  strokeColor: string;
  size: number;
}

export interface penType extends canvasElementType {
  tool:"pen";
  points: { x: number, y: number }[];
  thinning: number;
  smoothing: number;
  streamline: number;
}

export interface textType extends canvasElementType {
  tool:"text";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  text: string;
}

export interface shapeType extends canvasElementType {
  tool:"line"|"rectangle"|"circle";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fillColor: string,
  strokeStyle: strokeStyle,
}

export type elementType = shapeType | textType | penType;

