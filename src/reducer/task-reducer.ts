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

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload) {
            return {
              ...task,
              completed: !task.completed,
              updatedAt: new Date(),
            };
          }
          return task;
        }),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "DELETE_COMPLETED_TASKS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.updates.id) {
            return {
              ...task,
              ...action.payload.updates,
              updatedAt: new Date(),
            };
          }
          return task;
        }),
      };

    default:
      return state;
  }
};
