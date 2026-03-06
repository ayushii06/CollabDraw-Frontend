import { Drawable } from "roughjs/bin/core";

export type Tool =
  | "line"
  | "rectangle"
  | "circle"
  | "pen"
  | "text";

export type ToolBar = "select" | "pan" | "line" | "rectangle" | "circle" | "text" | "eraser" |"pen"

export type fillStyle = "Hachure" | "Solid" | "Zig-Zag" | "Cross-Hatch" | "Dots" | "Dashed";

export type strokeStyle = "Solid" | "Dotted" | "Dashed";

interface canvasElementType {
  id: number;
  color: string;
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
  fill: string,
  style: strokeStyle,
  fillStyle: fillStyle,
}

export type elementType = shapeType | textType | penType;

export type Options = {
      color: string;
      size: number;
      fill?: string;
      style?: strokeStyle;
      fillStyle?: fillStyle;
      thinning?: number;
      smoothing?: number;
      streamline?: number;
      text?: string;
};