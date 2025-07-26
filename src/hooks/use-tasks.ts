import { useTaskContext } from "@/context/task-context";
import type { Task } from "@/types";

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  // Computed values
  const taskStats = getTaskStats(state.tasks);
  const filteredTasks = filterTasks(state.tasks, state.filter);
  const sortedTasks = sortTasksByPriority(filteredTasks);
  const newState = { ...state, tasks: sortedTasks };


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

const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...tasks].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
  );
};

export default useTasks;
