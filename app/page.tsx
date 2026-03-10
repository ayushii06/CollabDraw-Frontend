"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, LogIn } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const createRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const id = crypto.randomUUID().slice(0, 8);

    localStorage.setItem("draw_user_name", name);

    router.push(`/room/${id}`);
  };

  const joinRoom = () => {
    if (!roomId.trim() || !name.trim()) {
      alert("Enter your name and room ID");
      return;
    }

    localStorage.setItem("draw_user_name", name);

    router.push(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-6">

      {/* Background blur shapes */}
      <div className="absolute w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      <div className="relative backdrop-blur-xl bg-white/70 shadow-2xl border border-white/40 rounded-3xl p-12 max-w-xl w-full text-center">

        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          DrawCollab
        </h1>

        <p className="text-gray-600 mb-10 text-lg">
          Real-time collaborative canvas for teams to draw, design and brainstorm together.
        </p>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 transition mb-6"
        />

        {/* Create Room */}
        <button
          onClick={createRoom}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition mb-8"
        >
          <Plus size={20} />
          Create New Room
        </button>

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-400 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Join Room */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <button
            onClick={joinRoom}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 rounded-xl hover:bg-black transition"
          >
            <LogIn size={18} />
            Join
          </button>
        </div>

      </div>
    </div>
  );
}