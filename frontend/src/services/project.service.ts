import axios from "axios";
import {
  createProjectResponse,
  globalResponseType,
} from "../types/response.types";
import { ProjectTreeInterface } from "../interface/Project.interface";

export const createNewProjectService = async (
  name: string,
  templateType: string,
  token: string,
) => {
  // hitting the api

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/create-project`,
    {
      name,
      templateType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data as globalResponseType<createProjectResponse>;
};

export const getProjectDirectoryTreeService = async (projectId: string) => {
  // hitting the api

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/get-tree/${projectId}`,
  );

  return response.data as globalResponseType<ProjectTreeInterface[]>;
};
