"use client"
import { CanvasProvider } from "./canvasContext/CanvasContext";
import { RoomProvider } from "./roomContext/RoomContext";
import { ToolProvider } from "./toolContext/ToolContext";

export default function AppProviders({ children }) {
  return (
    <RoomProvider>
      <CanvasProvider>
        <ToolProvider>
          {children}
        </ToolProvider>
      </CanvasProvider>
    </RoomProvider>
  );
}