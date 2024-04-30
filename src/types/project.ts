interface Task {
  id: number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

interface Member {
  id: number;
  name: string;
  role: string;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tasks: Task[];
  members: {
    id: number;
    name: string;
    role: string;
  }[];
}
