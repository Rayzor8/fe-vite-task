import useTasks from "@/hooks/use-tasks";
import type { Task } from "@/types";
import type React from "react";
import { Button } from "../ui/button";
import { Edit2, Trash2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch } = useTasks();
  const handleToggleCompleted = (taskId: string) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: taskId });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Medium";
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <Card
      className={`transition-all ${task.completed ? "bg-green-50" : ""} py-2`}
    >
      <CardContent>
        <header className="flex items-center justify-between mb-4">
          <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </h3>

          <div className="space-x-2">
            <Badge variant={getPriorityColor(task.priority)}>
              {getPriorityLabel(task.priority)}
            </Badge>

            <Badge variant={task.completed ? "default" : "secondary"}>
              {task.completed ? "Completed" : "Pending"}
            </Badge>
          </div>
        </header>

        <article>
          <p className={`${task.completed ? "line-through" : ""}`}>
            {task.description}
          </p>
        </article>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="text-xs text-muted-foreground">
            Created: {task.createdAt.toLocaleDateString()}
          </span>

          {task.updatedAt && (
            <span className="text-xs text-muted-foreground">
              Updated: {task.updatedAt?.toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleToggleCompleted(task.id)}
          >
            <CheckCircle className="w-4 h-4" />
          </Button>

          <Button size="sm" variant="ghost">
            <Edit2 className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDeleteTask(task.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskItem;
