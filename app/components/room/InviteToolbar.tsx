import { Copy, Mail, Send, X } from "lucide-react";
import React from "react";

function InviteToolbar({ setShowInvite, roomId, copyRoomLink, roomLink }) {
  return (
    <div
      onClick={() => setShowInvite(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
      style={{ zIndex: 200 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 text-slate-100 rounded-2xl
        w-[420px] max-w-[90%] shadow-2xl p-6 border border-slate-700"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Invite People</h2>

          <button
            onClick={() => setShowInvite(false)}
            className="p-1 rounded-md hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Room ID */}
        <p className="text-sm text-slate-400 mb-2">Room ID</p>

        <div
          className="flex items-center justify-between
          bg-slate-950 border border-slate-700
          rounded-lg px-3 py-2 mb-5"
        >
          <span className="text-sm font-medium tracking-wide">
            {roomId}
          </span>

          <button
            onClick={copyRoomLink}
            className="p-1 rounded hover:bg-slate-800 transition"
          >
            <Copy size={18} />
          </button>
        </div>

        {/* Share Buttons */}
        <p className="text-sm text-slate-400 mb-3">Share via</p>

        <div className="flex gap-3">

          {/* Gmail */}
          <a
            href={`mailto:?subject=Join my canvas room&body=${roomLink}`}
            className="flex items-center gap-2 px-4 py-2
            border border-slate-700 rounded-lg
            hover:bg-slate-800 transition text-sm"
          >
            <Mail size={16} />
            Gmail
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=Join my canvas room: ${roomLink}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2
            border border-slate-700 rounded-lg
            hover:bg-slate-800 transition text-sm"
          >
            WhatsApp
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${roomLink}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2
            border border-slate-700 rounded-lg
            hover:bg-slate-800 transition text-sm"
          >
            <Send size={16} />
            Telegram
          </a>

        </div>
      </div>
    </div>
  );
}

export default InviteToolbar;