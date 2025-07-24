import { taskReducer } from "@/reducer/task-reducer";
import type { TaskAction, TaskState } from "@/types";
import { createContext, useContext, useReducer, type Dispatch } from "react";

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "My first task",
      description:
        "This is for testing purposes, you can delete this task and add your own tasks",
      completed: false,
      priority: "high",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  filter: "all",
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
} | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
