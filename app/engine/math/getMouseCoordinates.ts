import { Offset } from "../../models/types";

const getMouseCoordinates = (e: React.PointerEvent<HTMLCanvasElement>,panOffset?:Offset,scaleOffset?:Offset,scale?:number): Offset => {
  // console.log("Input for getMouse ",e,panOffset,scale,scaleOffset);
  const x =
    (e.clientX - panOffset.x * scale + scaleOffset.x) / scale;

  const y =
    (e.clientY - panOffset.y * scale + scaleOffset.y) / scale;

  return { x, y };
};

export {getMouseCoordinates};