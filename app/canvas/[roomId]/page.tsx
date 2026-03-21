"use client";

import React, { useEffect, useState } from "react";
import Toolbar from "../../components/toolbar/toolbar";
import Menu from "../../components/menu/menu";
import Canvas from "../../components/UI/Canvas";
import { useParams, useRouter } from "next/navigation";
import { socket } from "../../socket/socketClient";
import { AnimatedSpinner } from "../../components/alerts/spinner";
import { NotFound } from "../../components/alerts/Error";
import { useRoom } from "../../context/roomContext/useRoom";
import RoomToolbar from "../../components/room/RoomToolbar";
import LeaveRoom from "../../components/UI/LeaveRoom";
import { v4 as uuidv4 } from "uuid";
import throttle from "lodash.throttle";
import { useCanvas } from "../../context/canvasContext/useCanvas";
import { useHistory } from "../../hooks/useHistory";
import { useSocketEvents } from "../../hooks/socketHooks";

function Page() {
  const router = useRouter();
  const { roomId,setRoomId, userId, setUserId, setUsers,setLastJoined,setLastLeft } = useRoom();
  const { cursors, setCursors } = useCanvas();
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [elements, setElements, undo, redo, eraser, resetCanvas] = useHistory(
    [],
  );
  const params = useParams();
  useEffect(() => {
  if (params?.roomId) {
    setRoomId(params.roomId);
  }
}, [params.roomId]);

  useEffect(() => {
    const storedName = localStorage.getItem("username");

    if (!storedName) {
      router.push(`/room/${roomId}`);
      return;
    }

    setUsername(storedName);
  },[roomId]);

  useSocketEvents({userId,roomId,username,setUsers,setConnected,setError, setElements, setCursors,setLastJoined,setLastLeft})

  useEffect(() => {
    if (!userId) {
      setUserId(uuidv4());
    }
  }, [userId]);

  const handleLeaveRoom = () => {
    setLeaving(true);

    socket.once("left-room", () => {
      router.push("/");
    });

    socket.emit("leave-room", { roomId, userId });
  };

  useEffect(() => {

    const throttled = throttle((e: MouseEvent) => {
      const x = e.clientX;
    const y = e.clientY;

    // ✅ LOCAL (instant UI)
    setCursorPosition({ x, y });

      socket.emit("cursor-move", {
        roomId,
        userId,
        x: e.clientX,
        y: e.clientY,
      });
    }, 20);

    window.addEventListener("mousemove", throttled);

    return () => {
      window.removeEventListener("mousemove", throttled);
      throttled.cancel();
    };
  }, [roomId, userId]);

  if (error) {
    return <NotFound code={503} message={error} />;
  }

  if (!connected) {
    return (
      <>
        <div className="min-h-[100vh] bg-gray-50 flex justify-center items-center pb-4">
          <div className="w-full text-2xl font-semibold text-gray-700 mx-auto flex flex-col justify-center items-center gap-5">
            <AnimatedSpinner />
            Connecting to room...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="absolute top-4 left-4 z-50 flex items-center ">
        <LeaveRoom handleLeaveRoom={handleLeaveRoom} leaving={leaving} />

        <RoomToolbar roomId={roomId} />
      </div>
      <Toolbar />
      <Menu />
      <Canvas cursorPosition={cursorPosition} setElements={setElements} resetCanvas={resetCanvas} elements={elements} redo={redo} undo={undo}/>

      {Object.entries(cursors)
  .filter(([id]) => id !== userId) // avoid rendering yourself
  .map(([id, cursor]: any) => (
    <div
      key={id}
      style={{
        position: "absolute",
        left: cursor.x,
        top: cursor.y,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      <div className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
        {cursor.name}
      </div>
      <div>▲</div>
    </div>
))}
    </>
  );
}

export default Page;
