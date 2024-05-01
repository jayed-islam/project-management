export interface IProject {
  _id: string;
  title: string;
  description: string;
  image: string;
  tasks: Task[];
  members: Member[];
  recentActivities: Activity[];
  status?: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

export interface Member {
  name: string;
  role: string;
}

export interface Activity {
  id: number;
  description: string;
  timestamp: Date;
}
