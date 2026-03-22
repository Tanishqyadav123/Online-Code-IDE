import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { SocketContextProvider } from "../context/socketContext";
import { FileContextProvider } from "../context/fileContext";
import { PopupContextProvider } from "../context/popContext";
import { ProjectDirectoryContextProvider } from "../context/projectDirectoryContext";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PopupContextProvider>
      <FileContextProvider>
        <SocketContextProvider>
          <ProjectDirectoryContextProvider>
            <ClerkProvider>{children}</ClerkProvider>
          </ProjectDirectoryContextProvider>
        </SocketContextProvider>
      </FileContextProvider>
    </PopupContextProvider>
  );
};
