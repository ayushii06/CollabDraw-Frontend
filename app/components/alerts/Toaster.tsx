"use client";

import { useRef, useEffect } from "react";
import Toaster, { ToasterRef } from "./toast";
import { socket } from "../../socket/socketClient";

export default function ToasterDemo() {
  const toasterRef = useRef<ToasterRef>(null);

  useEffect(() => {
    const userJoined = (user: { name: string }) => {
      console.log("utgrfg",user);

      toasterRef.current?.show({
        title: "User Joined",
        message: `${user.name} joined the room`,
        variant: "success",
      });
    };
   
    const userLeft = (user:{name:string}) => {
      console.log("utgrfg",user);

      toasterRef.current?.show({
        title: "User Left",
        message: `${user.name} left the room`,
        variant: "success",
      });

    }

    
    socket.on("user-joined", userJoined);
    socket.on("user-left", userLeft);
    return () => {
      socket.off("user-joined", userJoined);
      socket.off("user-left", userLeft);
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Toaster ref={toasterRef} />
    </div>
  );
}