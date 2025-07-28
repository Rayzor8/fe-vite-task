import type React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckSquare } from "lucide-react";
import useTasks from "@/hooks/use-tasks";
import TaskItem from "./task-item";
import { useState } from "react";
import CustomPagination from "../custom-pagination";

const TaskList: React.FC = () => {
  const { state } = useTasks();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = state.tasks.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

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
        {currentItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>
              {state.filter === "completed" && "Completed tasks is not found"}
              {state.filter === "pending" && "Pending tasks is not found"}
              {state.filter === "all" && "No tasks found, please add a task"}
            </p>
          </div>
        ) : (
          currentItems.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </CardContent>

      <CardFooter>
        <CustomPagination
          totalItems={state.tasks.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          selectItemsPerPage={[
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "20", value: "20" },
            { label: "50", value: "50" },
          ]}
        />
      </CardFooter>
    </Card>
  );
};

export default TaskList;
