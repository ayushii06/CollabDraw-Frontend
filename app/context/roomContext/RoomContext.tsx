import { createContext, useEffect, useState } from "react";
import { socket } from "../../socket/socketClient";

export const RoomContext = createContext(null);

interface userType {
  userId: string;
  name: string;
  color: string;
}
export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
      const [users, setUsers] = useState<Array<userType>>([]);
      const [userId, setUserId] = useState<string>("");
      const [roomId,setRoomId] = useState<string>("");
      const [lastJoined,setLastJoined] = useState<userType>(null);
      const [lastLeft,setLastLeft] = useState<userType>(null);

      return (
      <RoomContext.Provider value={{ users, lastJoined,lastLeft,roomId,setRoomId,userId,setUserId,setUsers,setLastJoined,setLastLeft}}>
            {children}
      </RoomContext.Provider>
      );
};
