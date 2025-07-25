import { generateId } from "@/lib/utils";
import type { Task, TaskAction, TaskState } from "@/types";

export const createTask = (
  taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
): Task => {
  const now = new Date();
  return {
    ...taskData,
    id: generateId(),
    createdAt: now,
  };
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, createTask(action.payload)],
      };


    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};
