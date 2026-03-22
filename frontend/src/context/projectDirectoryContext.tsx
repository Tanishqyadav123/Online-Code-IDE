"use client";
import {
  ReactElement,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { ProjectTreeInterface } from "../interface/Project.interface";

export type ProjectDirectoryContextType = {
  projectDirectory: ProjectTreeInterface[];
  setProjectDirectory: Dispatch<SetStateAction<ProjectTreeInterface[]>>;
  projectId: string | null;
  setProjectId: Dispatch<SetStateAction<string | null>>;
  newFileFolder: { name: string; isDirectory: boolean } | null;
  setNewFileFolder: Dispatch<
    SetStateAction<{ name: string; isDirectory: boolean } | null>
  >;
} | null;
export const ProjectDirectoryContext =
  createContext<ProjectDirectoryContextType>(null);

export const ProjectDirectoryContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [projectDirectory, setProjectDirectory] = useState<
    ProjectTreeInterface[]
  >([]);
  const [projectId, setProjectId] = useState<string | null>(null);

  const [newFileFolder, setNewFileFolder] = useState<{
    name: string;
    isDirectory: boolean;
  } | null>(null);

  return (
    <ProjectDirectoryContext.Provider
      value={{
        projectDirectory,
        setProjectDirectory,
        projectId,
        setProjectId,
        newFileFolder,
        setNewFileFolder,
      }}
    >
      {children}
    </ProjectDirectoryContext.Provider>
  );
};

// Create a Hook :-
export const useProjectDirectory = () => {
  const projectDirectoryDetails = useContext(ProjectDirectoryContext);
  if (!projectDirectoryDetails) {
    throw Error("Project Directory Context is not initialized");
  }
  return projectDirectoryDetails;
};
