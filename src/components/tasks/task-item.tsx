import useTasks from "@/hooks/use-tasks";
import type { Task, TaskFormValues } from "@/types";
import type React from "react";
import { Button } from "../ui/button";
import { Edit2, Trash2, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "@/schemas/task-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Card
      className={`transition-all ${task.completed ? "bg-green-50" : ""} py-2`}
    >
      {isEditing ? (
        <EditForm task={task} onCancel={handleEdit} />
      ) : (
        <TaskContent task={task} onEdit={handleEdit} />
      )}
    </Card>
  );
};

function EditForm({ task, onCancel }: { task: Task; onCancel: () => void }) {
  const { dispatch } = useTasks();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
  });

  const handleCancel = () => {
    onCancel();
    form.reset();
  };
  const onSubmit = (values: TaskFormValues) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { updates: { ...task, ...values } },
    });

    handleCancel();
  };

  return (
    <CardContent className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Low Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Medium Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        High Priority
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}

function TaskContent({ task, onEdit }: { task: Task; onEdit: () => void }) {
  const { dispatch } = useTasks();
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

  const handleToggleCompleted = (taskId: string) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: taskId });
  };
  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
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

      <div className="flex items-center justify-between mt-4">
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

          {!task.completed && (
            <Button size="sm" variant="ghost" onClick={onEdit}>
              <Edit2 className="w-4 h-4" />
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDeleteTask(task.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  );
}

export default TaskItem;
