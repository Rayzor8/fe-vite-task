import { useTaskContext } from "@/context/task-context";
import type { Task } from "@/types";

export const useTask = () => {
  const { state, dispatch } = useTaskContext();

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    dispatch({ type: "ADD_TASK", payload: taskData });
  };

  return { state, addTask };
};
