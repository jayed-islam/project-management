import { create } from "zustand";
import { IProject, Task, TaskStatus, IMember } from "@/types/project";

interface ProjectStore {
  project: IProject;
  projectLoading: boolean;
  projectError: any;
  projectValidating: boolean;

  setProject: (project: IProject) => void;
  addTaskToProject: (task: Task) => void;
  updateTaskInProject: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTaskFromProject: (taskId: string) => void;
  moveTaskInProject: (taskId: string, newStatus: TaskStatus) => void;
  getTaskLists: () => { name: string; tasks: Task[] }[];
  addMemberToTask: (taskId: string, member: IMember) => void;
}

const useProjectStore = create<ProjectStore>((set, get) => ({
  project: {
    _id: "",
    title: "",
    description: "",
    image: "",
    tasks: [],
    members: [],
    recentActivities: [],
  },
  projectLoading: false,
  projectError: null,
  projectValidating: false,

  setProject(project) {
    set({ project });
  },

  addTaskToProject(task) {
    set((state) => ({
      project: {
        ...state.project,
        tasks: [...state.project.tasks, task],
      },
    }));
  },

  updateTaskInProject(taskId, updatedTask) {
    set((state) => ({
      project: {
        ...state.project,
        tasks: state.project.tasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        ),
      },
    }));
  },

  deleteTaskFromProject(taskId) {
    set((state) => ({
      project: {
        ...state.project,
        tasks: state.project.tasks.filter((task) => task._id !== taskId),
      },
    }));
  },

  moveTaskInProject(taskId: string, newStatus: TaskStatus) {
    set((state) => {
      const updatedTasks = state.project.tasks.map((task) => {
        if (task._id === taskId) {
          // Update the status of the task
          task.status = newStatus;
        }
        return task;
      });

      // Update the project with the modified tasks
      return {
        project: {
          ...state.project,
          tasks: updatedTasks,
        },
      };
    });
  },

  getTaskLists: () => {
    const { project } = get();

    if (!project) {
      const taskLists = [
        {
          name: TaskStatus.TODO,
          tasks: [],
        },
        {
          name: TaskStatus.IN_PROGRESS,
          tasks: [],
        },
        {
          name: TaskStatus.DONE,
          tasks: [],
        },
      ];

      return taskLists;
    }

    const { tasks } = project;

    const taskLists = [
      {
        name: TaskStatus.TODO,
        tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
      },
      {
        name: TaskStatus.IN_PROGRESS,
        tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
      },
      {
        name: TaskStatus.DONE,
        tasks: tasks.filter((task) => task.status === TaskStatus.DONE),
      },
    ];

    return taskLists;
  },

  addMemberToTask(taskId: string, member: IMember) {
    set((state) => {
      const updatedTasks = state.project.tasks.map((task) => {
        if (task._id === taskId) {
          // Add the member to the task's assignees
          task.assignees = task.assignees
            ? [...task.assignees, member]
            : [member];
        }
        return task;
      });

      // Update the project with the modified tasks
      return {
        project: {
          ...state.project,
          tasks: updatedTasks,
        },
      };
    });
  },
}));

export default useProjectStore;
