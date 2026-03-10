"use client"
import React, { useEffect } from "react";
import Toolbar from "../../components/toolbar/Toolbar";
import Menu from "../../components/menu/Menu";
import Options from "../../components/fileMenu/options";
import Canvas from "../../components/UI/Canvas";
import RoomToolbar from "../../components/room/RoomToolbar";
import { useParams } from "next/navigation";
import { socket } from "../../socket/socketClient";

function page() {
  const params = useParams();
  const roomId = params.id as string;
  const name = localStorage.getItem("draw_user_name");


  useEffect(() => {
    socket.connect();
    socket.emit("join-room", {roomId,name});
    return () => {
      // socket.emit("leave-room", {roomId,name});
      socket.disconnect();
    };
  }, [roomId]);
  return (
    <>
      <Toolbar />
      {/* <RoomToolbar /> */}
      <Menu />
      {/* <Options /> */}
      <Canvas />
    </>
  );
}

export default page;
