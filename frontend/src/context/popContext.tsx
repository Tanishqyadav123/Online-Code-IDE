"use client";
import {
  ReactElement,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

export type PopupContextType = {
  coordinates: {
    x: number;
    y: number;
    popForFile: string;
    isFolder: boolean;
  } | null;
  setCoordinates: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
      popForFile: string;
      isFolder: boolean;
    } | null>
  >;
  showNewFileInput: boolean;
  setShowNewFileInput: Dispatch<SetStateAction<boolean>>;
  showNewFolderInput: boolean;
  setShowNewFolderInput: Dispatch<SetStateAction<boolean>>;
} | null;
export const PopupContext = createContext<PopupContextType>(null);

export const PopupContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [coordinates, setCoordinates] = useState<{
    x: number;
    y: number;
    popForFile: string;
    isFolder: boolean;
  } | null>(null);

  const [showNewFileInput, setShowNewFileInput] = useState<boolean>(false);
  const [showNewFolderInput, setShowNewFolderInput] = useState<boolean>(false);
  return (
    <PopupContext.Provider
      value={{
        coordinates,
        setCoordinates,
        showNewFileInput,
        setShowNewFileInput,
        showNewFolderInput,
        setShowNewFolderInput
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

// Create a Hook :-
export const usePopup = () => {
  const popupDetails = useContext(PopupContext);
  if (!popupDetails) {
    throw Error("Pop up Context is not initialized");
  }
  return popupDetails;
};
