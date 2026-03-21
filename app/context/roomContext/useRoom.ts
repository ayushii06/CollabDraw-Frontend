import { useContext } from "react";
import { RoomContext } from "./RoomContext";

export const useRoom = () => {
  return useContext(RoomContext);
};