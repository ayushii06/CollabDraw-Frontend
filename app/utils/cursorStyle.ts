import { PositionType } from "./posElement";

const cursorForPosition=(position:string)=> {
  switch (position) {
    case "start":
    case "end":
      return "nesw-resize";
    case "tl":
    case "br":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    case "inside":
      return "move";
    default:
      return "default";
  }
}

export {cursorForPosition};