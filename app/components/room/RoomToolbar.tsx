"use client"

import { Share2 } from "lucide-react"
import { useEffect, useState } from "react"
import ViewAllUsers from "./ViewAllUsers"
import InviteToolbar from "./InviteToolbar"
import { socket } from "../../socket/socketClient"

interface userType {
  userId: string
  name: string
  color: string
}

export default function RoomToolbar() {

  const [users, setUsers] = useState<Array<userType>>([])

  const [showUsers, setShowUsers] = useState(false)

  const [showInvite, setShowInvite] = useState(false)

  const roomLink = typeof window !== "undefined" ? window.location.href : ""
  const roomId = roomLink.split("/").pop()

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Room link copied!")
  }

  const visibleUsers = users.slice(0, 3)
  const extraUsers = users.length - 3

  useEffect(()=>{

   socket.on("room-users",(users)=>{
    // console.log(users);
      setUsers(users);
   });



},[]);

  return (
    <>
      {/* Toolbar */}
      <div
        className="ease-out ml-3 transition-transform duration-300 flex items-center gap-4
        bg-white/80 backdrop-blur-md
        border border-gray-200
       z-40 px-3 py-2 rounded-xl shadow-lg"
       
      >

        {/* Avatar Stack */}
        <div className="flex items-center -space-x-2">

          {visibleUsers.map((user) => (
            <div
              key={user.userId}
              title={user.name}
              className="w-7 h-7 rounded-full
              flex items-center justify-center
              text-white text-xs font-semibold
              border-2 border-white shadow
              transition"
              style={{ backgroundColor: user.color }}
            >
              {user.name.charAt(0)}
            </div>
          ))}

          {/* +Users Button */}
          {extraUsers > 0 && (
            <button
              onClick={() => setShowUsers(true)}
              className="w-7 h-7 rounded-full
              bg-gray-200 text-gray-700
              flex items-center justify-center
              text-xs font-medium
              border-2 border-white
              hover:bg-gray-300 transition"
            >
              +{extraUsers}
            </button>
          )}

        </div>

        {/* Invite Button */}
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2
          bg-blue-600 text-white
          px-4 py-2 rounded-lg
          hover:bg-blue-700 transition shadow-sm"
        >
          <Share2 size={14} />
          Invite
        </button>

      </div>

      {/* USERS OVERLAY */}
      {showUsers && (
        <ViewAllUsers setShowUsers={setShowUsers} users={users}/>
      )}


      {/* INVITE OVERLAY */}
      {showInvite && (
        <InviteToolbar setShowInvite={setShowInvite} roomId={roomId} copyRoomLink={copyRoomLink} roomLink={roomLink}/>
      )}
  
    </>
  )
}