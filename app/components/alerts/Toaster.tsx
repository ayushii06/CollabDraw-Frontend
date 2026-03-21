"use client";

import { useRef, useEffect } from "react";
import Toaster, { ToasterRef } from "./toast";
import { useRoom } from "../../context/roomContext/useRoom";

export default function ToasterDemo() {
  const toasterRef = useRef<ToasterRef>(null);

  const { lastJoined, lastLeft } = useRoom();

  useEffect(() => {
    if(!lastJoined){
      return ;
    }
  

      toasterRef.current?.show({
        title: "User Joined",
        message: `${lastJoined.username} joined the room`,
        variant: "success",
      });

  }, [lastJoined]);
  useEffect(() => {
    if(!lastLeft){
      return ;
    }
  

      toasterRef.current?.show({
        title: "User Left",
        message: `${lastLeft.username} left the room`,
        variant: "default",
      });

  }, [lastLeft]);

  return (
    <div className="absolute p-6 space-y-6">
      <Toaster ref={toasterRef} />
    </div>
  );
}