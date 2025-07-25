import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTask } from "@/hooks/use-tasks";

const TaskList: React.FC = () => {
  const { state } = useTask();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task List</CardTitle>
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
