import { useTaskContext } from "@/context/task-context";
import type { Task } from "@/types";

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  // Computed values
  const taskStats = getTaskStats(state.tasks);
  const filteredTasks = filterTasks(state.tasks, state.filter);
  const newState = { ...state, tasks: filteredTasks };
  console.log(filteredTasks);

  return { state: newState, dispatch, taskStats };
};

function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, pending, completedPercentage };
}

function filterTasks(
  tasks: Task[],
  filter: "all" | "completed" | "pending"
): Task[] {
  switch (filter) {
    case "completed":
      return tasks.filter((task) => task.completed);
    case "pending":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
}

export default useTasks;
