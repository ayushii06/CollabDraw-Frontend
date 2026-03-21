import { useContext } from "react";
import { ToolContext } from "./ToolContext";

export const useTool = () => {
  return useContext(ToolContext);
};