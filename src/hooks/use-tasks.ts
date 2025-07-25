import { useTaskContext } from "@/context/task-context";
import type { Task, TaskState } from "@/types";

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    dispatch({ type: "ADD_TASK", payload: taskData });
  };

  const setFilter = (filter: TaskState["filter"]) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  // Computed values
  const taskStats = getTaskStats(state.tasks);

  return { state, addTask, taskStats, setFilter };
};

function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, pending, completedPercentage };
}

export default useTasks;
