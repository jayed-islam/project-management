// import create from "zustand";
// import { IProject, Task, TaskStatus } from "@/types/project";

// interface ProjectStore {
//   project: IProject;
//   projectLoading: boolean;
//   projectError: any;
//   projectValidating: boolean;

//   setProject: (project: IProject) => void;
//   addTaskToProject: (task: Task) => void;
//   updateTaskInProject: (taskId: string, updatedTask: Partial<Task>) => void;
//   deleteTaskFromProject: (taskId: string) => void;
//   todoTasks: () => Task[];
//   inProgressTasks: () => Task[];
//   doneTasks: () => Task[];
// }

// const useProjectStore = create<ProjectStore>((set) => ({
//   project: {
//     _id: "",
//     title: "",
//     description: "",
//     image: "",
//     tasks: [],
//     members: [],
//     recentActivities: [],
//   },
//   projectLoading: false,
//   projectError: null,
//   projectValidating: false,

//   setProject(project) {
//     set({ project });
//   },

//   addTaskToProject(task) {
//     set((state) => ({
//       project: {
//         ...state.project,
//         tasks: [...state.project.tasks, task],
//       },
//     }));
//   },

//   updateTaskInProject(taskId, updatedTask) {
//     set((state) => ({
//       project: {
//         ...state.project,
//         tasks: state.project.tasks.map((task) =>
//           task._id === taskId ? { ...task, ...updatedTask } : task
//         ),
//       },
//     }));
//   },

//   deleteTaskFromProject(taskId) {
//     set((state) => ({
//       project: {
//         ...state.project,
//         tasks: state.project.tasks.filter((task) => task._id !== taskId),
//       },
//     }));
//   },

//   todoTasks() {
//     return this.project.tasks.filter((task) => task.status === TaskStatus.TODO);
//   },

//   inProgressTasks() {
//     return this.project.tasks.filter(
//       (task) => task.status === TaskStatus.IN_PROGRESS
//     );
//   },

//   doneTasks() {
//     return this.project.tasks.filter((task) => task.status === TaskStatus.DONE);
//   },
// }));

// export default useProjectStore;
import create from "zustand";
import { IProject, Task, TaskStatus } from "@/types/project";

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
}

const useProjectStore = create<ProjectStore>((set) => ({
  project: {
    _id: "",
    title: "",
    description: "",
    image: "",
    tasks: [], // Initialize tasks as an empty array
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

  moveTaskInProject(taskId, newStatus) {
    set((state) => ({
      project: {
        ...state.project,
        tasks: state.project.tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        ),
      },
    }));
  },

  getTaskLists() {
    const { tasks } = this.project;
    return [
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
  },
}));

export default useProjectStore;
