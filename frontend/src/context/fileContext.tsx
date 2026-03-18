"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FileContextType {
  currentFilePath: string | null;
  setCurrentFilePath: Dispatch<SetStateAction<string | null>>;
  currentFileContent: string | null;
  setCurrentFileContent: Dispatch<SetStateAction<string | null>>;
}
const FileContext = createContext<FileContextType | null>(null);

export const FileContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [currentFilePath, setCurrentFilePath] = useState<string | null>(null);
  const [currentFileContent, setCurrentFileContent] = useState<string | null>(
    null,
  );

  return (
    <FileContext.Provider
      value={{
        currentFilePath,
        setCurrentFilePath,
        currentFileContent,
        setCurrentFileContent,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const value = useContext(FileContext);

  if (!value) {
    throw new Error("File Context can not get initiailzed");
  }
  return value;
};
