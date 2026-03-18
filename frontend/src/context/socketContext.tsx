"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextInterface {
  socket: Socket | null;
}
const SocketContext = createContext<SocketContextInterface>({ socket: null });

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  // Creating a use effect :- for clean up

  useEffect(() => {
    if (!socket) {
      // Intialize the socket :-
      const soc = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/editor`, {
        transports: ["websocket"],
      });

      setSocket(soc);
    }

    console.log(socket, " Value is");
    return () => {
      socket?.close();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Returing a hook so we can use it anywhere :-
export const useSocket = () => {
  let socket = useContext(SocketContext).socket;
  //   console.log("Returning thing ", socket);
  return socket;
};
