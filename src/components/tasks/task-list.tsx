import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckSquare } from "lucide-react";
import useTasks from "@/hooks/use-tasks";
import TaskItem from "./task-item";

const TaskList: React.FC = () => {
  const { state } = useTasks();

  const getFilterTitle = () => {
    switch (state.filter) {
      case "all":
        return "All Tasks";
      case "completed":
        return "Completed Tasks";
      case "pending":
        return "Pending Tasks";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          {getFilterTitle()} ({state.tasks.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {state.tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>
              {state.filter === "completed" && "Completed tasks is not found"}
              {state.filter === "pending" && "Pending tasks is not found"}
              {state.filter === "all" && "No tasks found, please add a task"}
            </p>
          </div>
        ) : (
          state.tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
