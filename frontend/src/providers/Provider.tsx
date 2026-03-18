import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { SocketContextProvider } from "../context/socketContext";
import { FileContextProvider } from "../context/fileContext";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FileContextProvider>
      <SocketContextProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </SocketContextProvider>
    </FileContextProvider>
  );
};
