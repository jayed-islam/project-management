import { useMutation, useQuery, useQueryClient } from "react-query";
import { IProject } from "@/types/project";
import {
  deleteProject,
  fetchProjectById,
  fetchProjects,
  updateProject,
} from "./projects";

export const useProjects = () => {
  return useQuery("projects", fetchProjects);
};

export const useProjectById = (id: number) => {
  return useQuery<IProject>(["project", id], () => fetchProjectById(id));
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { id: number; updatedProject: Partial<IProject> }) =>
      updateProject(data.id, data.updatedProject),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });
};
