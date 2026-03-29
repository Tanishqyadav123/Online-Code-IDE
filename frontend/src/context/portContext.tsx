"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface PortContextType {
  hostPortIp: { hostPort: number; hostIP: string } | null;
  setHostPortIp: Dispatch<
    SetStateAction<{ hostPort: number; hostIP: string } | null>
  >;
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
}
export const PortContext = createContext<PortContextType | null>(null);

export const PortContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [hostPortIp, setHostPortIp] = useState<{
    hostPort: number;
    hostIP: string;
  } | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  return (
    <PortContext.Provider
      value={{ hostPortIp, setHostPortIp, setShowPreview, showPreview }}
    >
      {children}
    </PortContext.Provider>
  );
};

// Creating a hook for this :-
export const useHostPort = () => {
  const hostPortDetails = useContext(PortContext);

  if (!hostPortDetails) {
    throw new Error("Host port did not initialized...");
  }
  return hostPortDetails;
};
