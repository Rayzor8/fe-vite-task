export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
}

export type TaskAction = {
  type: "ADD_TASK";
  payload: Omit<Task, "id" | "createdAt" | "updatedAt">;
};
