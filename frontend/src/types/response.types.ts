export interface globalResponseType<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface createProjectResponse {
  projectId: string;
}
