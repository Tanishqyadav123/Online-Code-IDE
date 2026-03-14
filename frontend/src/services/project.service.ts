import axios from "axios";
import {
  createProjectResponse,
  globalResponseType,
} from "../types/response.types";

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
