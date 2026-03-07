import { strokeStyle } from "../toolbar/tool";

export type Options = {
      strokeColor: string;
      size: number;
      fillColor?: string;
      strokeStyle?: strokeStyle;
      thinning?: number;
      smoothing?: number;
      streamline?: number;
      text?:string
};