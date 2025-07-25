import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Filter, Trash2 } from "lucide-react";
import useTasks from "@/hooks/use-tasks";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { TaskState } from "@/types";

const TaskFilter: React.FC = () => {
  const { state, taskStats, setFilter } = useTasks();
  console.log(state);
  const filterOptions = [
    { value: "all", label: "All", count: taskStats.total },
    { value: "completed", label: "Completed", count: taskStats.completed },
    { value: "pending", label: "Pending", count: taskStats.pending },
  ] satisfies { value: TaskState["filter"]; label: string; count: number }[];

  const stats = [
    { label: "Total Tasks", value: taskStats.total },
    { label: "Completion Rate", value: taskStats.completedPercentage + "%" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter & Statistics
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 px-5">
        <div className="flex flex-wrap gap-1">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={option.value === state.filter ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className="shadow-sm"
            >
              {option.label}
              <Badge variant="secondary" className="font-bold">
                {option.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {stats.map((stat, idx) => (
            <div
              className="text-center p-3 bg-muted rounded-lg shadow-sm"
              key={idx}
            >
              <span className="font-semibold text-lg">{stat.value}</span>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {taskStats.completed === 0 && (
          <Button variant="destructive" size="sm" className="w-full">
            <Trash2 className="w-4 h-4" />
            Clear All Completed tasks ({taskStats.completed})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskFilter;
