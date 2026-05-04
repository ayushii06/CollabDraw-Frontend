import { io, Socket } from "socket.io-client";

const URL = "https://collab-draw-backend.vercel.app";

export const socket: Socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

