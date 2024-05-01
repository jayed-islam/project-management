import { IProject } from "@/types/project";
import instance from "@/utils/axios";

export const fetchProjects = async (): Promise<IProject[]> => {
  const response = await instance.get("/project");
  return response.data;
};

export const fetchProjectById = async (id: number): Promise<IProject> => {
  const response = await instance.get(`/project/${id}`);
  return response.data;
};

export const updateProject = async (
  id: number,
  updatedProject: Partial<IProject>
): Promise<IProject> => {
  const response = await instance.put(`/project/${id}`, updatedProject);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await instance.delete(`/project/${id}`);
};
