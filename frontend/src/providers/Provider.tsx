import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { SocketContextProvider } from "../context/socketContext";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContextProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </SocketContextProvider>
  );
};
