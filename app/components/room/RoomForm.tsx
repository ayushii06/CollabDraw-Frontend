"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingDoodles from "../Home/FloatingDoodle";
import { useRoom } from "../../context/roomContext/useRoom";

interface Props {
  mode: "create" | "join";
  id?: string;
}

export default function RoomForm({ mode, id }: Props) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const {setRoomId} = useRoom();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter your name before continuing.");
      return;
    }

    setError("");

    if (mode === "create") {
      const newRoomId = crypto.randomUUID().slice(0, 6);

      localStorage.setItem("username", username);
      setRoomId(newRoomId);
      router.push(`/canvas/${newRoomId}`);
    } else {
      setRoomId(id);
      localStorage.setItem("username", username);

      router.push(`/canvas/${id}`);
    }
  };

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-gray-50">
      
      {/* Floating doodles */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingDoodles />
      </div>

      {/* Main Content */}
      <div className="relative w-1/2 flex items-center justify-center min-h-[70vh] px-6">

        {/* Background Glow */}
        <div className="absolute -z-10 w-[500px] h-[500px] bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full blur-3xl opacity-40"></div>

        <div className="w-full max-w-md">

          {/* Glass Card */}
          <div className="border border-gray-200/60 backdrop-blur-xl bg-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-2xl p-8 space-y-6 transition hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)]">

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 tracking-tight">
              {mode === "create" ? "Create a Room" : "Join Room"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Room ID */}
              {mode === "join" && (
                <div className="space-y-1">
                  <label className="text-sm text-gray-800">
                    Room ID
                  </label>

                  <input
                    value={id}
                    readOnly
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-800"
                  />
                </div>
              )}

              {/* Username */}
              <div className="space-y-1">

                <label className="text-sm text-gray-800">
                  Your Name
                </label>

                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your name"
                  className={`w-full text-gray-800 border rounded-lg px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  ${error ? "border-red-400 focus:ring-red-400" : "border-gray-200"}`}
                />

                {error && (
                  <p className="text-sm text-red-500 mt-1">
                    {error}
                  </p>
                )}

              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {mode === "create" ? "Create Room" : "Enter Room"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
}