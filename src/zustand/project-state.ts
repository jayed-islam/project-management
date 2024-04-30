import { IProject } from "@/types/project";
import { create } from "zustand";
import data from "./data.json";

interface ProjectState {
  projects: IProject[];
  isLoading: boolean;
  error: string | null;
  loadProjects: () => Promise<void>;
  addProject: (project: IProject) => void;
  editProject: (projectId: number, updatedProject: IProject) => void;
  deleteProject: (projectId: number) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: true,
  error: null,
  loadProjects: async () => {
    try {
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        set({
          projects: JSON.parse(storedProjects),
          isLoading: false,
          error: null,
        });
      } else {
        // const response = await fetch("data.json");
        // const data = await response.json();

        localStorage.setItem("projects", JSON.stringify(data.projects));

        set({
          projects: data.projects as IProject[],
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      set({ projects: [], isLoading: false, error: "Failed to load projects" });
    }
  },
  addProject: (project: IProject) => {
    set((state) => {
      const updatedProjects = [...state.projects, project];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { projects: updatedProjects };
    });
  },
  editProject: (projectId: number, updatedProject: IProject) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === projectId ? updatedProject : project
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { projects: updatedProjects };
    });
  },

  deleteProject: (projectId: number) => {
    set((state) => {
      const updatedProjects = state.projects.filter(
        (project) => project.id !== projectId
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      return { projects: updatedProjects };
    });
  },
}));

useProjectStore.getState().loadProjects();

export default useProjectStore;
