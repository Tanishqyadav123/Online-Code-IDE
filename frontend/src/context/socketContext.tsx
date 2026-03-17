"use client";

import { createContext, useContext, useEffect, useRef } from "react";
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
  const socketRef = useRef<null | Socket>(null);
  // Creating a use effect :- for clean up

  useEffect(() => {
    if (!socketRef.current) {
      // Intialize the socket :-
      socketRef.current = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/editor`, {
        transports: ["websocket"],
      });
    }

    return () => {
      socketRef.current?.close();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

// Returing a hook so we can use it anywhere :-
export const useSocket = () => {
  return useContext(SocketContext).socket;
};
