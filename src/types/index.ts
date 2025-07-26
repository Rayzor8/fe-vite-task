import { taskFormSchema } from "@/schemas/task-form-schema";
import { z } from "zod";
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt?: Date;
}

export interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
}

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: Omit<Task, "id" | "createdAt" | "updatedAt">;
    }
  | {
      type: "SET_FILTER";
      payload: TaskState["filter"];
    }
  | {
      type: "TOGGLE_COMPLETE";
      payload: string;
    }
   
 


export type TaskFormValues = z.infer<typeof taskFormSchema>;
