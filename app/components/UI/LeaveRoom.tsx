"use client"
import { SquareArrowRightExit } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socketClient";

export default function LeaveRoom() {

  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  const leaveRoom = () => {
    setLeaving(true);
    socket.emit("leave-room");
  };

  useEffect(() => {

    const handleLeft = () => {
      router.push("/");
    };

    socket.on("left-room", handleLeft);

    return () => {
      socket.off("left-room", handleLeft);
    };

  }, []);

  return (
    <>
      {/* Leaving Screen */}
      {leaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000ba]">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
            <p className="text-white text-2xl font-bold">
              Leaving room...
            </p>
          </div>
        </div>
      )}

      <div
        className="
        group flex items-center
        bg-red-600 text-white
        rounded-xl
        overflow-hidden
        cursor-pointer
        transition-all duration-300
        w-10 hover:w-40
        px-2 py-2
        shadow-lg
        "
        onClick={leaveRoom}
      >
        <SquareArrowRightExit
          className="rotate-180 flex-shrink-0"
          size={20}
        />

        <span
          className="
          ml-2 whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          text-sm font-medium
          "
        >
          Leave the room?
        </span>
      </div>
    </>
  )
}