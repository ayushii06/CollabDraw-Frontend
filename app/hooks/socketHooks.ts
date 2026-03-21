"use client";

import { useEffect } from "react";
import { socket } from "../socket/socketClient";
import ToasterDemo from "../components/alerts/Toaster";
import { userType } from "../components/room/RoomToolbar";
import { elementType } from "../models/types";

/*
----------------------------------------------------------------------------
--------------------------x Socket Workflow x-------------------------------

useEffect will run only when setElements will change.
When will setElements be changed? 
      1. onPointerDown - Creating new Element.
      2. onPointerMove - Updating the element.
      3. onPointerUp - During adjustElementCoordinates
      4. Reseting the Canvas.
*/

export const useSocketEvents = ({ userId, roomId, username, setUsers, setConnected, setError, setElements, setCursors, setLastLeft, setLastJoined }) => {

      useEffect(() => {
            if (!userId || !username) return;

            if (!socket.connected) {
                  socket.connect();
            }

            const handleElementSync = (element: elementType) => {
                  console.group("🔄 ELEMENT SYNC");

                  console.log("📥 Incoming element:", element);

                  if (!element || !element.id) {
                        console.error("❌ Invalid element received:", element);
                        console.groupEnd();
                        return;
                  }
                  

                  setElements(prev => {
                        console.log("📦 Previous state:", prev);

                        const index = prev.findIndex(el => el.id === element.id);

                        console.log("🔍 Found index:", index);

                        if (index === -1) {
                              console.log("➕ Adding new element");

                              const newState = [...prev, element];

                              console.log("📤 New state:", newState);
                              console.groupEnd();

                              return newState;
                        }

                        console.log("♻️ Updating existing element");

                        const copy = [...prev];
                        console.log("🧬 Before update:", copy[index]);

                        copy[index] = element;

                        console.log("🧬 After update:", copy[index]);
                        console.log("📤 New state:", copy);
                        console.groupEnd();

                        return copy;
                  });
            };

            socket.on("connect", () => {
                  socket.emit("join-room", {
                        roomId,
                        username: username,
                        userId: userId,
                  });
            });

            socket.on("room-joined", ({ users, elements }: { users: userType[], elements: Array<elementType> }) => {
                  console.log("elements ", elements);
                  setUsers(users);
                  if (Array.isArray(elements)) {
                        setElements(elements);
                  }
                  setConnected(true);
            });



            socket.on("user-joined", (user) => {
                  setLastJoined(user);
                  console.log(user.username + " joined");
            });



            socket.on("cursor-update", ({ user, x, y }) => {
                  setCursors(prev => ({
                        ...prev,
                        [user.userId]: { x, y, name: user.username, color: user.color }
                  }))
            })

            socket.on("disconnect", () => {
                  setConnected(false);
            });

            socket.on("element-sync", handleElementSync);

            socket.on("element-delete", (id) => {
                  setElements(prev => prev.filter(el => el.id !== id));
            });



            socket.on("user-left", (user) => {
                  console.log(user)
                  setLastLeft(user);

                  setCursors(prev => {
                        const updated = { ...prev };
                        delete updated[user.userId];
                        return updated;
                  });
            })

            socket.on("room-error", (msg) => {
                  setError(msg);
            });

            socket.on("connect_error", () => {
                  setError(
                        "Real-time collaboration server is currently unavailable. Please try again later.",
                  );
            });

            socket.on("room-users", (users) => {
                  setUsers(users);
            });

            return () => {
                  socket.off("connect");
                  socket.off("room-joined");
                  socket.off("cursor-update");
                  socket.off("element-sync", handleElementSync);
                  socket.off("element-delete");
                  socket.off("user-left");
                  socket.off("disconnect");
                  socket.off("room-error");
                  socket.off("connect_error");
                  socket.off("room-users");
            };

      }, [roomId, userId, username,setElements]);

};