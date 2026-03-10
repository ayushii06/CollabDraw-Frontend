"use client";

import { useEffect } from "react";
import { socket } from "../socket/socketClient";
import ToasterDemo from "../components/alerts/Toaster";

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

export const useSocketEvents = ({ setElements, setCursors }) => {

      useEffect(() => {

            const handleDraw = (element) => {
                  // console.log("SOCKET DRAW RECEIVED:", element);

                  if (!element || typeof element !== "object") return;

                  setElements(prev => {

                        const safePrev = Array.isArray(prev) ? prev : [];

                        const index = safePrev.findIndex(el => el.id === element.id);

                        if (index === -1) {
                              return [...safePrev, element];
                        }

                        const copy = [...safePrev];
                        copy[index] = element;

                        return copy;

                  });
            };

            const handleUpdate = ((element) => {

                  setElements(prev => {

                        const safePrev = Array.isArray(prev) ? prev : [];

                        const index = safePrev.findIndex(el => el.id === element.id);

                        if (index === -1) return safePrev;

                        const copy = [...safePrev];
                        copy[index] = element;

                        return copy;
                  });

            })

            const handleCursorUpdate = (cursor) => {

                  setCursors(prev => ({
                        ...prev,
                        [cursor.userId]: cursor
                  }))

            }


            const removeCursor = (id) => {

                  setCursors(prev => {
                        const newState = { ...prev };
                        delete newState[id];
                        return newState;
                  });
            }

           


            socket.on("draw", handleDraw);
            socket.on("update", handleUpdate);

            socket.on("remove-cursor", removeCursor);

            socket.on("cursor-update", handleCursorUpdate)



            return () => {
                  socket.off("draw", handleDraw);
                  socket.off("update", handleUpdate);
                  socket.off("cursor-update", handleCursorUpdate);
                  socket.off("remove-cursor", removeCursor);
            };

      }, [setElements]);
};