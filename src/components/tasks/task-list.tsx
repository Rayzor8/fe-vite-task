import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckSquare } from "lucide-react";
import useTasks from "@/hooks/use-tasks";

const TaskList: React.FC = () => {
  const { state } = useTasks();

  const getFilterTitle = () => {
    switch (state.filter) {
      case "all":
        return "All Tasks";
      case "completed":
        return "Completed Tasks";
      case "pending":
        return "Uncompleted Tasks";
    }
  };

  return (
    <Card >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          {getFilterTitle()} ({state.tasks.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {state.tasks.map((task) => (
          <div key={task.id} className="bg-amber-300 p-2">
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.priority}</p>
            <p>{task.completed}</p>
            <p>{task.createdAt.toDateString()}</p>
            <p>{task.updatedAt?.toDateString() || "-"}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskList;
