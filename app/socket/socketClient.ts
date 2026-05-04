import { io, Socket } from "socket.io-client";

const URL = "https://collabdraw-backend-40qt.onrender.com";

export const socket: Socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});

